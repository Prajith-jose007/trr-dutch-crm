
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

    // Assuming your CSV headers match these keys: FirstName, LastName, Email, PhoneNumber
    // A developer may need to adjust the column names (name, email, phone_number, etc.)
    // to match the final schema.sql for the 'agents' table.
    const sql = 'INSERT INTO agents (name, email, phone_number, status) VALUES ?';

    const values = agents.map(agent => [
        `${agent.FirstName || ''} ${agent.LastName || ''}`.trim(),
        agent.Email,
        agent.PhoneNumber,
        'active' // Default status
    ]);

    await connection.query(sql, [values]);

    await connection.end();

    return NextResponse.json({ message: 'Agents imported successfully', importedCount: agents.length }, { status: 201 });

  } catch (error) {
    console.error('Error importing agents:', error);
    return NextResponse.json({ message: 'Failed to import agents' }, { status: 500 });
  }
}

    