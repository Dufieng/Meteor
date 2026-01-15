const express = require("express")
const sqlite3 = require("sqlite3").verbose()

const app = express()
app.use(express.json()) // щоб читати JSON
app.use(express.static("public"))

// 1️⃣ база даних (файл)
const db = new sqlite3.Database("meteo.db")

// 2️⃣ таблиця (якщо ще нема)
db.run(`
  CREATE TABLE IF NOT EXISTS data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    temperature REAL,
    humidity REAL,
    time DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

// 3️⃣ ESP32 → сюди
app.post("/api/data", (req, res) => {
  const { temperature, humidity } = req.body

  db.run(
    "INSERT INTO data (temperature, humidity) VALUES (?, ?)",
    [temperature, humidity]
  )

  res.json({ status: "ok" })
})


app.get("/api/data", (req, res) => {
  const data = []

  const now = new Date()
  for (let i = 0; i < 50; i++) {
    const time = new Date(now - (50 - i) * 60000) // хвилина назад
    data.push({
      time: time.toISOString().slice(11,16), // тільки год:хв
      temperature: (20 + Math.random() * 5).toFixed(1), // 20–25°C
      humidity: (50 + Math.random() * 10).toFixed(0)    // 50–60%
    })
  }

  res.json(data)
})



app.listen(3000, () => {
  console.log("http://localhost:3000")
})

