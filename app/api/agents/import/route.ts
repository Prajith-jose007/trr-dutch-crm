// app/api/agents/import/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
};

export async function POST(request: NextRequest) {
  try {
    const { agents } = await request.json();

    if (!Array.isArray(agents) || agents.length === 0) {
      return NextResponse.json({ message: 'No agents to import' }, { status: 400 });
    }

    const connection = await mysql.createConnection(dbConfig);

    // Using the corrected schema with new fields
    const sql = 'INSERT INTO agents (name, address, email, phone, trn_number, customer_type_id, customer_discount, status) VALUES ?';

    const values = agents.map(agent => [
        agent.Name || '',
        agent.Address || '',
        agent.Email,
        agent.Phone,
        agent.TRNNumber || '',
        parseInt(agent.CustomerTypeID) || null,
        parseFloat(agent.Discount) || 0,
        'active' // Default status
    ]);

    await connection.query(sql, [values]);

    await connection.end();

    return NextResponse.json({ message: 'Agents imported successfully', importedCount: agents.length }, { status: 201 });

  } catch (error) {
    console.error('Error importing agents:', error);
    // Provide more specific error feedback if possible
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Failed to import agents', error: errorMessage }, { status: 500 });
  }
}
