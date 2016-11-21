-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 17, 2016 at 11:02 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `daisu_db`
--
CREATE DATABASE IF NOT EXISTS `daisu_db` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `daisu_db`;

-- --------------------------------------------------------

--
-- Table structure for table `detail`
--

CREATE TABLE `detail` (
  `detailid` int(10) NOT NULL,
  `productdetail` varchar(300) NOT NULL,
  `itemid1` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `itemid` int(10) UNSIGNED NOT NULL,
  `productname` varchar(20) NOT NULL,
  `brand` varchar(10) NOT NULL,
  `price` float NOT NULL,
  `category` varchar(10) NOT NULL,
  `color` varchar(10) NOT NULL,
  `picturelink` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `shoppingcart`
--

CREATE TABLE `shoppingcart` (
  `userid3` int(10) UNSIGNED NOT NULL,
  `itemid3` int(10) UNSIGNED NOT NULL,
  `quantity` int(10) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transactionhas`
--

CREATE TABLE `transactionhas` (
  `datetime2` timestamp NOT NULL,
  `itemid2` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transactionhistory`
--

CREATE TABLE `transactionhistory` (
  `datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `shippingtype` varchar(15) NOT NULL,
  `quantity` int(10) UNSIGNED NOT NULL,
  `streetaddress` varchar(30) NOT NULL,
  `city` varchar(20) NOT NULL,
  `state` varchar(2) NOT NULL,
  `zipcode` varchar(5) NOT NULL,
  `cardholdername` varchar(20) NOT NULL,
  `cardtype` varchar(15) NOT NULL,
  `cardnumber` varchar(16) NOT NULL,
  `cardexpiration` varchar(5) NOT NULL,
  `userid1` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userid` int(10) UNSIGNED NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(25) NOT NULL,
  `email` varchar(40) NOT NULL,
  `firstName` varchar(15) NOT NULL,
  `middleName` varchar(15) DEFAULT NULL,
  `lastName` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userid`, `username`, `password`, `email`, `firstName`, `middleName`, `lastName`) VALUES
(1, 'asangar', 'password', 'asangar94@gmail.com', 'Arun', '', 'Sangar');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail`
--
ALTER TABLE `detail`
  ADD PRIMARY KEY (`detailid`),
  ADD KEY `itemid1` (`itemid1`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`itemid`);

--
-- Indexes for table `shoppingcart`
--
ALTER TABLE `shoppingcart`
  ADD PRIMARY KEY (`userid3`,`itemid3`),
  ADD KEY `userid3` (`userid3`),
  ADD KEY `itemid3` (`itemid3`);

--
-- Indexes for table `transactionhas`
--
ALTER TABLE `transactionhas`
  ADD PRIMARY KEY (`datetime2`,`itemid2`),
  ADD KEY `datetime2` (`datetime2`),
  ADD KEY `itemid2` (`itemid2`);

--
-- Indexes for table `transactionhistory`
--
ALTER TABLE `transactionhistory`
  ADD PRIMARY KEY (`datetime`) USING HASH,
  ADD KEY `userid1` (`userid1`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detail`
--
ALTER TABLE `detail`
  MODIFY `detailid` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `itemid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail`
--
ALTER TABLE `detail`
  ADD CONSTRAINT `detail_ibfk_1` FOREIGN KEY (`itemid1`) REFERENCES `item` (`itemid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `shoppingcart`
--
ALTER TABLE `shoppingcart`
  ADD CONSTRAINT `shoppingcart_ibfk_1` FOREIGN KEY (`userid3`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `shoppingcart_ibfk_2` FOREIGN KEY (`itemid3`) REFERENCES `item` (`itemid`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `transactionhas`
--
ALTER TABLE `transactionhas`
  ADD CONSTRAINT `transactionhas_ibfk_1` FOREIGN KEY (`datetime2`) REFERENCES `transactionhistory` (`datetime`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transactionhas_ibfk_2` FOREIGN KEY (`itemid2`) REFERENCES `item` (`itemid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transactionhistory`
--
ALTER TABLE `transactionhistory`
  ADD CONSTRAINT `transactionhistory_ibfk_1` FOREIGN KEY (`userid1`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
