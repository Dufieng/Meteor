const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public")); // віддає сайт

// API
app.get("/api/data", (req, res) => {
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

const PORT = process.env.PORT || 3000; // DigitalOcean використовує змінну PORT
const HOST = process.env.HOST || '0.0.0.0'; // Для cloud hosting потрібно слухати на всіх інтерфейсах
app.listen(PORT, HOST, () => console.log(`Server running on ${HOST}:${PORT}`));

