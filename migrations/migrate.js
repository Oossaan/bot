const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  user: 'postgres',
  password: 'Piok99o0',
  host: 'localhost',
  database: 'omega_jasa_titip',
  port: 5432
});

async function runMigration() {
  const client = await pool.connect();
  try {
    const migrationFile = path.join(__dirname, '001_create_orders_table.sql');
    const sql = fs.readFileSync(migrationFile, 'utf8');
    await client.query('BEGIN');
    await client.query(sql);
    await client.query('COMMIT');
    console.log('Migration executed successfully');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Migration failed:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration();
