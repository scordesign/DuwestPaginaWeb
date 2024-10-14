-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2024 at 05:12 AM
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
('frijoles', 'aaaaaaaaaaa', '[\"img\\/prueba\\/frijoles\\/images\\/Etapas para una invesitgacion estadistica (1).png\"]', 11, '[\"img\\/prueba\\/frijoles\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '{11},{2}', '#tm-section-12', '2l'),
('pirula', 'aaaaa', '[\"img\\/prueba\\/pirula\\/images\\/Etapas para una invesitgacion estadistica (1).png\"]', 12, '[\"img\\/prueba\\/pirula\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '{11},{2}', '#tm-section-12', '2l'),
('papa', 'papa', '[\"img/prueba/papa/images/WhatsApp Image 2023-06-27 at 13.22.53.jpg\",\"img/prueba/papa/images/WhatsApp Image 2023-06-28 at 09.16.13.jpg\"]', 13, '[\"img\\/prueba\\/papa\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/papa\\/files\\/avance.pdf\"]', '{11},{2}', '#tm-section-13', '1a'),
('frijoles', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore modi asperiores veritatis, dolore necessitatibus qui doloremque vitae, reiciendis quisquam sequi odio iste beatae voluptatum explicabo. ', '[\"img/prueba/frijoles/images/Screenshot 2023-04-13 192626.png\",\"img/prueba/frijoles/images/Screenshot 2023-04-13 205331.png\"]', 14, '[\"img/prueba/frijoles/files/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img/prueba/frijoles/files/avance.pdf\",\"img/prueba/frijoles/files/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '{11},{13}', '#tm-section-13', '5l'),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 15, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '#tm-section-14', '5kg'),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 16, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-14', '1d'),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 18, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '{11},{13},{2},{6}', '#tm-section-13', '1d'),
('frijoles', 'aaaaaaaaaaa', '[\"img\\/prueba\\/frijoles\\/images\\/Etapas para una invesitgacion estadistica (1).png\"]', 19, '[\"img\\/prueba\\/frijoles\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '{11},{2}', '#tm-section-13', '2l'),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 20, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '{11},{13},{2},{6}', '#tm-section-13', '1d'),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 21, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '{13},{11},{2},{6}', '#tm-section-13', '5kg'),
('pirula', 'aaaaa', '[\"img\\/prueba\\/pirula\\/images\\/Etapas para una invesitgacion estadistica (1).png\"]', 22, '[\"img\\/prueba\\/pirula\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '{11},{2}', '#tm-section-13', '2l'),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 23, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '#tm-section-14', '5kg'),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 24, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-14', '1d'),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 25, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '#tm-section-14', '5kg'),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 26, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-14', '1d'),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 27, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '#tm-section-14', '5kg'),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 28, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-14', '1d'),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 29, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '#tm-section-14', '5kg'),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 30, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-15', '1d'),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 31, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '#tm-section-15', '5kg'),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 32, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-15', '1d'),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 33, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '#tm-section-15', '5kg'),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 34, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-15', '1d'),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 35, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '#tm-section-15', '5kg'),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 36, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-15', '1d'),
('papa', 'papa', '[\"img/prueba/papa/images/WhatsApp Image 2023-06-27 at 13.22.53.jpg\",\"img/prueba/papa/images/WhatsApp Image 2023-06-28 at 09.16.13.jpg\"]', 37, '[\"img\\/prueba\\/papa\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/papa\\/files\\/avance.pdf\"]', '{11},{2}', '#tm-section-13', '1a'),
('frijoles', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore modi asperiores veritatis, dolore necessitatibus qui doloremque vitae, reiciendis quisquam sequi odio iste beatae voluptatum explicabo. ', '[\"img/prueba/frijoles/images/Screenshot 2023-04-13 192626.png\",\"img/prueba/frijoles/images/Screenshot 2023-04-13 205331.png\"]', 38, '[\"img/prueba/frijoles/files/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img/prueba/frijoles/files/avance.pdf\",\"img/prueba/frijoles/files/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '{11},{13}', '#tm-section-13', '5l'),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 39, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '{11},{13},{2},{6}', '#tm-section-13', '1d'),
('frijoles', 'aaaaaaaaaaa', '[\"img\\/prueba\\/frijoles\\/images\\/Etapas para una invesitgacion estadistica (1).png\"]', 40, '[\"img\\/prueba\\/frijoles\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '{11},{2}', '#tm-section-13', '2l'),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 41, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '{11},{13},{2},{6}', '#tm-section-13', '1d'),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 42, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '{13},{11},{2},{6}', '#tm-section-13', '5kg'),
('pirula', 'aaaaa', '[\"img\\/prueba\\/pirula\\/images\\/Etapas para una invesitgacion estadistica (1).png\"]', 43, '[\"img\\/prueba\\/pirula\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '{11},{2}', '#tm-section-13', '2l'),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 44, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-14', '1d'),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 45, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-15', '1d'),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 46, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '#tm-section-14', '5kg'),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 47, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-15', '1d'),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 48, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '#tm-section-14', '5kg'),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 49, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-14', '1d'),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 50, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '#tm-section-14', '5kg'),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 51, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-15', '1d'),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 52, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '#tm-section-14', '5kg'),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 53, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-14', '1d'),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 54, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '#tm-section-14', '5kg'),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 55, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-15', '1d');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
