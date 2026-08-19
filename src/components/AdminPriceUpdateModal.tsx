import React, { useEffect, useState } from 'react';
import { Lock, Plus, Trash2, RefreshCw, CheckCircle2, AlertCircle, KeyRound } from 'lucide-react';
import { GeopoliticalZone } from '../types';

interface AdminPriceUpdateModalProps {
  onClose: () => void;
}

interface EditablePriceRow {
  id: number;
  zonePriceId?: string;
  item: string;
  price: number;
  unit: string;
  region: GeopoliticalZone;
  minOrder: number;
}

const ZONES: GeopoliticalZone[] = [
  'North-West',
  'North-East',
  'North-Central',
  'South-West',
  'South-East',
  'South-South',
];

const TOKEN_STORAGE_KEY = 'ngc_admin_token';

export const AdminPriceUpdateModal: React.FC<AdminPriceUpdateModalProps> = ({ onClose }) => {
  const [adminToken, setAdminToken] = useState<string>(() => sessionStorage.getItem(TOKEN_STORAGE_KEY) || '');
  const [rows, setRows] = useState<EditablePriceRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const loadPrices = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/prices');
      const data = await res.json();
      setRows(Array.isArray(data.prices) ? data.prices : []);
    } catch {
      setError('Failed to load current prices.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrices();
  }, []);

  const updateRow = (id: number, field: keyof EditablePriceRow, value: string | number) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const removeRow = (id: number) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const addRow = () => {
    const nextId = rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
    setRows((prev) => [
      ...prev,
      { id: nextId, item: '', price: 0, unit: '', region: 'North-Central', minOrder: 1 },
    ]);
  };

  const handleSave = async () => {
    if (!adminToken.trim()) {
      setError('Enter the admin token to save changes.');
      return;
    }
    const invalidRow = rows.find((r) => !r.item.trim() || !r.unit.trim() || r.price <= 0);
    if (invalidRow) {
      setError('Every row needs an item name, unit, and a price greater than 0.');
      return;
    }

    setSaving(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const res = await fetch('/api/prices/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken,
        },
        body: JSON.stringify({
          prices: rows.map((r) => ({ ...r, updatedAt: new Date().toISOString() })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Failed to update prices.');
      }
      sessionStorage.setItem(TOKEN_STORAGE_KEY, adminToken);
      setSuccessMsg('Prices updated — the live ticker will reflect this within seconds.');
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setError(err?.message || 'Failed to update prices.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white border border-[#E5E9D3] rounded-3xl max-w-4xl w-full p-6 shadow-2xl text-[#2C3327] space-y-5 my-8">
        <div className="flex items-start justify-between border-b border-[#E5E9D3] pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-[#F0F4E8] rounded-2xl text-[#3A5A40]">
              <Lock className="w-6 h-6 text-[#588157]" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-[#3A5A40]">Admin: Update Market Prices</h3>
              <p className="text-xs text-[#588157] font-medium">Pushes to the live price ticker every user sees.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#3A5A40] hover:text-[#2C3327] font-bold p-1">
            ✕
          </button>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <KeyRound className="w-4 h-4 text-[#588157] shrink-0" />
          <input
            type="password"
            value={adminToken}
            onChange={(e) => setAdminToken(e.target.value)}
            placeholder="Admin token (x-admin-token)"
            className="flex-1 bg-[#F8F9F1] border border-[#D8E2C3] rounded-xl px-3 py-2 text-xs text-[#2C3327] placeholder-[#A3B18A] focus:outline-none focus:border-[#3A5A40]"
          />
          <button
            onClick={loadPrices}
            className="flex items-center space-x-1 bg-[#F0F4E8] hover:bg-[#E5E9D3] text-[#3A5A40] text-xs font-bold px-3 py-2 rounded-xl border border-[#D8E2C3]"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Reload</span>
          </button>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2 rounded-xl flex items-center space-x-2 text-[11px]">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {successMsg && (
          <div className="bg-[#F0F4E8] border border-[#D8E2C3] text-[#3A5A40] px-3 py-2 rounded-xl flex items-center space-x-2 text-[11px]">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="text-left text-[#588157] border-b border-[#E5E9D3]">
                <th className="py-2 pr-2 font-bold">Item</th>
                <th className="py-2 pr-2 font-bold">Price (NGN)</th>
                <th className="py-2 pr-2 font-bold">Unit</th>
                <th className="py-2 pr-2 font-bold">Region</th>
                <th className="py-2 pr-2 font-bold">Min Order</th>
                <th className="py-2 font-bold"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-[#F0F4E8]">
                  <td className="py-2 pr-2">
                    <input
                      value={row.item}
                      onChange={(e) => updateRow(row.id, 'item', e.target.value)}
                      className="w-full bg-[#F8F9F1] border border-[#D8E2C3] rounded-lg px-2 py-1.5"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      type="number"
                      min={1}
                      value={row.price}
                      onChange={(e) => updateRow(row.id, 'price', Number(e.target.value))}
                      className="w-28 bg-[#F8F9F1] border border-[#D8E2C3] rounded-lg px-2 py-1.5"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      value={row.unit}
                      onChange={(e) => updateRow(row.id, 'unit', e.target.value)}
                      className="w-28 bg-[#F8F9F1] border border-[#D8E2C3] rounded-lg px-2 py-1.5"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <select
                      value={row.region}
                      onChange={(e) => updateRow(row.id, 'region', e.target.value)}
                      className="bg-[#F8F9F1] border border-[#D8E2C3] rounded-lg px-2 py-1.5"
                    >
                      {ZONES.map((z) => (
                        <option key={z} value={z}>
                          {z}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      type="number"
                      min={1}
                      value={row.minOrder}
                      onChange={(e) => updateRow(row.id, 'minOrder', Number(e.target.value))}
                      className="w-20 bg-[#F8F9F1] border border-[#D8E2C3] rounded-lg px-2 py-1.5"
                    />
                  </td>
                  <td className="py-2">
                    <button
                      onClick={() => removeRow(row.id)}
                      className="text-rose-500 hover:text-rose-700 p-1.5"
                      title="Remove row"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={addRow}
          className="flex items-center space-x-1.5 text-[#3A5A40] hover:text-[#588157] text-xs font-bold"
        >
          <Plus className="w-4 h-4" />
          <span>Add Row</span>
        </button>

        <button
          onClick={handleSave}
          disabled={saving || loading}
          className="w-full bg-[#3A5A40] hover:bg-[#588157] disabled:opacity-60 text-white font-bold py-3 rounded-xl text-sm shadow-md transition-all"
        >
          {saving ? 'Saving...' : 'Save & Publish Prices'}
        </button>
      </div>
    </div>
  );
};
