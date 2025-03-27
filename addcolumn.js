const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

client.connect()
  .then(() => console.log("✅ Connected to PostgreSQL!"))
  .catch(err => console.error("❌ Connection error:", err));

const alterTable = async () => {
  try {
    const query = `
      ALTER TABLE "user"
      ADD COLUMN IF NOT EXISTS email VARCHAR(255) NOT NULL DEFAULT '',
      ADD COLUMN IF NOT EXISTS phone VARCHAR(20) NOT NULL DEFAULT '',
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW(),
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();
    `;

    await client.query(query);
    console.log("✅ Columns added successfully!");
  } catch (err) {
    console.error("❌ Error modifying table:", err);
  } finally {
    client.end();
  }
};

alterTable();
