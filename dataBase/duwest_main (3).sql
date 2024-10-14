-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 01, 2024 at 12:56 AM
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
-- Table structure for table `amount`
--

CREATE TABLE `amount` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `patch` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `amount`
--

INSERT INTO `amount` (`id`, `name`, `patch`) VALUES
(2, '1kl', 'img/amounts/1kl.png'),
(3, '1lt ', 'img/amounts/1lt.png'),
(4, '3kl', 'img/amounts/3kl.png'),
(5, '4lt', 'img/amounts/4lt.png'),
(6, '9kl', 'img/amounts/9kl.png'),
(7, '18kl', 'img/amounts/18kl.png'),
(8, '20lt', 'img/amounts/20lt.png'),
(9, '25kl', 'img/amounts/25kl.png'),
(10, '250cc', 'img/amounts/250cc.png'),
(11, '250gr', 'img/amounts/250gr.png');

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
(1, 'Papa', 'Cultivo'),
(2, 'Arveja', 'Cultivo'),
(5, 'Tomate', 'Cultivo'),
(6, 'Arandano', 'Cultivo'),
(7, 'Palma', 'Cultivo'),
(8, 'Banano', 'Cultivo'),
(9, 'Aguacate', 'Cultivo'),
(10, 'Cafe', 'Cultivo'),
(11, 'Bioestimulante', 'Clasificación'),
(12, 'Hervicida', 'Clasificación'),
(13, 'Fungicida', 'Clasificación'),
(14, 'Insecticida', 'Clasificación'),
(15, 'Valagro', 'Proveedores'),
(16, 'Corteva', 'Proveedores'),
(17, 'First', 'Proveedores'),
(18, 'sineira', 'Proveedores');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(10000) NOT NULL,
  `images` varchar(1000) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `name`, `description`, `images`, `date`) VALUES
(18, 'noticia 1', 'Lorem ipsum dolor sit amet consectetur adipiscing, elit sem ultricies morbi nisl ut praesent, nam urna laoreet habitant senectus. Vivamus molestie auctor aliquam mus platea suscipit inceptos leo massa, quisque hac elementum ultricies ultrices fusce parturient tristique orci, ornare odio varius pulvinar dictumst ullamcorper accumsan consequat. Eget nisl risus integer luctus porta etiam vestibulum hendrerit sed, litora blandit himenaeos torquent sollicitudin mattis tristique fermentum, volutpat purus pharetra accumsan interdum tellus penatibus sociosqu. Sodales facilisi diam vehicula pharetra magnis mollis aliquet pulvinar, ad lacus condimentum platea vitae suspendisse eleifend habitant hac, malesuada parturient tempus ullamcorper vel fringilla vivamus.\r\n\r\nDui sed habitant praesent habitasse ac aliquet eleifend litora eros cubilia, justo tortor porta netus dictum urna quam pellentesque placerat parturient, ligula quis sociosqu gravida nec curabitur inceptos congue mi. Volutpat elementum conubia ullamcorper porttitor, sociis enim mollis. Commodo montes tristique hac auctor eros fringilla potenti vivamus mollis turpis, iaculis arcu ante mattis phasellus enim vehicula dui rutrum facilisis, metus platea proin nostra fames diam curabitur at cras.\r\n\r\nHabitant metus conubia consequat dictumst himenaeos enim nec sem aptent quisque vivamus libero lacinia integer mi sagittis, egestas eros ac laoreet nullam odio tellus nam nisi justo nascetur ullamcorper hac et. Nisl tellus est proin porta sodales sapien himenaeos fringilla fames nisi, cum nulla ligula justo pharetra curabitur per dignissim taciti.\r\n\r\nClass interdum porta consequat phasellus mus ultrices eros orci ullamcorper, nunc morbi conubia ridiculus integer tincidunt aliquam. Donec duis rutrum senectus euismod fusce vitae curabitur felis placerat arcu ac integer tortor, dapibus odio platea volutpat facilisi velit sapien dictum taciti per sodales diam. Ultricies nascetur in elementum hendrerit venenatis sociosqu, curae est laoreet primis inceptos augue, eget porttitor ridiculus penatibus proin. Leo torquent rhoncus hendrerit aptent fames sed imperdiet primis varius vehicula, eros quam etiam curabitur consequat pellentesque volutpat ut non class mauris, suspendisse pretium neque gravida quis platea est auctor ullamcorper.', '[\"img\\/prueba\\/news\\/Screenshot 2023-03-29 193247.png\",\"img\\/prueba\\/news\\/Screenshot 2023-04-13 192626.png\",\"img\\/prueba\\/news\\/Screenshot 2023-04-13 193253.png\",\"img\\/prueba\\/news\\/Screenshot 2023-04-13 201534.png\",\"img\\/prueba\\/news\\/Screenshot 2023-04-13 202259.png\",\"img\\/prueba\\/news\\/Screenshot 2023-04-13 205331.png\",\"img\\/prueba\\/news\\/Screenshot 2023-05-01 155546.png\",\"img\\/prueba\\/news\\/Screenshot 2023-05-01 160025.png\"]', '2024-06-14'),
(19, 'noticia 2', 'Lorem ipsum dolor sit amet consectetur adipiscing, elit sem ultricies morbi nisl ut praesent, nam urna laoreet habitant senectus. Vivamus molestie auctor aliquam mus platea suscipit inceptos leo massa, quisque hac elementum ultricies ultrices fusce parturient tristique orci, ornare odio varius pulvinar dictumst ullamcorper accumsan consequat. Eget nisl risus integer luctus porta etiam vestibulum hendrerit sed, litora blandit himenaeos torquent sollicitudin mattis tristique fermentum, volutpat purus pharetra accumsan interdum tellus penatibus sociosqu. Sodales facilisi diam vehicula pharetra magnis mollis aliquet pulvinar, ad lacus condimentum platea vitae suspendisse eleifend habitant hac, malesuada parturient tempus ullamcorper vel fringilla vivamus.\r\n\r\nDui sed habitant praesent habitasse ac aliquet eleifend litora eros cubilia, justo tortor porta netus dictum urna quam pellentesque placerat parturient, ligula quis sociosqu gravida nec curabitur inceptos congue mi. Volutpat elementum conubia ullamcorper porttitor, sociis enim mollis. Commodo montes tristique hac auctor eros fringilla potenti vivamus mollis turpis, iaculis arcu ante mattis phasellus enim vehicula dui rutrum facilisis, metus platea proin nostra fames diam curabitur at cras.\r\n\r\nHabitant metus conubia consequat dictumst himenaeos enim nec sem aptent quisque vivamus libero lacinia integer mi sagittis, egestas eros ac laoreet nullam odio tellus nam nisi justo nascetur ullamcorper hac et. Nisl tellus est proin porta sodales sapien himenaeos fringilla fames nisi, cum nulla ligula justo pharetra curabitur per dignissim taciti.\r\n\r\nClass interdum porta consequat phasellus mus ultrices eros orci ullamcorper, nunc morbi conubia ridiculus integer tincidunt aliquam. Donec duis rutrum senectus euismod fusce vitae curabitur felis placerat arcu ac integer tortor, dapibus odio platea volutpat facilisi velit sapien dictum taciti per sodales diam. Ultricies nascetur in elementum hendrerit venenatis sociosqu, curae est laoreet primis inceptos augue, eget porttitor ridiculus penatibus proin. Leo torquent rhoncus hendrerit aptent fames sed imperdiet primis varius vehicula, eros quam etiam curabitur consequat pellentesque volutpat ut non class mauris, suspendisse pretium neque gravida quis platea est auctor ullamcorper.', '[\"img\\/prueba\\/news\\/4jk-intel-meteor-lake.webp\",\"img\\/prueba\\/news\\/450_1000.webp\",\"img\\/prueba\\/news\\/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\",\"img\\/prueba\\/news\\/intel-arch-21-thread-director-demo2.webp\"]', '2024-06-14'),
(20, 'noticia 3', 'Lorem ipsum dolor sit amet consectetur adipiscing, elit sem ultricies morbi nisl ut praesent, nam urna laoreet habitant senectus. Vivamus molestie auctor aliquam mus platea suscipit inceptos leo massa, quisque hac elementum ultricies ultrices fusce parturient tristique orci, ornare odio varius pulvinar dictumst ullamcorper accumsan consequat. Eget nisl risus integer luctus porta etiam vestibulum hendrerit sed, litora blandit himenaeos torquent sollicitudin mattis tristique fermentum, volutpat purus pharetra accumsan interdum tellus penatibus sociosqu. Sodales facilisi diam vehicula pharetra magnis mollis aliquet pulvinar, ad lacus condimentum platea vitae suspendisse eleifend habitant hac, malesuada parturient tempus ullamcorper vel fringilla vivamus.\r\n\r\nDui sed habitant praesent habitasse ac aliquet eleifend litora eros cubilia, justo tortor porta netus dictum urna quam pellentesque placerat parturient, ligula quis sociosqu gravida nec curabitur inceptos congue mi. Volutpat elementum conubia ullamcorper porttitor, sociis enim mollis. Commodo montes tristique hac auctor eros fringilla potenti vivamus mollis turpis, iaculis arcu ante mattis phasellus enim vehicula dui rutrum facilisis, metus platea proin nostra fames diam curabitur at cras.\r\n\r\nHabitant metus conubia consequat dictumst himenaeos enim nec sem aptent quisque vivamus libero lacinia integer mi sagittis, egestas eros ac laoreet nullam odio tellus nam nisi justo nascetur ullamcorper hac et. Nisl tellus est proin porta sodales sapien himenaeos fringilla fames nisi, cum nulla ligula justo pharetra curabitur per dignissim taciti.\r\n\r\nClass interdum porta consequat phasellus mus ultrices eros orci ullamcorper, nunc morbi conubia ridiculus integer tincidunt aliquam. Donec duis rutrum senectus euismod fusce vitae curabitur felis placerat arcu ac integer tortor, dapibus odio platea volutpat facilisi velit sapien dictum taciti per sodales diam. Ultricies nascetur in elementum hendrerit venenatis sociosqu, curae est laoreet primis inceptos augue, eget porttitor ridiculus penatibus proin. Leo torquent rhoncus hendrerit aptent fames sed imperdiet primis varius vehicula, eros quam etiam curabitur consequat pellentesque volutpat ut non class mauris, suspendisse pretium neque gravida quis platea est auctor ullamcorper.', '[\"img\\/prueba\\/news\\/blog_19-de-enero.webp\",\"img\\/prueba\\/news\\/ingenieria-telematica-49.jpg\",\"img\\/prueba\\/news\\/main-qimg-e68203a17fdfc32a7c28023091b1f820-lq.jpeg\",\"img\\/prueba\\/news\\/telematica1.jpg\",\"img\\/prueba\\/news\\/Telematica-Azul.png\"]', '2024-06-14'),
(21, 'noticia 4', 'Lorem ipsum dolor sit amet consectetur adipiscing, elit sem ultricies morbi nisl ut praesent, nam urna laoreet habitant senectus. Vivamus molestie auctor aliquam mus platea suscipit inceptos leo massa, quisque hac elementum ultricies ultrices fusce parturient tristique orci, ornare odio varius pulvinar dictumst ullamcorper accumsan consequat. Eget nisl risus integer luctus porta etiam vestibulum hendrerit sed, litora blandit himenaeos torquent sollicitudin mattis tristique fermentum, volutpat purus pharetra accumsan interdum tellus penatibus sociosqu. Sodales facilisi diam vehicula pharetra magnis mollis aliquet pulvinar, ad lacus condimentum platea vitae suspendisse eleifend habitant hac, malesuada parturient tempus ullamcorper vel fringilla vivamus.\r\n\r\nDui sed habitant praesent habitasse ac aliquet eleifend litora eros cubilia, justo tortor porta netus dictum urna quam pellentesque placerat parturient, ligula quis sociosqu gravida nec curabitur inceptos congue mi. Volutpat elementum conubia ullamcorper porttitor, sociis enim mollis. Commodo montes tristique hac auctor eros fringilla potenti vivamus mollis turpis, iaculis arcu ante mattis phasellus enim vehicula dui rutrum facilisis, metus platea proin nostra fames diam curabitur at cras.\r\n\r\nHabitant metus conubia consequat dictumst himenaeos enim nec sem aptent quisque vivamus libero lacinia integer mi sagittis, egestas eros ac laoreet nullam odio tellus nam nisi justo nascetur ullamcorper hac et. Nisl tellus est proin porta sodales sapien himenaeos fringilla fames nisi, cum nulla ligula justo pharetra curabitur per dignissim taciti.\r\n\r\nClass interdum porta consequat phasellus mus ultrices eros orci ullamcorper, nunc morbi conubia ridiculus integer tincidunt aliquam. Donec duis rutrum senectus euismod fusce vitae curabitur felis placerat arcu ac integer tortor, dapibus odio platea volutpat facilisi velit sapien dictum taciti per sodales diam. Ultricies nascetur in elementum hendrerit venenatis sociosqu, curae est laoreet primis inceptos augue, eget porttitor ridiculus penatibus proin. Leo torquent rhoncus hendrerit aptent fames sed imperdiet primis varius vehicula, eros quam etiam curabitur consequat pellentesque volutpat ut non class mauris, suspendisse pretium neque gravida quis platea est auctor ullamcorper.', '[\"img\\/prueba\\/news\\/WhatsApp Image 2023-06-28 at 09.50.49.jpg\",\"img\\/prueba\\/news\\/WhatsApp Image 2023-06-28 at 09.50.491.jpg\",\"img\\/prueba\\/news\\/WhatsApp Image 2023-06-28 at 09.50.502.jpg\",\"img\\/prueba\\/news\\/WhatsApp Image 2023-06-28 at 09.50.503.jpg\",\"img\\/prueba\\/news\\/WhatsApp Image 2023-06-28 at 09.50.504.jpg\",\"img\\/prueba\\/news\\/WhatsApp Image 2023-06-28 at 09.50.515.jpg\",\"img\\/prueba\\/news\\/WhatsApp Image 2023-06-28 at 09.50.516.jpg\",\"img\\/prueba\\/news\\/WhatsApp Image 2023-06-28 at 09.50.517.jpg\",\"img\\/prueba\\/news\\/WhatsApp Image 2023-06-28 at 09.50.518.jpg\"]', '2024-06-14'),
(22, 'noticia 5', 'Lorem ipsum dolor sit amet consectetur adipiscing, elit sem ultricies morbi nisl ut praesent, nam urna laoreet habitant senectus. Vivamus molestie auctor aliquam mus platea suscipit inceptos leo massa, quisque hac elementum ultricies ultrices fusce parturient tristique orci, ornare odio varius pulvinar dictumst ullamcorper accumsan consequat. Eget nisl risus integer luctus porta etiam vestibulum hendrerit sed, litora blandit himenaeos torquent sollicitudin mattis tristique fermentum, volutpat purus pharetra accumsan interdum tellus penatibus sociosqu. Sodales facilisi diam vehicula pharetra magnis mollis aliquet pulvinar, ad lacus condimentum platea vitae suspendisse eleifend habitant hac, malesuada parturient tempus ullamcorper vel fringilla vivamus.\r\n\r\nDui sed habitant praesent habitasse ac aliquet eleifend litora eros cubilia, justo tortor porta netus dictum urna quam pellentesque placerat parturient, ligula quis sociosqu gravida nec curabitur inceptos congue mi. Volutpat elementum conubia ullamcorper porttitor, sociis enim mollis. Commodo montes tristique hac auctor eros fringilla potenti vivamus mollis turpis, iaculis arcu ante mattis phasellus enim vehicula dui rutrum facilisis, metus platea proin nostra fames diam curabitur at cras.\r\n\r\nHabitant metus conubia consequat dictumst himenaeos enim nec sem aptent quisque vivamus libero lacinia integer mi sagittis, egestas eros ac laoreet nullam odio tellus nam nisi justo nascetur ullamcorper hac et. Nisl tellus est proin porta sodales sapien himenaeos fringilla fames nisi, cum nulla ligula justo pharetra curabitur per dignissim taciti.\r\n\r\nClass interdum porta consequat phasellus mus ultrices eros orci ullamcorper, nunc morbi conubia ridiculus integer tincidunt aliquam. Donec duis rutrum senectus euismod fusce vitae curabitur felis placerat arcu ac integer tortor, dapibus odio platea volutpat facilisi velit sapien dictum taciti per sodales diam. Ultricies nascetur in elementum hendrerit venenatis sociosqu, curae est laoreet primis inceptos augue, eget porttitor ridiculus penatibus proin. Leo torquent rhoncus hendrerit aptent fames sed imperdiet primis varius vehicula, eros quam etiam curabitur consequat pellentesque volutpat ut non class mauris, suspendisse pretium neque gravida quis platea est auctor ullamcorper.', '[\"img\\/prueba\\/news\\/3.jpg\",\"img\\/prueba\\/news\\/perro(1).jpg\",\"img\\/prueba\\/news\\/perro(4).jpg\",\"img\\/prueba\\/news\\/perro.jpg\",\"img\\/prueba\\/news\\/WhatsApp Image 2023-06-27 at 13.22.53.jpg\",\"img\\/prueba\\/news\\/WhatsApp Image 2023-06-28 at 09.16.12.jpg\",\"img\\/prueba\\/news\\/WhatsApp Image 2023-06-28 at 09.16.13.jpg\",\"img\\/prueba\\/news\\/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img\\/prueba\\/news\\/WhatsApp Image 2023-06-28 at 09.16.141.jpg\",\"img\\/prueba\\/news\\/WhatsApp Image 2023-06-28 at 09.16.142.jpg\",\"img\\/prueba\\/news\\/WhatsApp Image 2023-06-28 at 09.16.144.jpg\",\"img\\/prueba\\/news\\/WhatsApp Image 2023-06-28 at 09.17.23.jpg\"]', '2024-06-14');

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
  `amount` varchar(100) NOT NULL,
  `logo` varchar(150) NOT NULL,
  `amountOther` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`name`, `description`, `listImg`, `id`, `listDocs`, `filters`, `section`, `amount`, `logo`, `amountOther`) VALUES
('frijoles', 'aaaaaaaaaaa', '[\"img/prueba/frijoles/images/Etapas para una invesitgacion estadistica (1).png\"]', 11, '[\"img/prueba/frijoles/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '{11},{2}', '#tm-section-12', '{7},{5}', '/img/prueba/frijoles/images/logo/lOGOS PRODUCTOS-23.png', ''),
('pirula', 'aaaaa', '[\"img/prueba/pirula/images/Etapas para una invesitgacion estadistica (1).png\"]', 12, '[\"img/prueba/pirula/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '{11},{2},{15}', '#tm-section-12', '{5},{3},{10},{8}', '/img/prueba/pirula/images/logo/lOGOS PRODUCTOS-24.png', '1A'),
('papa', 'papa', '[\"img/prueba/papa/images/WhatsApp Image 2023-06-27 at 13.22.53.jpg\",\"img/prueba/papa/images/WhatsApp Image 2023-06-28 at 09.16.13.jpg\"]', 13, '[\"img\\/prueba\\/papa\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/papa\\/files\\/avance.pdf\"]', '{11},{2}', '#tm-section-13', '', '', ''),
('frijoles', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore modi asperiores veritatis, dolore necessitatibus qui doloremque vitae, reiciendis quisquam sequi odio iste beatae voluptatum explicabo. ', '[\"img/prueba/frijoles/images/Screenshot 2023-04-13 192626.png\",\"img/prueba/frijoles/images/Screenshot 2023-04-13 205331.png\"]', 14, '[\"img/prueba/frijoles/files/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img/prueba/frijoles/files/avance.pdf\",\"img/prueba/frijoles/files/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '{11},{13}', '#tm-section-13', '', '', ''),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 15, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '#tm-section-14', '', '', ''),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 16, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-14', '', '', ''),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 18, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '{11},{13},{2},{6},{17},{15}', '#tm-section-13', '', '', ''),
('frijoles', 'aaaaaaaaaaa', '[\"img\\/prueba\\/frijoles\\/images\\/Etapas para una invesitgacion estadistica (1).png\"]', 19, '[\"img\\/prueba\\/frijoles\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '{11},{2}', '#tm-section-13', '', '', ''),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 20, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '{11},{13},{2},{6}', '#tm-section-13', '', '', ''),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 21, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '{13},{11},{2},{6}', '#tm-section-13', '', '', ''),
('pirula', 'aaaaa', '[\"img\\/prueba\\/pirula\\/images\\/Etapas para una invesitgacion estadistica (1).png\"]', 22, '[\"img\\/prueba\\/pirula\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '{11},{2}', '#tm-section-13', '', '', ''),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 23, '[\"img/prueba/arveja/files/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img/prueba/arveja/files/avance.pdf\",\"img/prueba/arveja/files/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '#tm-section-14', '', '', ''),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 24, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-14', '', '', ''),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 25, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '#tm-section-14', '', '', ''),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 26, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-14', '', '', ''),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 27, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '#tm-section-14', '', '', ''),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 28, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-14', '', '', ''),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 29, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '#tm-section-14', '', '', ''),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 30, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-15', '', '', ''),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 31, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '', '5kg', '', ''),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 32, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-15', '1d', '', ''),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 33, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '#tm-section-15', '5kg', '', ''),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 34, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-15', '1d', '', ''),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 35, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '#tm-section-15', '5kg', '', ''),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 36, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-15', '1d', '', ''),
('papa', 'papa', '[\"img/prueba/papa/images/WhatsApp Image 2023-06-27 at 13.22.53.jpg\",\"img/prueba/papa/images/WhatsApp Image 2023-06-28 at 09.16.13.jpg\"]', 37, '[\"img\\/prueba\\/papa\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/papa\\/files\\/avance.pdf\"]', '{11},{2}', '#tm-section-13', '1a', '', ''),
('frijoles', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore modi asperiores veritatis, dolore necessitatibus qui doloremque vitae, reiciendis quisquam sequi odio iste beatae voluptatum explicabo. ', '[\"img/prueba/frijoles/images/Screenshot 2023-04-13 192626.png\",\"img/prueba/frijoles/images/Screenshot 2023-04-13 205331.png\"]', 38, '[\"img/prueba/frijoles/files/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img/prueba/frijoles/files/avance.pdf\",\"img/prueba/frijoles/files/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '{11},{13}', '#tm-section-13', '5l', '', ''),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 39, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '{11},{13},{2},{6}', '#tm-section-13', '1d', '', ''),
('frijoles', 'aaaaaaaaaaa', '[\"img\\/prueba\\/frijoles\\/images\\/Etapas para una invesitgacion estadistica (1).png\"]', 40, '[\"img\\/prueba\\/frijoles\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '{11},{2}', '#tm-section-13', '2l', '', ''),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 41, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '{11},{13},{2},{6}', '#tm-section-13', '1d', '', ''),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 42, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '{13},{11},{2},{6}', '#tm-section-13', '5kg', '', ''),
('pirula', 'aaaaa', '[\"img\\/prueba\\/pirula\\/images\\/Etapas para una invesitgacion estadistica (1).png\"]', 43, '[\"img\\/prueba\\/pirula\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '{11},{2}', '#tm-section-13', '2l', '', ''),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 44, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-14', '1d', '', ''),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 45, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-15', '1d', '', ''),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 46, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '#tm-section-14', '5kg', '', ''),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 47, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-15', '1d', '', ''),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 48, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '#tm-section-14', '5kg', '', ''),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 49, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-14', '1d', '', ''),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 50, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '#tm-section-14', '5kg', '', ''),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 51, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-15', '1d', '', ''),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 52, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '#tm-section-14', '5kg', '', ''),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 53, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-14', '1d', '', ''),
('arveja', '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum quia quo quis vitae incidunt aliquam, ab esse enim architecto aut fugit quibusdam, harum assumenda, ducimus consequuntur. Eius, a', '[\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.14.jpg\",\"img/prueba/arveja/images/WhatsApp Image 2023-06-28 at 09.16.141.jpg\"]', 54, '[\"img\\/prueba\\/arveja\\/files\\/Plantilla_Fase_5_-_202016904_89[1].pdf\",\"img\\/prueba\\/arveja\\/files\\/avance.pdf\",\"img\\/prueba\\/arveja\\/files\\/Reconocimient_Andres Felipe Olmos Rojas.pdf\"]', '', '#tm-section-14', '5kg', '', ''),
('empanadas', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo', '[\"img/prueba/empanadas/images/450_1000.webp\",\"img/prueba/empanadas/images/6039c84e695ede694324b40d_owaspcode-1-1024x675-1.webp\"]', 55, '[\"img/prueba/empanadas/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '', '#tm-section-15', '1d', '', ''),
('arepa x', 'hola', '[\"img/prueba/arepa x/images/atrasada.png\",\"img/prueba/arepa x/images/banner-bg.png\",\"img/prueba/arepa x/images/footer-logo.png\",\"img/prueba/arepa x/images/icon-1.png\",\"img/prueba/arepa x/images/img-1.png\",\"img/prueba/arepa x/images/img-2(1).png\",\"img/prueba/arepa x/images/img-2.png\",\"img/prueba/arepa x/images/img-3(1).png\"]', 56, '[\"img/prueba/arepa x/files/Paso5_Sustentacion_AE_Grupo202016901_142.pdf\",\"img/prueba/arepa x/files/Fase5_Grupo202337120_149.pdf\",\"img/prueba/arepa x/files/Fase 5 - Presentaciu00f3n de resultados_ grupo 88.pdf\",\"img/prueba/arepa x/files/Fase 4_202337120_149.pdf\"]', '{11},{2}', '#tm-section-12', '{9},{11}', '', ''),
('papa', 'papo', '[\"img/prueba/papa/images/atrasada.png\",\"img/prueba/papa/images/banner-bg.png\",\"img/prueba/papa/images/footer-logo.png\",\"img/prueba/papa/images/icon-1.png\",\"img/prueba/papa/images/img-1.png\",\"img/prueba/papa/images/img-2(1).png\",\"img/prueba/papa/images/img-2.png\",\"img/prueba/papa/images/img-3(1).png\"]', 57, '[\"img/prueba/papa/files/Fase 5 - Presentaciu00f3n de resultados_ grupo 88.pdf\",\"img/prueba/papa/files/Plantilla_Fase_5_-_202016904_89[1].pdf\"]', '{11},{10},{15}', '#tm-section-12', '{2},{11}', '', '1A'),
('pirula(2)', 'nada', '[\"img/prueba/pirula(2)/images/img-1.png\",\"img/prueba/pirula(2)/images/img-2(1).png\",\"img/prueba/pirula(2)/images/img-2.png\"]', 58, '[]', '{11},{2},{18}', '#tm-section-12', '{2},{11', '/img/prueba/pirula(2)/images/logo/logo.png', '');

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
-- Indexes for table `amount`
--
ALTER TABLE `amount`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `filters`
--
ALTER TABLE `filters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
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
-- AUTO_INCREMENT for table `amount`
--
ALTER TABLE `amount`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `filters`
--
ALTER TABLE `filters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
