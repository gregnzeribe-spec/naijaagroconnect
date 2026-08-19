import React, { useEffect, useState } from 'react';
import { Lock, Plus, Trash2, RefreshCw, CheckCircle2, AlertCircle, KeyRound, ImageUp } from 'lucide-react';
import { GeopoliticalZone } from '../types';

interface AdminBlogModalProps {
  onClose: () => void;
}

interface EditableBlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  authorName: string;
  farmName: string;
  zone: GeopoliticalZone | '';
  tags: string;
  featured: boolean;
  publishedAt: string;
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

export const AdminBlogModal: React.FC<AdminBlogModalProps> = ({ onClose }) => {
  const [adminToken, setAdminToken] = useState<string>(() => sessionStorage.getItem(TOKEN_STORAGE_KEY) || '');
  const [posts, setPosts] = useState<EditableBlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const loadPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      const loaded: EditableBlogPost[] = (Array.isArray(data.posts) ? data.posts : []).map((p: any) => ({
        id: p.id,
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        coverImage: p.coverImage || '',
        authorName: p.authorName || '',
        farmName: p.farmName || '',
        zone: p.zone || '',
        tags: Array.isArray(p.tags) ? p.tags.join(', ') : '',
        featured: !!p.featured,
        publishedAt: p.publishedAt || new Date().toISOString(),
      }));
      setPosts(loaded);
    } catch {
      setError('Failed to load current posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const updatePost = (id: string, field: keyof EditableBlogPost, value: string | boolean) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const removePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleImageUpload = async (id: string, file: File) => {
    if (!adminToken.trim()) {
      setError('Enter the admin token before uploading images.');
      return;
    }
    setUploadingId(id);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('/api/upload/image', {
        method: 'POST',
        headers: { 'x-admin-token': adminToken },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Image upload failed.');
      }
      updatePost(id, 'coverImage', data.url);
    } catch (err: any) {
      setError(err?.message || 'Image upload failed.');
    } finally {
      setUploadingId(null);
    }
  };

  const addPost = () => {
    setPosts((prev) => [
      {
        id: `blog-${Date.now()}`,
        title: '',
        excerpt: '',
        content: '',
        coverImage: '',
        authorName: 'NaijaAgroConnect Editorial',
        farmName: '',
        zone: '',
        tags: '',
        featured: false,
        publishedAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const handleSave = async () => {
    if (!adminToken.trim()) {
      setError('Enter the admin token to save changes.');
      return;
    }
    const invalid = posts.find((p) => !p.title.trim() || !p.excerpt.trim() || !p.content.trim());
    if (invalid) {
      setError('Every post needs a title, excerpt, and content.');
      return;
    }

    setSaving(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const res = await fetch('/api/blogs/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken,
        },
        body: JSON.stringify({
          posts: posts.map((p) => ({
            id: p.id,
            title: p.title,
            excerpt: p.excerpt,
            content: p.content,
            coverImage: p.coverImage,
            authorName: p.authorName,
            farmName: p.farmName || undefined,
            zone: p.zone || undefined,
            tags: p.tags.split(',').map((t) => t.trim()).filter(Boolean),
            featured: p.featured,
            publishedAt: p.publishedAt,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Failed to update posts.');
      }
      sessionStorage.setItem(TOKEN_STORAGE_KEY, adminToken);
      setSuccessMsg('Blog posts published — visible to visitors immediately.');
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setError(err?.message || 'Failed to update posts.');
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
              <h3 className="text-xl font-serif font-bold text-[#3A5A40]">Admin: Manage Farm Stories</h3>
              <p className="text-xs text-[#588157] font-medium">Create, edit, or remove featured farm & innovation posts.</p>
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
            onClick={loadPosts}
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

        <button
          onClick={addPost}
          className="flex items-center space-x-1.5 text-[#3A5A40] hover:text-[#588157] text-xs font-bold"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Post</span>
        </button>

        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
          {posts.map((post) => (
            <div key={post.id} className="bg-[#F8F9F1] border border-[#E5E9D3] rounded-2xl p-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#A3B18A] font-bold uppercase text-[10px] tracking-wider">Post</span>
                <button onClick={() => removePost(post.id)} className="text-rose-500 hover:text-rose-700 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <input
                value={post.title}
                onChange={(e) => updatePost(post.id, 'title', e.target.value)}
                placeholder="Title"
                className="w-full bg-white border border-[#D8E2C3] rounded-lg px-2.5 py-1.5 font-bold"
              />
              <input
                value={post.excerpt}
                onChange={(e) => updatePost(post.id, 'excerpt', e.target.value)}
                placeholder="Short excerpt / summary"
                className="w-full bg-white border border-[#D8E2C3] rounded-lg px-2.5 py-1.5"
              />
              <textarea
                value={post.content}
                onChange={(e) => updatePost(post.id, 'content', e.target.value)}
                placeholder="Full story content"
                rows={4}
                className="w-full bg-white border border-[#D8E2C3] rounded-lg px-2.5 py-1.5"
              />
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <input
                    value={post.coverImage}
                    onChange={(e) => updatePost(post.id, 'coverImage', e.target.value)}
                    placeholder="Cover image URL (or upload below)"
                    className="w-full bg-white border border-[#D8E2C3] rounded-lg px-2.5 py-1.5"
                  />
                  <label className="flex items-center space-x-1.5 text-[#3A5A40] font-bold cursor-pointer w-fit">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(post.id, file);
                        e.target.value = '';
                      }}
                    />
                    <ImageUp className={`w-3.5 h-3.5 ${uploadingId === post.id ? 'animate-pulse' : ''}`} />
                    <span>{uploadingId === post.id ? 'Uploading...' : 'Upload Image'}</span>
                  </label>
                  {post.coverImage && (
                    <img src={post.coverImage} alt="Cover preview" className="w-full h-20 object-cover rounded-lg border border-[#D8E2C3]" />
                  )}
                </div>
                <input
                  value={post.authorName}
                  onChange={(e) => updatePost(post.id, 'authorName', e.target.value)}
                  placeholder="Author name"
                  className="bg-white border border-[#D8E2C3] rounded-lg px-2.5 py-1.5 h-fit"
                />
                <input
                  value={post.farmName}
                  onChange={(e) => updatePost(post.id, 'farmName', e.target.value)}
                  placeholder="Featured farm (optional)"
                  className="bg-white border border-[#D8E2C3] rounded-lg px-2.5 py-1.5 h-fit"
                />
                <select
                  value={post.zone}
                  onChange={(e) => updatePost(post.id, 'zone', e.target.value)}
                  className="bg-white border border-[#D8E2C3] rounded-lg px-2.5 py-1.5 h-fit"
                >
                  <option value="">No zone</option>
                  {ZONES.map((z) => (
                    <option key={z} value={z}>
                      {z}
                    </option>
                  ))}
                </select>
              </div>
              <input
                value={post.tags}
                onChange={(e) => updatePost(post.id, 'tags', e.target.value)}
                placeholder="Tags, comma-separated (e.g. Export, Innovation)"
                className="w-full bg-white border border-[#D8E2C3] rounded-lg px-2.5 py-1.5"
              />
              <label className="flex items-center space-x-2 text-[#3A5A40] font-bold">
                <input
                  type="checkbox"
                  checked={post.featured}
                  onChange={(e) => updatePost(post.id, 'featured', e.target.checked)}
                />
                <span>Mark as Featured</span>
              </label>
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          disabled={saving || loading}
          className="w-full bg-[#3A5A40] hover:bg-[#588157] disabled:opacity-60 text-white font-bold py-3 rounded-xl text-sm shadow-md transition-all"
        >
          {saving ? 'Publishing...' : 'Save & Publish Posts'}
        </button>
      </div>
    </div>
  );
};
