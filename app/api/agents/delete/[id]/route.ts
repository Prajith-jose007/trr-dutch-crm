
// app/api/agents/delete/[id]/route.ts
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

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const agentId = params.id;
  if (!agentId) {
    return NextResponse.json({ message: 'Agent ID is required' }, { status: 400 });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);

    const sql = 'DELETE FROM agents WHERE id = ?';
    
    const [result] = await connection.execute(sql, [agentId]);

    await connection.end();

    const deleteResult = result as any;

    if (deleteResult.affectedRows > 0) {
        return NextResponse.json({ message: 'Agent deleted successfully' }, { status: 200 });
    } else {
        return NextResponse.json({ message: 'Agent not found or already deleted' }, { status: 404 });
    }

  } catch (error) {
    console.error('Error deleting agent:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Failed to delete agent', error: errorMessage }, { status: 500 });
  }
}
