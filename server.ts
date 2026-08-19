import express from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import multer from "multer";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Serve uploaded images from disk regardless of dev (Vite) or production (dist) mode.
const uploadsDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(uploadsDir));

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${crypto.randomUUID()}${ext}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_IMAGE_TYPES.has(file.mimetype)) {
      return cb(new Error("Only JPEG, PNG, WEBP, or GIF images are allowed"));
    }
    cb(null, true);
  }
});

// Simple in-memory sliding-window rate limiter (per IP + route key).
const rateLimitHits = new Map<string, number[]>();
function rateLimit(key: string, maxRequests: number, windowMs: number) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const id = `${key}:${req.ip}`;
    const now = Date.now();
    const hits = (rateLimitHits.get(id) || []).filter((t) => now - t < windowMs);
    if (hits.length >= maxRequests) {
      return res.status(429).json({ error: "Too many requests. Please try again shortly." });
    }
    hits.push(now);
    rateLimitHits.set(id, hits);
    next();
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// API Route for Gemini AI Assistant (Agricultural & Market Advisory)
app.post("/api/agri-ai", async (req, res) => {
  try {
    const { prompt, context } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({
        reply: "Gemini API key is currently not configured in environment. System recommendation: You can proceed with standard market pricing calculations, NEPC export checklists, and offline inventory tools provided in AgriConnect Nigeria.",
        mode: "offline_fallback"
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const systemInstruction = `You are "NaijaAgri AI", an expert agricultural market advisor and trade specialist for Nigeria and cross-border West Africa trade.
Your goals:
1. Provide precise market pricing insights for crops & livestock across Nigeria's 6 geopolitical zones (North-West, North-East, North-Central, South-West, South-East, South-South).
2. Advise on export guidelines (NEPC certifications, phytosanitary requirements, air-freight vs sea-freight to UK/USA/Canada/EU).
3. Provide farmer crop yield optimization, pest management, and livestock health tips.
4. Assist buyers and diaspora shoppers with currency conversion, escrow safety, and shipping logistics estimates.
Keep your answers professional, helpful, concise, and structured with bullet points. Include relevant Nigerian agricultural context.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: `${systemInstruction}\n\nUser Context/Question: ${prompt}` }
          ]
        }
      ]
    });

    const replyText = response.text || "I was unable to analyze that request at this moment. Please try again.";
    return res.status(200).json({ reply: replyText, mode: "live" });
  } catch (error: any) {
    console.error("Error in /api/agri-ai:", error);
    return res.status(500).json({
      error: "Failed to process AI advisory request.",
      details: error?.message || "Unknown error"
    });
  }
});

// Paystack: Get current prices
app.get("/api/prices", (_req, res) => {
  try {
    const pricesPath = path.join(process.cwd(), "public", "data", "prices.json");
    if (!fs.existsSync(pricesPath)) {
      return res.json({ prices: [] });
    }
    const pricesData = fs.readFileSync(pricesPath, "utf-8");
    res.json(JSON.parse(pricesData));
  } catch (error: any) {
    console.error("Error fetching prices:", error);
    res.status(500).json({ error: "Failed to fetch prices", details: error?.message });
  }
});

// Paystack: Update prices (admin only)
app.post("/api/prices/update", rateLimit("prices-update", 10, 60_000), (req, res) => {
  try {
    const token = req.headers["x-admin-token"] || req.body.token;
    if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
      return res.status(403).json({ error: "Forbidden: Invalid admin token" });
    }
    const { prices } = req.body;
    if (!Array.isArray(prices) || prices.length === 0) {
      return res.status(400).json({ error: "Missing or invalid prices array" });
    }
    const isValidEntry = (p: any) =>
      p && typeof p.item === "string" && typeof p.price === "number" && p.price > 0 && typeof p.unit === "string";
    if (!prices.every(isValidEntry)) {
      return res.status(400).json({ error: "Each price entry requires item (string), price (positive number), unit (string)" });
    }
    const dataDir = path.join(process.cwd(), "public", "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const pricesPath = path.join(dataDir, "prices.json");
    fs.writeFileSync(pricesPath, JSON.stringify({ prices }, null, 2));
    res.json({ ok: true, message: "Prices updated" });
  } catch (error: any) {
    console.error("Error updating prices:", error);
    res.status(500).json({ error: "Failed to update prices", details: error?.message });
  }
});

// Blog: Get all posts
app.get("/api/blogs", (_req, res) => {
  try {
    const blogsPath = path.join(process.cwd(), "public", "data", "blogs.json");
    if (!fs.existsSync(blogsPath)) {
      return res.json({ posts: [] });
    }
    const blogsData = fs.readFileSync(blogsPath, "utf-8");
    res.json(JSON.parse(blogsData));
  } catch (error: any) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Failed to fetch blogs", details: error?.message });
  }
});

// Blog: Update all posts (admin only)
app.post("/api/blogs/update", rateLimit("blogs-update", 10, 60_000), (req, res) => {
  try {
    const token = req.headers["x-admin-token"] || req.body.token;
    if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
      return res.status(403).json({ error: "Forbidden: Invalid admin token" });
    }
    const { posts } = req.body;
    if (!Array.isArray(posts)) {
      return res.status(400).json({ error: "Missing or invalid posts array" });
    }
    const isValidPost = (p: any) =>
      p && typeof p.title === "string" && p.title.trim() && typeof p.excerpt === "string" && typeof p.content === "string";
    if (!posts.every(isValidPost)) {
      return res.status(400).json({ error: "Each post requires title, excerpt, and content (strings)" });
    }
    const dataDir = path.join(process.cwd(), "public", "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const blogsPath = path.join(dataDir, "blogs.json");
    fs.writeFileSync(blogsPath, JSON.stringify({ posts }, null, 2));
    res.json({ ok: true, message: "Blog posts updated" });
  } catch (error: any) {
    console.error("Error updating blogs:", error);
    res.status(500).json({ error: "Failed to update blogs", details: error?.message });
  }
});

// Upload an image (e.g. blog cover photo). Admin only.
app.post("/api/upload/image", rateLimit("upload-image", 20, 60_000), (req, res) => {
  const token = req.headers["x-admin-token"];
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({ error: "Forbidden: Invalid admin token" });
  }

  upload.single("image")(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({ error: err.message || "Upload failed" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }
    return res.json({ ok: true, url: `/uploads/${req.file.filename}` });
  });
});

// Paystack: Initialize transaction
app.post("/api/pay", rateLimit("pay-init", 15, 60_000), async (req, res) => {  try {
    const { amount, email, callback_url, metadata } = req.body;
    if (!amount || typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ error: "Amount must be a positive number" });
    }
    if (amount > 50_000_000) {
      return res.status(400).json({ error: "Amount exceeds maximum allowed transaction size" });
    }
    if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
      return res.status(400).json({ error: "A valid email address is required" });
    }
    const amountKobo = Math.round(amount * 100); // NGN to kobo
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      { amount: amountKobo, email, callback_url, metadata },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
          "Content-Type": "application/json"
        }
      }
    );
    return res.json(response.data);
  } catch (error: any) {
    console.error("Error initializing payment:", error?.response?.data || error?.message);
    return res.status(500).json({
      error: "Failed to initialize payment",
      details: error?.response?.data || error?.message
    });
  }
});

// Paystack: Verify transaction (called after checkout redirect)
app.get("/api/pay/verify/:reference", rateLimit("pay-verify", 30, 60_000), async (req, res) => {
  try {
    const { reference } = req.params;
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`
        }
      }
    );
    return res.json(response.data);
  } catch (error: any) {
    console.error("Error verifying payment:", error?.response?.data || error?.message);
    return res.status(500).json({
      error: "Failed to verify payment",
      details: error?.response?.data || error?.message
    });
  }
});

// Fast local check backed by webhook-confirmed payments (avoids hitting Paystack for polling UIs).
app.get("/api/pay/status/:reference", (req, res) => {
  try {
    const { reference } = req.params;
    const storePath = path.join(process.cwd(), "public", "data", "verified_payments.json");
    if (!fs.existsSync(storePath)) {
      return res.json({ verified: false });
    }
    const store = JSON.parse(fs.readFileSync(storePath, "utf-8"));
    const record = store[reference];
    return res.json({ verified: !!record, record: record || null });
  } catch (error: any) {
    console.error("Error reading payment status:", error?.message);
    return res.status(500).json({ error: "Failed to read payment status" });
  }
});

// Paystack: Webhook receiver (verify signature & log)
app.post("/api/webhook/paystack", (req, res) => {
  try {
    const payload = JSON.stringify(req.body);
    const signature = req.headers["x-paystack-signature"] as string;
    const secret = process.env.PAYSTACK_SECRET || "";
    const hash = crypto.createHmac("sha512", secret).update(payload).digest("hex");
    
    if (hash !== signature) {
      console.warn("Invalid webhook signature");
      return res.status(400).json({ error: "Invalid signature" });
    }

    const event = req.body.event || "";
    const data = req.body.data || {};

    // Log successful payments and persist them so /api/pay/status can confirm without calling Paystack again.
    if (event === "charge.success" || event === "payment.success") {
      const logsDir = path.join(process.cwd(), "public", "data");
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
      }
      const logPath = path.join(logsDir, "payments.log");
      const logEntry = `${new Date().toISOString()} | Event: ${event} | Ref: ${data.reference || "N/A"} | Amount: ${data.amount || "N/A"} | Email: ${data.customer?.email || "N/A"}\n`;
      fs.appendFileSync(logPath, logEntry);

      const storePath = path.join(logsDir, "verified_payments.json");
      const store = fs.existsSync(storePath) ? JSON.parse(fs.readFileSync(storePath, "utf-8")) : {};
      if (data.reference) {
        store[data.reference] = {
          amount: data.amount,
          email: data.customer?.email || null,
          verifiedAt: new Date().toISOString()
        };
        fs.writeFileSync(storePath, JSON.stringify(store, null, 2));
      }
    }

    console.log(`[Paystack] Event: ${event}, Reference: ${data.reference}`);
    return res.status(200).json({ ok: true });
  } catch (error: any) {
    console.error("Error processing webhook:", error?.message);
    return res.status(500).json({ error: "Webhook processing failed" });
  }
});

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "AgriConnect Nigeria", timestamp: new Date().toISOString() });
});

// Live FX rates (NGN -> USD/EUR/GBP) via the free, keyless open.er-api.com feed.
// Cached in memory since the upstream API only refreshes once per day.
let fxCache: { rates: { USD: number; EUR: number; GBP: number }; updatedAt: string } | null = null;
let fxCacheFetchedAt = 0;
const FX_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

app.get("/api/fx", async (_req, res) => {
  try {
    if (fxCache && Date.now() - fxCacheFetchedAt < FX_CACHE_TTL_MS) {
      return res.json(fxCache);
    }
    const response = await axios.get("https://open.er-api.com/v6/latest/NGN", { timeout: 8000 });
    const rates = response.data?.rates;
    if (!rates?.USD || !rates?.EUR || !rates?.GBP) {
      throw new Error("Malformed FX response");
    }
    fxCache = {
      rates: { USD: rates.USD, EUR: rates.EUR, GBP: rates.GBP },
      updatedAt: new Date().toISOString()
    };
    fxCacheFetchedAt = Date.now();
    return res.json(fxCache);
  } catch (error: any) {
    console.error("Error fetching FX rates:", error?.message);
    if (fxCache) {
      return res.json(fxCache);
    }
    // Fallback so the UI keeps functioning if the upstream FX API is unreachable and no cache exists yet.
    return res.json({
      rates: { USD: 1 / 1520, EUR: 1 / 1650, GBP: 1 / 1950 },
      updatedAt: new Date().toISOString(),
      fallback: true
    });
  }
});

// Live price ticker: nudges prices by a small random walk so all clients polling
// /api/prices see a shared, continuously updating market feed.
function tickLivePrices() {
  try {
    const pricesPath = path.join(process.cwd(), "public", "data", "prices.json");
    if (!fs.existsSync(pricesPath)) return;
    const parsed = JSON.parse(fs.readFileSync(pricesPath, "utf-8"));
    const prices = Array.isArray(parsed.prices) ? parsed.prices : [];
    const now = new Date().toISOString();
    const updated = prices.map((p: any) => {
      const pctChange = (Math.random() * 1.6 - 0.8) / 100; // +/-0.8%
      const newPrice = Math.max(1, Math.round(p.price * (1 + pctChange)));
      return { ...p, price: newPrice, updatedAt: now };
    });
    fs.writeFileSync(pricesPath, JSON.stringify({ prices: updated }, null, 2));
  } catch (error: any) {
    console.error("Error ticking live prices:", error?.message);
  }
}
setInterval(tickLivePrices, 15000);

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[AgriConnect Nigeria] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
