declare module '@/lib/db' {
  import { Pool } from 'pg'
  
  export const query: (text: string, params?: any[]) => Promise<{
    rows: any[]
    rowCount: number
  }>
  export const pool: Pool
}
