const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

client.connect()
  .then(() => console.log("✅ Connected to PostgreSQL!"))
  .catch(err => console.error("❌ Connection error:", err));

const insertUsers = async () => {
  try {
    const query = `
      INSERT INTO users (name, email, phone, created_at, updated_at)
      VALUES 
      ('John Doe', 'john@example.com', '1234567890', NOW(), NOW()),
      ('Jane Smith', 'jane@example.com', '9876543210', NOW(), NOW()),
      ('Alice Johnson', 'alice@example.com', '5554443333', NOW(), NOW());
    `;

    await client.query(query);
    console.log("✅ Users inserted successfully!");
  } catch (err) {
    console.error("❌ Error inserting data:", err);
  } finally {
    client.end();
  }
};

insertUsers();
