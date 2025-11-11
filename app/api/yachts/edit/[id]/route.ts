
// app/api/yachts/edit/[id]/route.ts
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

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const packageId = params.id;
  if (!packageId) {
    return NextResponse.json({ message: 'Package ID is required' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const {
      yachtName,
      type,
      status,
      pricing,
    } = body;

    const connection = await mysql.createConnection(dbConfig);

    const sql = `
      UPDATE yacht_packages SET
        yacht_name = ?,
        type = ?,
        status = ?,
        dinner_child_price = ?,
        dinner_adult_price = ?,
        dinner_adult_alc_price = ?,
        top_deck_child_price = ?,
        top_deck_adult_price = ?,
        vip_child_price = ?,
        vip_adult_price = ?,
        vip_adult_alc_price = ?,
        royal_child_price = ?,
        royal_adult_price = ?,
        royal_adult_alc_price = ?
      WHERE id = ?
    `;

    const values = [
      yachtName,
      type,
      status,
      pricing.dinner.child,
      pricing.dinner.adult,
      pricing.dinner.adult_alc,
      pricing.top_deck.child,
      pricing.top_deck.adult,
      pricing.vip.child,
      pricing.vip.adult,
      pricing.vip.adult_alc,
      pricing.royal.child,
      pricing.royal.adult,
      pricing.royal.adult_alc,
      packageId
    ];

    const [result] = await connection.execute(sql, values);

    await connection.end();

    const changedRows = (result as any).changedRows;

    if (changedRows > 0) {
        return NextResponse.json({ message: 'Package updated successfully' }, { status: 200 });
    } else {
        return NextResponse.json({ message: 'No changes were made or package not found' }, { status: 200 });
    }

  } catch (error) {
    console.error('Error updating package:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Failed to update package', error: errorMessage }, { status: 500 });
  }
}
