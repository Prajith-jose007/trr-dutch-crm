
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

    const sql = `
      INSERT INTO agents (
        id, name, address, email, phone_number, trn_number, customer_type_id, customer_type, status
      ) VALUES ?
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        address = VALUES(address),
        email = VALUES(email),
        phone_number = VALUES(phone_number),
        trn_number = VALUES(trn_number),
        customer_type_id = VALUES(customer_type_id),
        customer_type = VALUES(customer_type),
        status = VALUES(status)
    `;

    const values = agents.map((agent: any) => [
      agent.id,
      agent.name,
      agent.address,
      agent.email,
      agent.phone_no, // Changed from phone_number to phone_no
      agent.trn_number,
      parseInt(agent.customer_type_id) || null,
      agent['Customer type name'], // Accessing field with space
      'active' // Default status
    ]);

    const [result] = await connection.query(sql, [values]);

    await connection.end();
    
    const insertResult = result as any;

    return NextResponse.json({ message: 'Agents imported successfully', importedCount: insertResult.affectedRows }, { status: 200 });

  } catch (error) {
    console.error('Error importing agents:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Failed to import agents', error: errorMessage }, { status: 500 });
  }
}
