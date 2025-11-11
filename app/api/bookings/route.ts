// app/api/bookings/route.ts
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

// Helper function to format date for MySQL
function formatMySqlDateTime(dateString: string) {
    if (!dateString) return null;
    try {
        const date = new Date(dateString);
        // Pad single digit month/day/etc. with a leading zero
        const pad = (num: number) => num.toString().padStart(2, '0');
        
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    } catch (e) {
        console.error("Could not parse date:", dateString);
        return null; // Return null if date is invalid
    }
}


export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json();

    // Connect to the database
    const connection = await mysql.createConnection(dbConfig);

    // SQL query to insert data into your 'bookings' table
    // Note: The column names here must match your schema.sql
    const sql = `
      INSERT INTO bookings (
        booking_date, client_name, client_phone, agent_name, 
        yacht_package_id, payment_mode, ticket_ref, total_amount, 
        discount, net_amount, commission, notes,
        dinner_child_qty, dinner_adult_qty, dinner_adult_alc_qty,
        top_deck_child_qty, top_deck_adult_qty,
        vip_child_qty, vip_adult_qty, vip_adult_alc_qty,
        royal_child_qty, royal_adult_qty, royal_adult_alc_qty
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    // The values from the form data, with date formatted for MySQL
    const values = [
      formatMySqlDateTime(bookingData.bookingDate),
      bookingData.clientName,
      bookingData.clientPhone,
      bookingData.agentName,
      bookingData.yachtPackage,
      bookingData.paymentMode,
      bookingData.ticketRef,
      bookingData.totalAmount,
      bookingData.discount,
      bookingData.netAmount,
      bookingData.commission,
      bookingData.notes,
      bookingData.quantities.dinner_child,
      bookingData.quantities.dinner_adult,
      bookingData.quantities.dinner_adult_alc,
      bookingData.quantities.top_deck_child,
      bookingData.quantities.top_deck_adult,
      bookingData.quantities.vip_child,
      bookingData.quantities.vip_adult,
      bookingData.quantities.vip_adult_alc,
      bookingData.quantities.royal_child,
      bookingData.quantities.royal_adult,
      bookingData.quantities.royal_adult_alc,
    ];

    // Execute the query
    await connection.execute(sql, values);

    // Close the connection
    await connection.end();

    return NextResponse.json({ message: 'Booking created successfully' }, { status: 201 });

  } catch (error) {
    console.error('Error creating booking:', error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ message: 'Failed to create booking', error: errorMessage }, { status: 500 });
  }
}
