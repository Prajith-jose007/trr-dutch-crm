
// app/api/bookings/import/route.ts
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
    const { bookings } = await request.json();

    if (!Array.isArray(bookings) || bookings.length === 0) {
      return NextResponse.json({ message: 'No bookings to import' }, { status: 400 });
    }

    const connection = await mysql.createConnection(dbConfig);

    const sql = `
      INSERT INTO bookings (
        booking_date, client_name, client_phone, agent_name, yacht_package_id, 
        payment_mode, ticket_ref, total_amount, discount, net_amount, commission, 
        notes, dinner_child_qty, dinner_adult_qty, dinner_adult_alc_qty,
        top_deck_child_qty, top_deck_adult_qty, vip_child_qty, vip_adult_qty, 
        vip_adult_alc_qty, royal_child_qty, royal_adult_qty, royal_adult_alc_qty,
        status, payment_status, created_by
      ) VALUES ?
    `;

    const values = bookings.map(booking => [
      booking.BookingDate,
      booking.ClientName,
      booking.ClientPhone,
      booking.AgentName,
      booking.YachtPackageID,
      booking.PaymentMode,
      booking.TicketRef,
      parseFloat(booking.TotalAmount) || 0,
      parseFloat(booking.Discount) || 0,
      parseFloat(booking.NetAmount) || 0,
      parseFloat(booking.Commission) || 0,
      booking.Notes,
      parseInt(booking.DinnerChildQty) || 0,
      parseInt(booking.DinnerAdultQty) || 0,
      parseInt(booking.DinnerAdultAlcQty) || 0,
      parseInt(booking.TopDeckChildQty) || 0,
      parseInt(booking.TopDeckAdultQty) || 0,
      parseInt(booking.VipChildQty) || 0,
      parseInt(booking.VipAdultQty) || 0,
      parseInt(booking.VipAdultAlcQty) || 0,
      parseInt(booking.RoyalChildQty) || 0,
      parseInt(booking.RoyalAdultQty) || 0,
      parseInt(booking.RoyalAdultAlcQty) || 0,
      booking.Status || 'pending',
      booking.PaymentStatus || 'unpaid',
      'csv_import' // Or get from authenticated user
    ]);

    await connection.query(sql, [values]);

    await connection.end();

    return NextResponse.json({ message: 'Bookings imported successfully', importedCount: bookings.length }, { status: 201 });

  } catch (error) {
    console.error('Error importing bookings:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Failed to import bookings', error: errorMessage }, { status: 500 });
  }
}
