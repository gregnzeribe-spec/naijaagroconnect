# Paystack Integration & Deployment Guide

## Setup & Build

### 1. Install Dependencies
```bash
npm install
# or
bun install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and fill in:
```bash
cp .env.example .env
```

Edit `.env` and add:
- `PAYSTACK_SECRET` = Your Paystack secret key (from Paystack Dashboard → Settings → API Keys)
- `ADMIN_TOKEN` = A strong random token (used to protect `/api/prices/update`)

Example:
```env
GEMINI_API_KEY=sk-...
APP_URL=https://naijaagroconnect.com
PAYSTACK_SECRET=sk_live_abc123...
ADMIN_TOKEN=your-super-secure-random-token
```

### 3. Build & Deploy

**Local development:**
```bash
npm run dev
```

**Production build:**
```bash
npm run build
npm start
```

This creates `dist/server.cjs` which is a Node.js server bundle ready for deployment.

## API Endpoints

### GET `/api/prices`
Returns current product prices.

**Response:**
```json
{
  "prices": [
    {
      "id": 1,
      "item": "Export Grade White Yams (Large Tubers)",
      "price": 48000,
      "unit": "100 TUBERS",
      "region": "North-Central",
      "minOrder": 100,
      "updatedAt": "2025-08-15T10:30:00Z"
    }
  ]
}
```

**Test:**
```bash
curl https://naijaagroconnect.com/api/prices
```

---

### POST `/api/prices/update` (Admin only)
Updates all prices. Requires `x-admin-token` header matching `ADMIN_TOKEN`.

**Request:**
```bash
curl -X POST https://naijaagroconnect.com/api/prices/update \
  -H "x-admin-token: your-admin-token" \
  -H "Content-Type: application/json" \
  -d '{
    "prices": [
      {
        "id": 1,
        "item": "Export Grade White Yams",
        "price": 50000,
        "unit": "100 TUBERS",
        "region": "North-Central",
        "minOrder": 100,
        "updatedAt": "2025-08-15T11:00:00Z"
      }
    ]
  }'
```

---

### POST `/api/pay`
Initializes a Paystack payment transaction.

**Request:**
```bash
curl -X POST https://naijaagroconnect.com/api/pay \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1000,
    "email": "buyer@example.com"
  }'
```

**Response:**
```json
{
  "status": true,
  "message": "Authorization URL created",
  "data": {
    "authorization_url": "https://checkout.paystack.com/xxx",
    "access_code": "...",
    "reference": "..."
  }
}
```

**Frontend flow:**
1. Call `/api/pay` with amount & email
2. Get `authorization_url` from response
3. Redirect user to Paystack checkout
4. Paystack redirects back to your site after payment
5. Verify payment reference with Paystack API (optional but recommended)

---

### POST `/api/webhook/paystack`
Paystack webhook receiver. **Configure this URL in Paystack dashboard.**

**Paystack Dashboard Setup:**
1. Login to https://dashboard.paystack.com
2. Go Settings → Webhooks
3. Add webhook URL: `https://naijaagroconnect.com/api/webhook/paystack`
4. Subscribe to events: `charge.success`, `payment.success`

**What it does:**
- Verifies HMAC-SHA512 signature from Paystack
- Logs successful payments to `public/data/payments.log`
- Returns `{ ok: true }` on success

**Webhook signature verification:**
Paystack sends `x-paystack-signature` header. We validate it using PAYSTACK_SECRET to ensure authenticity.

---

## Frontend Integration Example

### React component to initiate payment:

```javascript
import { useState } from 'react';

export default function PaymentForm() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Call your backend to initialize payment
      const response = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 1000, // NGN
          email: 'customer@example.com'
        })
      });

      const data = await response.json();

      // Step 2: Redirect to Paystack checkout
      if (data.data?.authorization_url) {
        window.location.href = data.data.authorization_url;
      } else {
        alert('Failed to initialize payment');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Pay with Paystack'}
      </button>
    </form>
  );
}
```

---

## Deployment Platforms

### Vercel (Recommended for this stack)
```bash
npm run build
vercel deploy
```

Make sure to set environment variables in Vercel dashboard:
- `PAYSTACK_SECRET`
- `ADMIN_TOKEN`
- `GEMINI_API_KEY`
- `APP_URL`

### Railway / Render / Fly.io
```bash
# Build
npm run build

# Deploy (follows each platform's guide)
# Make sure to set environment variables
```

### Traditional VPS / cPanel
1. Build locally: `npm run build`
2. Upload `dist/server.cjs` and `public/` to server
3. Set environment variables
4. Run: `node dist/server.cjs`
5. Use PM2 or systemd to keep it running

---

## Monitoring & Debugging

### Check logs:
```bash
# Payments log
cat public/data/payments.log

# Server logs (in PM2)
pm2 logs naijaagroconnect
```

### Test endpoints:
```bash
# Check prices
curl https://naijaagroconnect.com/api/prices

# Update prices (admin)
curl -X POST https://naijaagroconnect.com/api/prices/update \
  -H "x-admin-token: YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prices": []}'

# Simulate payment (testing only - use Paystack test keys)
curl -X POST https://naijaagroconnect.com/api/pay \
  -H "Content-Type: application/json" \
  -d '{"amount": 100, "email": "test@example.com"}'
```

### Security checklist:
- [ ] Paystack secret key is in `.env` (not hardcoded)
- [ ] Admin token is strong and random
- [ ] HTTPS/SSL is enabled
- [ ] Webhook signature verification is active
- [ ] Payment logs are not publicly accessible
- [ ] Rate limiting is configured (optional but recommended)

---

## Troubleshooting

### "Forbidden: Invalid admin token" on `/api/prices/update`
- Check `x-admin-token` header matches `ADMIN_TOKEN` in `.env`
- Verify `.env` file is loaded correctly

### Payment initialization fails
- Verify `PAYSTACK_SECRET` is correct and active
- Check Paystack dashboard for API key status
- Ensure you're using live keys in production, test keys in development

### Webhook not receiving events
- Confirm webhook URL in Paystack dashboard is correct
- Check server logs for errors
- Verify `PAYSTACK_SECRET` matches between app and Paystack dashboard
- Use Paystack's webhook tester in dashboard to manually trigger a test

### Prices.json not updating
- Ensure `public/data/` directory exists and is writable
- Check file permissions (should be `644` or similar)
- Verify request body format is correct

---

## Next Steps

1. **Get Paystack keys:** https://dashboard.paystack.com/settings/developer
2. **Update `.env`** with your keys
3. **Test locally:** `npm run dev`
4. **Build:** `npm run build`
5. **Deploy to Vercel/Railway/VPS**
6. **Set webhook URL** in Paystack dashboard
7. **Monitor payments** via logs and Paystack dashboard
