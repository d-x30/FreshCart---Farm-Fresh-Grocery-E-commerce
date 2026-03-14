-- Create the database
CREATE DATABASE freshcart_db;
USE freshcart_db;

-- 1. Products Table: Stores information about all available items.
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL, -- DECIMAL is better for currency
    unit VARCHAR(50) NOT NULL,      -- e.g., 'lb', 'bunch', 'piece'
    category_id INT,
    stock_quantity INT NOT NULL DEFAULT 0,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Categories Table: Allows grouping of products (e.g., 'Fruits', 'Vegetables', 'Dairy').
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Add a Foreign Key relationship after creating both tables
ALTER TABLE products
ADD CONSTRAINT fk_category
FOREIGN KEY (category_id)
REFERENCES categories(category_id)
ON DELETE SET NULL;


-- 3. Users Table: Stores customer information for accounts and orders.
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL, -- Store securely hashed passwords
    shipping_address TEXT,
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Orders Table: Tracks all customer orders.
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL,
    order_status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') NOT NULL DEFAULT 'Pending',
    shipping_address TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- 5. Order Items Table: Links products to specific orders (many-to-many relationship).
CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL, -- Price when the order was placed
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);