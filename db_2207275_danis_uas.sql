-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 05, 2024 at 11:10 AM
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
-- Database: `db_2207275_danis_uas`
--

-- --------------------------------------------------------

--
-- Table structure for table `inventory_danis`
--

CREATE TABLE `inventory_danis` (
  `id` int(11) NOT NULL,
  `nama_barang` varchar(50) DEFAULT NULL,
  `jumlah` int(11) DEFAULT NULL,
  `harga_satuan` int(11) DEFAULT NULL,
  `lokasi` varchar(200) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory_danis`
--

INSERT INTO `inventory_danis` (`id`, `nama_barang`, `jumlah`, `harga_satuan`, `lokasi`, `deskripsi`) VALUES
(1, 'VITA CHICKS', 100, 60000, 'Missouri Jl. Malabar No.53', 'Vita Chick is a vitamin for chicks and adult chickens, in the form of a powder that can be dissolved in water, light brown in color, which contains many multivitamins combined with growth promoter antibiotics (growth-promoting probiotics) so that chick growth can be maximized. (Price Per Box)'),
(2, 'HI-PRO-VITE 511 (1kg)', 200, 13000, 'Missouri Jl. Malabar No.53', 'high protein feed for chicks'),
(3, '(FITHERA) Tempat makanan', 50, 12000, 'Missouri Jl. Malabar No.53', 'Chicken Poultry Feeder with 1kg capacity'),
(4, '(MEDIVAC) Tempat Minuman', 60, 8000, 'Missouri Jl. Malabar No.53', 'Medion 1 Liter Manual Chicken Drinker'),
(5, 'Boiler Chicken', 500, 6000, 'Mossouri Jl. Malabar No.53', 'Superior broiler chicks aged 12 weeks in healthy condition');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `inventory_danis`
--
ALTER TABLE `inventory_danis`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `inventory_danis`
--
ALTER TABLE `inventory_danis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
