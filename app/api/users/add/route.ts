
// app/api/users/add/route.ts
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
    const { firstName, lastName, userId, role, password } = await request.json();

    if (!firstName || !lastName || !userId || !role || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const connection = await mysql.createConnection(dbConfig);

    // In a real application, you should HASH the password before storing it.
    // For example, using bcrypt: const hashedPassword = await bcrypt.hash(password, 10);
    // For this example, we'll store it as plain text which is NOT secure.
    const hashedPassword = password;

    const sql = 'INSERT INTO users (first_name, last_name, user_id, role, password, status) VALUES (?, ?, ?, ?, ?, ?)';
    
    const values = [
        firstName,
        lastName,
        userId,
        role,
        hashedPassword,
        'active' // Default status
    ];

    await connection.query(sql, values);

    await connection.end();

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating user:', error);

    // Check for duplicate entry error (error code ER_DUP_ENTRY for MySQL)
    if (error.code === 'ER_DUP_ENTRY') {
        return NextResponse.json({ message: 'User ID already exists.' }, { status: 409 });
    }

    const errorMessage = error.message || 'An unknown error occurred';
    return NextResponse.json({ message: 'Failed to create user', error: errorMessage }, { status: 500 });
  }
}
