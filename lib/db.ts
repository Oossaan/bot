import { Pool } from 'pg'

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'omega_jasa_titip',
  password: process.env.DB_PASSWORD || 'Piok99o0',
  port: parseInt(process.env.DB_PORT || '5432'),
})

export const query = async (text: string, params?: any[]) => {
  return await pool.query(text, params)
}
