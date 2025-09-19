
// IMPORTANT: Before running this script, you must first create the database tables.
// This script only populates data; it does not create the schema.
// A developer must run the contents of the `schema.sql` file in your MySQL
// database (e.g., in phpMyAdmin or MySQL Workbench) before this script will work.
// Failure to do so will result in a "Table 'dutchprj.agents' doesn't exist" error.

// This script provides a functional example of how to migrate data from a CSV
// file into your MySQL database. A developer will need to adapt this script
// for all the data they wish to import (e.g., bookings, yacht_packages).

// Import necessary libraries. 'fs' for file system operations, 'mysql2/promise'
// for database interaction, and 'dotenv' to load environment variables.
const fs = require('fs');
const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Database connection configuration using environment variables
// Note: We add the `multipleStatements: true` flag to allow executing the schema.sql file.
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  multipleStatements: true,
};

// --- Main Migration Function ---
// This async function orchestrates the migration process.
async function migrate() {
  let connection;
  try {
    // Establish a connection to the database
    connection = await mysql.createConnection(dbConfig);
    console.log('Successfully connected to the database.');

    // --- Create Schema ---
    // This new step reads the schema.sql file and executes it to create tables.
    await createSchema(connection);

    // --- Migrate System Users ---
    await migrateSystemUsers(connection);
    
    // --- Migrate Agents ---
    await migrateAgents(connection);


    console.log('Data migration completed successfully!');

  } catch (error) {
    console.error('Error during data migration:', error);
  } finally {
    // Ensure the database connection is always closed
    if (connection) {
      await connection.end();
      console.log('Database connection closed.');
    }
  }
}

// --- New Schema Creation Function ---
// Reads and executes the schema.sql file to ensure tables exist.
async function createSchema(connection) {
  try {
    console.log('Reading schema.sql to create tables if they dont exist...');
    const schemaPath = path.resolve(__dirname, '../schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    
    // A simple way to handle multiple statements in the file
    const statements = schemaSQL.split(';').filter(s => s.trim());
    for (const statement of statements) {
      if (statement) {
        await connection.query(statement);
      }
    }
    console.log('Database schema verified/created successfully.');
    
  } catch (error) {
    console.error('Failed to execute schema.sql:', error);
    throw error; // Stop the migration if schema creation fails
  }
}

// --- System User Migration ---
// This function creates the core superadmin and admin users in the 'users' table.
async function migrateSystemUsers(connection) {
    console.log('Migrating system users (superadmin, admin)...');
    const users = [
        {
            first_name: 'Super',
            last_name: 'Admin',
            user_id: 'superadmin',
            role: 'superadmin',
            // In a real app, this should be a securely hashed password.
            password: 'Dutch@989#1' 
        },
        {
            first_name: 'Admin',
            last_name: 'User',
            user_id: 'admin',
            role: 'admin',
            password: 'Dutch@123#'
        }
    ];

    const sql = `
      INSERT INTO users (first_name, last_name, user_id, role, password) 
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        first_name = VALUES(first_name), 
        last_name = VALUES(last_name), 
        role = VALUES(role),
        password = VALUES(password)
    `;

    for (const user of users) {
        await connection.execute(sql, [
            user.first_name,
            user.last_name,
            user.user_id,
            user.role,
            user.password
        ]);
        console.log(`- Upserted system user: ${user.user_id}`);
    }
    console.log('System user migration finished.');
}


// --- Agent Migration Example ---
// This function reads agent data from a CSV and inserts it into the 'agents' table.
async function migrateAgents(connection) {
  try {
    // Read the sample CSV file
    const csvPath = path.resolve(__dirname, '../scripts/sample-agents.csv');
    const csvData = fs.readFileSync(csvPath, 'utf8');
    
    // Split the CSV into rows and skip the header
    const rows = csvData.trim().split('\n').slice(1);
    
    console.log(`Found ${rows.length} agents to process from CSV...`);

    // Prepare the SQL INSERT statement with an ON DUPLICATE KEY UPDATE clause (upsert).
    // This will insert a new agent if the email doesn't exist, or update the existing
    // agent's information if the email is already in the database.
    const sql = `
      INSERT INTO agents (name, address, email, phone_number, trn_number, customer_discount, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        name = VALUES(name), 
        address = VALUES(address),
        phone_number = VALUES(phone_number),
        trn_number = VALUES(trn_number),
        customer_discount = VALUES(customer_discount),
        status = VALUES(status)
    `;

    // Loop through each row and execute the upsert query
    for (const row of rows) {
      const [name, address, email, phoneNumber, trnNumber, customerDiscount] = row.split(',').map(field => field.trim());
      
      await connection.execute(sql, [name, address, email, phoneNumber, trnNumber, parseFloat(customerDiscount) || 0, 'active']);
      console.log(`- Processed agent from CSV: ${email}`);
    }

    console.log('CSV agent migration finished.');

  } catch (error) {
    console.error('Failed to migrate agents:', error);
    // Re-throw the error to be caught by the main migrate function
    throw error;
  }
}

// --- Placeholder for Other Migrations ---
// You can create more functions like `migrateAgents` for other data.
// async function migrateBookings(connection) { ... }
// async function migrateYachts(connection) { ... }


// Start the migration process
migrate();
