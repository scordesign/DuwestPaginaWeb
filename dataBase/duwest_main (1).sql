-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 06, 2024 at 02:52 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `duwest_main`
--

-- --------------------------------------------------------

--
-- Table structure for table `filters`
--

CREATE TABLE `filters` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `category` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `filters`
--

INSERT INTO `filters` (`id`, `name`, `category`) VALUES
(1, 'Papa', 'cultivo'),
(2, 'Arveja', 'cultivo'),
(5, 'Tomate', 'cultivo'),
(6, 'Arandano', 'cultivo'),
(7, 'Palma', 'cultivo'),
(8, 'Banano', 'cultivo'),
(9, 'Aguacate', 'cultivo'),
(10, 'Cafe', 'cultivo'),
(11, 'Bioestimulante', 'Clasificación'),
(12, 'Hervicida', 'Clasificación'),
(13, 'Fungicida', 'Clasificación'),
(14, 'Insecticida', 'Clasificación');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `name` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `listImg` varchar(5000) NOT NULL,
  `id` int(11) NOT NULL,
  `listDocs` varchar(5000) NOT NULL,
  `filters` varchar(500) NOT NULL,
  `section` varchar(50) NOT NULL,
  `amount` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`name`, `description`, `listImg`, `id`, `listDocs`, `filters`, `section`, `amount`) VALUES
('frijoles', 'aaaaaaaaaaa', '[\"img\\/prueba\\/frijoles\\/images\\/Etapas para una invesitgacion estadistica (1).png\"]', 11, '[\"img\\/prueba\\/frijoles\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '{11},{2}', '#tm-section-13', '2l'),
('pirula', 'aaaaa', '[\"img\\/prueba\\/pirula\\/images\\/Etapas para una invesitgacion estadistica (1).png\"]', 12, '[\"img\\/prueba\\/pirula\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '{11},{2}', '#tm-section-13', '2l'),
('papa', 'papa', '[\"img\\/prueba\\/papa\\/images\\/WhatsApp Image 2023-06-27 at 13.22.53.jpg\",\"img\\/prueba\\/papa\\/images\\/WhatsApp Image 2023-06-28 at 09.16.12.jpg\",\"img\\/prueba\\/papa\\/images\\/WhatsApp Image 2023-06-28 at 09.16.13.jpg\"]', 13, '[\"img\\/prueba\\/papa\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/papa\\/files\\/avance.pdf\"]', '{11},{2}', '#tm-section-13', '1a');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `user` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL,
  `key` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `mail`, `user`, `name`, `password`, `key`) VALUES
(2, 'andresolmos2784@gmail.com', 'sebas', 'Andrés Felipe Olmos Rojas', 'cec8c1fe8c6e0b302ed4335c2913e791d532bad160500802356681e0518ae166', 'fa84b88d325adeda20ada142589e4e2d');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `filters`
--
ALTER TABLE `filters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `filters`
--
ALTER TABLE `filters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
