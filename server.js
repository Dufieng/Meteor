const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());

// Логування всіх запитів
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// API routes ПЕРЕД статичними файлами
app.get("/api/data", (req, res) => {
  console.log("API /api/data called");
  // тестові дані
  const data = [];
  const now = new Date();
  for (let i = 0; i < 50; i++) {
    const time = new Date(now - (50 - i) * 60000);
    data.push({
      time: time.toISOString().slice(11,16),
      temperature: (20 + Math.random() * 5).toFixed(1),
      humidity: (50 + Math.random() * 10).toFixed(0)
    });
  }
  res.json(data);
});

// Статичні файли після API
app.use(express.static(path.join(__dirname, "public")));

// Fallback для SPA (тільки для не-API шляхів)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000; // DigitalOcean використовує змінну PORT
const HOST = process.env.HOST || '0.0.0.0'; // Для cloud hosting потрібно слухати на всіх інтерфейсах
app.listen(PORT, HOST, () => console.log(`Server running on ${HOST}:${PORT}`));

