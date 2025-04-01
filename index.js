const express = require('express');
const { Client } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Create a PostgreSQL client
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Connect to PostgreSQL
client.connect()
  .then(() => console.log("✅ Connected to PostgreSQL!"))
  .catch(err => console.error("❌ Connection error:", err));

// API Endpoint to fetch users
app.get('/users', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM "employees"'); // Fetch all users
    res.json(result.rows); // Send data as JSON response
  } catch (err) {
    console.error("❌ Error fetching data:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
