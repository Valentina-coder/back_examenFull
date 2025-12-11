-- Script SQL para insertar datos de ejemplo en sistema_ventas
-- Ejecutar en phpMyAdmin o HeidiSQL con XAMPP

USE `sistema_ventas`;

-- =====================================================
-- INSERCIÓN DE USUARIOS
-- =====================================================
-- Nota: Las contraseñas deben estar hasheadas con bcrypt en producción
-- Aquí se usan ejemplos (¡NO USAR EN PRODUCCIÓN!)

INSERT INTO `users` (`username`, `password`, `role`) VALUES
('admin', '$2b$10$YZ8v5p0c0QUvS.LKe2KILutL9.fQz8nqnW0N3l8Uh5Nn0VqLiqG7u', 'ADMIN'),
('valentina', '$2b$10$YZ8v5p0c0QUvS.LKe2KILutL9.fQz8nqnW0N3l8Uh5Nn0VqLiqG7u', 'USER'),
('juan', '$2b$10$YZ8v5p0c0QUvS.LKe2KILutL9.fQz8nqnW0N3l8Uh5Nn0VqLiqG7u', 'USER'),
('maria', '$2b$10$YZ8v5p0c0QUvS.LKe2KILutL9.fQz8nqnW0N3l8Uh5Nn0VqLiqG7u', 'USER');

-- =====================================================
-- INSERCIÓN DE PRODUCTOS
-- =====================================================

INSERT INTO `product` (`name`, `description`, `price`, `stock`) VALUES
('Notebook Gamer ASUS', 'Notebook potente para juegos con RTX 3060', 1500.50, 10),
('Mouse Inalámbrico Logitech', 'Mouse ergonómico con batería de 18 meses', 25.99, 100),
('Teclado Mecánico RGB', 'Teclado mecánico retroiluminado, switches cherry', 79.99, 25),
('Monitor LG 27" 144Hz', 'Monitor gaming con panel IPS y 144Hz', 350.00, 8),
('Audífonos Hyper Cloud', 'Audífonos gaming con micrófono desmontable', 99.50, 15),
('Mousepad XL', 'Mousepad extra grande para juegos', 15.99, 50),
('Webcam Logitech 1080p', 'Webcam Full HD con corrección de luz', 89.99, 20),
('Hub USB 7 puertos', 'Hub USB 3.0 con alimentación externa', 45.50, 30),
('Cable HDMI 2.1 3m', 'Cable HDMI 2.1 para 4K 60Hz', 12.99, 60),
('SSD M.2 1TB', 'Disco SSD NVMe 1TB de alta velocidad', 89.00, 12);

-- =====================================================
-- VERIFICAR INSERCIÓN
-- =====================================================

-- Ver todos los usuarios
SELECT * FROM `users`;

-- Ver todos los productos
SELECT * FROM `product`;

-- Contar registros
SELECT COUNT(*) as total_usuarios FROM `users`;
SELECT COUNT(*) as total_productos FROM `product`;
