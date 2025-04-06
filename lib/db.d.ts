  declare module '@/lib/db' {
  export function query(text: string, params?: any[]): Promise<{
    rows: any[]
    rowCount: number
  }>
}
