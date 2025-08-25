-- Database schema for the Dutch CRM application

-- Table for Agents
CREATE TABLE agents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    phone_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table for Yacht Packages
CREATE TABLE yacht_packages (
    id VARCHAR(255) PRIMARY KEY,
    yacht_name VARCHAR(255) NOT NULL,
    cruise_type VARCHAR(255),
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    
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
);

-- Table for Bookings
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_date DATE NOT NULL,
    yacht_package_id VARCHAR(255),
    client_name VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50),
    agent_id INT,

    -- Quantities
    qty_dinner_child INT DEFAULT 0,
    qty_dinner_adult INT DEFAULT 0,
    qty_dinner_adult_alc INT DEFAULT 0,
    qty_top_deck_child INT DEFAULT 0,
    qty_top_deck_adult INT DEFAULT 0,
    qty_vip_child INT DEFAULT 0,
    qty_vip_adult INT DEFAULT 0,
    qty_vip_adult_alc INT DEFAULT 0,
    qty_royal_child INT DEFAULT 0,
    qty_royal_adult INT DEFAULT 0,
    qty_royal_adult_alc INT DEFAULT 0,
    
    -- Financials
    total_amount DECIMAL(10, 2),
    discount_percentage DECIMAL(5, 2) DEFAULT 0,
    net_amount DECIMAL(10, 2),
    commission_amount DECIMAL(10, 2),
    
    -- Payment Details
    payment_mode VARCHAR(100),
    ticket_ref_no VARCHAR(255),
    notes TEXT,
    
    -- Status
    status ENUM('Confirmed', 'Pending', 'Cancelled') DEFAULT 'Pending',
    payment_status ENUM('Paid', 'Unpaid', 'Partial') DEFAULT 'Unpaid',

    -- Foreign Keys
    FOREIGN KEY (yacht_package_id) REFERENCES yacht_packages(id),
    FOREIGN KEY (agent_id) REFERENCES agents(id),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

