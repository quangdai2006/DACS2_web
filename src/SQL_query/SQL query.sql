-- ==============================
-- 1. Tạo cơ sở dữ liệu
-- ==============================
DROP DATABASE IF EXISTS gaming_store;
CREATE DATABASE gaming_store;
USE gaming_store;

-- ==============================
-- 2. Bảng Users
-- ==============================
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('customer','admin') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================
-- 3. Bảng Categories
-- ==============================
CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- ==============================
-- 4. Bảng Products
-- ==============================
CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE SET NULL
);

-- ==============================
-- 5. Bảng ProductImages (NF4/NF5)
-- ==============================
CREATE TABLE ProductImages (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    type ENUM('static','animated') NOT NULL,
    url VARCHAR(255) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE
);

-- ==============================
-- 6. Bảng Inventory
-- ==============================
CREATE TABLE Inventory (
    product_id INT PRIMARY KEY,
    quantity INT NOT NULL DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE
);

-- ==============================
-- 7. Bảng Orders
-- ==============================
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending','paid','shipped','completed','cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- ==============================
-- 8. Bảng OrderItems
-- ==============================
CREATE TABLE OrderItems (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- ==============================
-- 9. Dữ liệu mẫu
-- ==============================
-- Categories