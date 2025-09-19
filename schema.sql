
-- Main table for bookings
CREATE TABLE IF NOT EXISTS `bookings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `booking_date` DATE NOT NULL,
  `client_name` VARCHAR(255) NOT NULL,
  `client_phone` VARCHAR(255) NOT NULL,
  `agent_name` VARCHAR(255),
  `yacht_package_id` VARCHAR(255),
  `payment_mode` VARCHAR(100),
  `ticket_ref` VARCHAR(255),
  `total_amount` DECIMAL(10, 2),
  `discount` DECIMAL(10, 2),
  `net_amount` DECIMAL(10, 2),
  `commission` DECIMAL(10, 2),
  `notes` TEXT,
  `dinner_child_qty` INT DEFAULT 0,
  `dinner_adult_qty` INT DEFAULT 0,
  `dinner_adult_alc_qty` INT DEFAULT 0,
  `top_deck_child_qty` INT DEFAULT 0,
  `top_deck_adult_qty` INT DEFAULT 0,
  `vip_child_qty` INT DEFAULT 0,
  `vip_adult_qty` INT DEFAULT 0,
  `vip_adult_alc_qty` INT DEFAULT 0,
  `royal_child_qty` INT DEFAULT 0,
  `royal_adult_qty` INT DEFAULT 0,
  `royal_adult_alc_qty` INT DEFAULT 0,
  `status` VARCHAR(50) DEFAULT 'pending',
  `payment_status` VARCHAR(50) DEFAULT 'unpaid',
  `created_by` VARCHAR(255),
  `modified_by` VARCHAR(255),
  `date_of_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `date_of_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table for yacht packages
CREATE TABLE IF NOT EXISTS `yacht_packages` (
  `id` VARCHAR(255) PRIMARY KEY,
  `yacht_name` VARCHAR(255) NOT NULL,
  `type` VARCHAR(100),
  `status` VARCHAR(50) DEFAULT 'active'
);

-- Pricing table linked to yacht packages
CREATE TABLE IF NOT EXISTS `yacht_pricing` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `package_id` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL, -- e.g., 'dinner', 'top_deck'
  `pax_type` VARCHAR(100) NOT NULL, -- e.g., 'child', 'adult', 'adult_alc'
  `price` DECIMAL(10, 2),
  FOREIGN KEY (package_id) REFERENCES yacht_packages(id)
);

-- Table for agents
CREATE TABLE IF NOT EXISTS `agents` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255),
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `phone_number` VARCHAR(255),
  `trn_number` VARCHAR(255),
  `customer_discount` DECIMAL(5, 2) DEFAULT 0,
  `status` VARCHAR(50) DEFAULT 'active',
  `date_of_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `date_of_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Table for system users (for login)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `first_name` VARCHAR(255),
  `last_name` VARCHAR(255),
  `user_id` VARCHAR(255) NOT NULL UNIQUE,
  `role` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL, -- Should be hashed in a real application
  `date_of_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `date_of_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
