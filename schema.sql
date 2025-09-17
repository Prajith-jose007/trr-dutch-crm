-- This SQL script creates the necessary tables for the Dutch CRM application.
-- A developer should execute this script in their MySQL database to set up the schema.

-- Create the 'users' table for storing login credentials and roles.
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(191) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Should store hashed passwords
    role ENUM('superadmin', 'admin', 'sales_head', 'sales_manager', 'sales', 'accounts_manager', 'accounts', 'guest') NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Create the 'agents' table to store sales agent information.
-- This table is now separate from the users table.
CREATE TABLE IF NOT EXISTS agents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(191) NOT NULL UNIQUE,
    phone_number VARCHAR(50),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create the 'yacht_packages' table for shared cruise offerings
CREATE TABLE IF NOT EXISTS yacht_packages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    package_id VARCHAR(50) UNIQUE NOT NULL,
    yacht_name VARCHAR(255) NOT NULL,
    cruise_type VARCHAR(100),
    status VARCHAR(50) DEFAULT 'inactive',
    -- Dinner Pricing
    price_dinner_child DECIMAL(10, 2),
    price_dinner_adult DECIMAL(10, 2),
    price_dinner_adult_alc DECIMAL(10, 2),
    -- Top Deck Pricing
    price_top_deck_child DECIMAL(10, 2),
    price_top_deck_adult DECIMAL(10, 2),
    -- VIP Pricing
    price_vip_child DECIMAL(10, 2),
    price_vip_adult DECIMAL(10, 2),
    price_vip_adult_alc DECIMAL(10, 2),
    -- Royal Pricing
    price_royal_child DECIMAL(10, 2),
    price_royal_adult DECIMAL(10, 2),
    price_royal_adult_alc DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create the 'bookings' table to store all booking information
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_date DATE NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50),
    agent_name VARCHAR(255),
    yacht_package_id VARCHAR(50),
    payment_mode VARCHAR(50),
    ticket_ref VARCHAR(100),
    total_amount DECIMAL(10, 2),
    discount DECIMAL(5, 2),
    net_amount DECIMAL(10, 2),
    commission DECIMAL(10, 2),
    notes TEXT,
    -- Quantity fields
    dinner_child_qty INT DEFAULT 0,
    dinner_adult_qty INT DEFAULT 0,
    dinner_adult_alc_qty INT DEFAULT 0,
    top_deck_child_qty INT DEFAULT 0,
    top_deck_adult_qty INT DEFAULT 0,
    vip_child_qty INT DEFAULT 0,
    vip_adult_qty INT DEFAULT 0,
    vip_adult_alc_qty INT DEFAULT 0,
    royal_child_qty INT DEFAULT 0,
    royal_adult_qty INT DEFAULT 0,
    royal_adult_alc_qty INT DEFAULT 0,
    -- Other potential fields from the UI
    status VARCHAR(50) DEFAULT 'pending',
    payment_status VARCHAR(50) DEFAULT 'unpaid',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
