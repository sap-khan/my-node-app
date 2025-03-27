const { Client } = require('pg');
require('dotenv').config();

// Create a new PostgreSQL client
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Connect to PostgreSQL
client.connect()
  .then(() => console.log("✅ Connected to PostgreSQL!"))
  .catch(err => console.error("❌ Connection error:", err));

// Fetch data from the "user" table
const fetchUsers = async () => {
  try {
    const result = await client.query('SELECT * FROM "users"'); // Fetch all rows
    console.log("📌 Users Data:", result.rows); // Display data in console
  } catch (err) {
    console.error("❌ Error fetching data:", err);
  } finally {
    client.end(); // Close the connection after fetching
  }
};

// Call the function
fetchUsers();
