// app/api/auth/login/route.ts
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
    const { userId, password } = await request.json();

    if (!userId || !password) {
      return NextResponse.json({ message: 'User ID and password are required' }, { status: 400 });
    }

    const connection = await mysql.createConnection(dbConfig);

    // Find the user by user_id in the new 'users' table
    const sql = 'SELECT id, first_name, last_name, user_id, role, password FROM users WHERE user_id = ?';
    const [rows] = await connection.execute(sql, [userId]);

    await connection.end();

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const user: any = rows[0];

    // --- IMPORTANT ---
    // In a real application, you MUST compare a hashed password, not plain text.
    // This is a placeholder for demonstration purposes.
    // Example using bcrypt: const isValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = (password === user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Do not send the password back to the client
    const userToReturn = {
      id: user.user_id, // Use user_id as the unique identifier on the client
      name: `${user.first_name} ${user.last_name}`,
      role: user.role,
    };

    return NextResponse.json({ message: 'Login successful', user: userToReturn }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Login failed', error: errorMessage }, { status: 500 });
  }
}
