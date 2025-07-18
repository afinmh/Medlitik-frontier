/**
 * Database Connection for Next.js API Routes
 * Menggunakan pg (PostgreSQL client) untuk koneksi database
 */

import { Pool } from 'pg';

// Konfigurasi koneksi database
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'medlitik_dev',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  max: 20, // maksimal koneksi dalam pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

/**
 * Execute SQL query
 * @param {string} text - SQL query string
 * @param {Array} params - Query parameters
 * @returns {Promise} - Query result
 */
export async function query(text, params) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

/**
 * Get a client from pool for transactions
 * @returns {Promise} - Database client
 */
export async function getClient() {
  return await pool.connect();
}

/**
 * Close all connections
 */
export async function end() {
  return await pool.end();
}

export default pool;
