// app/api/bookings/list/route.ts
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
    
    // SQL query to select all bookings. 
    // A developer may need to adjust this query based on the final schema.
    const sql = 'SELECT * FROM bookings ORDER BY booking_date DESC';
    
    const [rows] = await connection.execute(sql);
    
    await connection.end();

    return NextResponse.json(rows);

  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ message: 'Failed to fetch bookings' }, { status: 500 });
  }
}
