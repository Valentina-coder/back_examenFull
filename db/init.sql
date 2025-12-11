-- Inicialización de tablas y datos para sistema_ventas
-- Este archivo se ejecuta solo la primera vez que se crea el contenedor MySQL

USE `sistema_ventas`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) NOT NULL DEFAULT 'USER',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `stock` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Inserciones de ejemplo
INSERT INTO `users` (`username`, `password`, `role`) VALUES
('admin', '$2b$10$abcdefghijklmnopqrstuv', 'ADMIN'),
('user1', '$2b$10$abcdefghijklmnopqrstuv', 'USER');

INSERT INTO `product` (`name`, `description`, `price`, `stock`) VALUES
('Notebook Gamer', 'Potente notebook para juegos', 1500.50, 10),
('Mouse Inalámbrico', 'Mouse ergonómico', 25.99, 100);
