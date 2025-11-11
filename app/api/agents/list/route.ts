
// app/api/agents/list/route.ts
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
};

export async function GET() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const sql = 'SELECT * FROM agents ORDER BY date_of_creation DESC';
    
    const [rows] = await connection.execute(sql);
    
    await connection.end();

    return NextResponse.json(rows);

  } catch (error) {
    console.error('Error fetching agents:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Failed to fetch agents', error: errorMessage }, { status: 500 });
  }
}
