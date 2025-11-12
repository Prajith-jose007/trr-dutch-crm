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

    // Corrected SQL to use phone_number instead of phone
    const sql = `
      INSERT INTO agents (
        id, is_tmc, name, agency_code, short_name, company_type_id, customer_type_id, 
        tmc_id, parent_agency_id, country, city, zipcode, address, phone_number, email, 
        staff_email, website, status, created_by, created_at, updated_by, updated_at, 
        version, customer_type, trn_number, outbound_api_access, ticket_time_limit
      ) VALUES ?
      ON DUPLICATE KEY UPDATE
        is_tmc = VALUES(is_tmc),
        name = VALUES(name),
        agency_code = VALUES(agency_code),
        short_name = VALUES(short_name),
        company_type_id = VALUES(company_type_id),
        customer_type_id = VALUES(customer_type_id),
        tmc_id = VALUES(tmc_id),
        parent_agency_id = VALUES(parent_agency_id),
        country = VALUES(country),
        city = VALUES(city),
        zipcode = VALUES(zipcode),
        address = VALUES(address),
        phone_number = VALUES(phone_number),
        email = VALUES(email),
        staff_email = VALUES(staff_email),
        website = VALUES(website),
        status = VALUES(status),
        created_by = VALUES(created_by),
        created_at = VALUES(created_at),
        updated_by = VALUES(updated_by),
        updated_at = VALUES(updated_at),
        version = VALUES(version),
        customer_type = VALUES(customer_type),
        trn_number = VALUES(trn_number),
        outbound_api_access = VALUES(outbound_api_access),
        ticket_time_limit = VALUES(ticket_time_limit)
    `;

    const values = agents.map((agent: any) => [
      agent.id,
      agent.is_tmc === 'true' || agent.is_tmc === '1',
      agent.name,
      agent.agency_code,
      agent.short_name,
      parseInt(agent.company_type_id) || null,
      parseInt(agent.customer_type_id) || null,
      parseInt(agent.tmc_id) || null,
      parseInt(agent.parent_agency_id) || null,
      agent.country,
      agent.city,
      agent.zipcode,
      agent.address,
      agent.phone_number, // Corrected field from 'phone' to 'phone_number'
      agent.email,
      agent.staff_email,
      agent.website,
      agent.status || 'active',
      agent.created_by,
      agent.created_at ? new Date(agent.created_at) : new Date(),
      agent.updated_by,
      agent.updated_at ? new Date(agent.updated_at) : new Date(),
      agent.version,
      agent.customer_type,
      agent.trn_number,
      agent.outbound_api_access === 'true' || agent.outbound_api_access === '1',
      parseInt(agent.ticket_time_limit) || null
    ]);

    await connection.query(sql, [values]);

    await connection.end();

    return NextResponse.json({ message: 'Agents imported successfully', importedCount: agents.length }, { status: 201 });

  } catch (error) {
    console.error('Error importing agents:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Failed to import agents', error: errorMessage }, { status: 500 });
  }
}