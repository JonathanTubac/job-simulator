
-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    stock INTEGER NOT NULL,
    price REAL NOT NULL,
    available BOOLEAN NOT NULL
);

-- Insert 25 records
INSERT INTO products (name, category, brand, stock, price, available)
VALUES
('Inspiron 15 Laptop', 'Electronics', 'Dell', 10, 7500.50, true),
('Pavilion Laptop', 'Electronics', 'HP', 8, 6800.00, true),
('MacBook Air M1', 'Electronics', 'Apple', 5, 9500.99, true),
('Wireless Mouse M185', 'Accessories', 'Logitech', 50, 150.99, true),
('Gaming Mouse G502', 'Accessories', 'Logitech', 20, 450.75, true),
('Mechanical Keyboard K552', 'Accessories', 'Redragon', 30, 320.00, true),
('Wireless Keyboard', 'Accessories', 'HP', 25, 280.50, true),
('24-inch Monitor', 'Electronics', 'Samsung', 12, 1200.75, true),
('27-inch Monitor', 'Electronics', 'LG', 7, 1800.00, true),
('Wireless Headphones', 'Audio', 'Sony', 15, 650.99, true),
('Gaming Headset', 'Audio', 'HyperX', 18, 550.00, true),
('Portable Speaker', 'Audio', 'JBL', 22, 400.25, true),
('1TB Hard Drive', 'Storage', 'Seagate', 14, 500.00, true),
('512GB SSD', 'Storage', 'Kingston', 16, 650.50, true),
('64GB USB Drive', 'Storage', 'SanDisk', 40, 120.00, true),
('WiFi Router', 'Networking', 'TP-Link', 13, 300.75, true),
('8-Port Switch', 'Networking', 'TP-Link', 9, 250.00, true),
('HD Webcam', 'Accessories', 'Logitech', 17, 220.99, true),
('Gaming Chair', 'Furniture', 'Corsair', 6, 2200.00, true),
('Office Desk', 'Furniture', 'Ikea', 4, 1800.50, false),
('Galaxy Tab Tablet', 'Electronics', 'Samsung', 11, 3200.75, true),
('Galaxy S21 Smartphone', 'Electronics', 'Samsung', 9, 6500.00, true),
('iPhone 13', 'Electronics', 'Apple', 7, 8800.00, true),
('All-in-One Printer', 'Office', 'Epson', 10, 950.25, true),
('Portable Projector', 'Office', 'ViewSonic', 3, 2100.00, false);

-- Sync auto-increment with last inserted ID
SELECT setval(
    pg_get_serial_sequence('products', 'id'),
    (SELECT MAX(id) FROM products)
);