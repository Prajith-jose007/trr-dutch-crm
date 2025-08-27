-- Agents Table
CREATE TABLE agents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Yacht Packages Table
CREATE TABLE yacht_packages (
    id VARCHAR(255) PRIMARY KEY,
    yacht_name VARCHAR(255) NOT NULL,
    cruise_type VARCHAR(255) NOT NULL,
    status ENUM('Active', 'Inactive') NOT NULL,
    
    dinner_child_price DECIMAL(10, 2),
    dinner_adult_price DECIMAL(10, 2),
    dinner_adult_alc_price DECIMAL(10, 2),

    top_deck_child_price DECIMAL(10, 2),
    top_deck_adult_price DECIMAL(10, 2),

    vip_child_price DECIMAL(10, 2),
    vip_adult_price DECIMAL(10, 2),
    vip_adult_alc_price DECIMAL(10, 2),

    royal_child_price DECIMAL(10, 2),
    royal_adult_price DECIMAL(10, 2),
    royal_adult_alc_price DECIMAL(10, 2),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bookings Table
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_date DATE NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50) NOT NULL,
    agent_name VARCHAR(255),
    yacht_package_id VARCHAR(255),
    payment_mode VARCHAR(50),
    ticket_ref VARCHAR(255),
    total_amount DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(5, 2),
    net_amount DECIMAL(10, 2) NOT NULL,
    commission DECIMAL(10, 2),
    notes TEXT,

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

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (yacht_package_id) REFERENCES yacht_packages(id)
);
