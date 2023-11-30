-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2023 at 05:20 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`cart_id`, `user_id`, `created_at`, `updated_at`) VALUES
(7, 5, '2023-11-29 21:37:32', '2023-11-30 05:15:16');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `item_id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`item_id`, `cart_id`, `product_id`, `quantity`, `created_at`, `updated_at`) VALUES
(21, 7, 5824, 1, '2023-11-30 02:00:58', '2023-11-30 02:00:58'),
(22, 7, 5816, 1, '2023-11-30 02:01:15', '2023-11-30 02:01:15'),
(23, 7, 5812, 1, '2023-11-30 02:26:26', '2023-11-30 02:26:26'),
(24, 7, 5816, 5, '2023-11-30 05:15:16', '2023-11-30 05:15:16');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL DEFAULT '' COMMENT 'Tên danh mục, vd: đồ điện tử'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(2, 'Khoa học'),
(3, 'Thiếu nhi'),
(4, 'Hành động'),
(5, 'Tiếng Anh'),
(6, 'Tình yêu');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `fullname` varchar(100) DEFAULT '',
  `email` varchar(100) DEFAULT '',
  `phone_number` varchar(20) NOT NULL,
  `address` varchar(200) NOT NULL,
  `order_date` datetime DEFAULT current_timestamp(),
  `status` enum('pending','processing','shipped','delivered','cancelled') DEFAULT NULL COMMENT 'Trạng thái đơn hàng',
  `total_money` float DEFAULT NULL,
  `shipping_method` varchar(100) DEFAULT NULL,
  `shipping_address` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `fullname`, `email`, `phone_number`, `address`, `order_date`, `status`, `total_money`, `shipping_method`, `shipping_address`) VALUES
(54, 5, 'user1', '', '0795848854', 'Can Tho', '2023-11-30 04:30:26', 'pending', 83.97, NULL, NULL),
(55, 5, 'user1', '', '0795848854', 'Can Tho', '2023-11-30 05:15:29', 'pending', 223.92, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `number_of_products` int(11) DEFAULT NULL,
  `total_money` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`id`, `order_id`, `product_id`, `price`, `number_of_products`, `total_money`) VALUES
(108, 54, 5824, 25.99, 1, 25.99),
(109, 54, 5816, 27.99, 1, 27.99),
(110, 54, 5812, 29.99, 1, 29.99),
(111, 55, 5824, 25.99, 1, 25.99),
(112, 55, 5816, 27.99, 1, 27.99),
(113, 55, 5812, 29.99, 1, 29.99),
(114, 55, 5816, 27.99, 5, 139.95);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(350) DEFAULT NULL COMMENT 'Tên sản phẩm',
  `price` float NOT NULL,
  `thumbnail` varchar(300) DEFAULT '',
  `description` longtext DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `thumbnail`, `description`, `created_at`, `updated_at`, `category_id`) VALUES
(5812, 'Sách Khoa Học A', 29.99, 'khoa_hoc_a.jpg', 'Mô tả cho sách Khoa Học A', '2023-11-28 16:40:26', '2023-11-28 16:40:26', 2),
(5813, 'Sách Thiếu Nhi X', 19.99, 'thieu_nhi_x.jpg', 'Mô tả cho sách Thiếu Nhi X', '2023-11-28 16:40:26', '2023-11-28 16:40:26', 3),
(5814, 'Sách Hành Động Y', 24.99, 'hanh_dong_y.jpg', 'Mô tả cho sách Hành Động Y', '2023-11-28 16:40:26', '2023-11-28 16:40:26', 4),
(5815, 'Sách Tiếng Anh Z', 34.99, 'tieng_anh_z.jpg', 'Mô tả cho sách Tiếng Anh Z', '2023-11-28 16:40:26', '2023-11-28 16:40:26', 5),
(5816, 'Sách Khoa Học B', 27.99, 'khoa_hoc_b.jpg', 'Mô tả cho sách Khoa Học B', '2023-11-28 16:40:26', '2023-11-28 16:40:26', 2),
(5817, 'Sách Thiếu Nhi M', 21.99, 'thieu_nhi_m.jpg', 'Mô tả cho sách Thiếu Nhi M', '2023-11-28 16:40:26', '2023-11-28 16:40:26', 3),
(5818, 'Sách Hành Động N', 26.99, 'hanh_dong_n.jpg', 'Mô tả cho sách Hành Động N', '2023-11-28 16:40:26', '2023-11-28 16:40:26', 4),
(5819, 'Sách Tình Yêu P', 31.99, 'tinh_yeu_p.jpg', 'Mô tả cho sách Tình Yêu P', '2023-11-28 16:40:26', '2023-11-28 16:40:26', 6),
(5820, 'Sách Khoa Học C', 22.99, 'khoa_hoc_c.jpg', 'Mô tả cho sách Khoa Học C', '2023-11-29 11:53:04', '2023-11-29 11:53:04', 2),
(5821, 'Sách Thiếu Nhi Y', 17.99, 'thieu_nhi_y.jpg', 'Mô tả cho sách Thiếu Nhi Y', '2023-11-29 11:53:04', '2023-11-29 11:53:04', 3),
(5822, 'Sách Hành Động Z', 28.99, 'hanh_dong_z.jpg', 'Mô tả cho sách Hành Động Z', '2023-11-29 11:53:04', '2023-11-29 11:53:04', 4),
(5823, 'Sách Tiếng Anh A', 32.99, 'tieng_anh_a.jpg', 'Mô tả cho sách Tiếng Anh A', '2023-11-29 11:53:04', '2023-11-29 11:53:04', 5),
(5824, 'Sách Khoa Học D', 25.99, 'khoa_hoc_d.jpg', 'Mô tả cho sách Khoa Học D', '2023-11-29 11:53:04', '2023-11-29 11:53:04', 2),
(5825, 'Sách Thiếu Nhi Z', 19.99, 'thieu_nhi_z.jpg', 'Mô tả cho sách Thiếu Nhi Z', '2023-11-29 11:53:04', '2023-11-29 11:53:04', 3),
(5826, 'Sách Hành Động X', 26.99, 'hanh_dong_x.jpg', 'Mô tả cho sách Hành Động X', '2023-11-29 11:53:04', '2023-11-29 11:53:04', 4),
(5827, 'Sách Tình Yêu Q', 29.99, 'tinh_yeu_q.jpg', 'Mô tả cho sách Tình Yêu Q', '2023-11-29 11:53:04', '2023-11-29 11:53:04', 6),
(5828, 'Sách Khoa Học E', 23.99, 'khoa_hoc_e.jpg', 'Mô tả cho sách Khoa Học E', '2023-11-29 11:53:04', '2023-11-29 11:53:04', 2),
(5829, 'Sách Thiếu Nhi T', 20.99, 'thieu_nhi_t.jpg', 'Mô tả cho sách Thiếu Nhi T', '2023-11-29 11:53:04', '2023-11-29 11:53:04', 3),
(5830, 'Sách Hành Động Y', 27.99, 'hanh_dong_y.jpg', 'Mô tả cho sách Hành Động Y', '2023-11-29 11:53:04', '2023-11-29 11:53:04', 4),
(5831, 'Sách Tiếng Anh B', 33.99, 'tieng_anh_b.jpg', 'Mô tả cho sách Tiếng Anh B', '2023-11-29 11:53:04', '2023-11-29 11:53:04', 5),
(5832, 'Sách Khoa Học F', 21.99, 'khoa_hoc_f.jpg', 'Mô tả cho sách Khoa Học F', '2023-11-29 11:53:04', '2023-11-29 11:53:04', 2),
(5833, 'Sách Thiếu Nhi U', 18.99, 'thieu_nhi_u.jpg', 'Mô tả cho sách Thiếu Nhi U', '2023-11-29 11:53:04', '2023-11-29 11:53:04', 3),
(5834, 'Sách Hành Động W', 30.99, 'hanh_dong_w.jpg', 'Mô tả cho sách Hành Động W', '2023-11-29 11:53:04', '2023-11-29 11:53:04', 4),
(5835, 'Sách Tình Yêu R', 31.99, 'tinh_yeu_r.jpg', 'Mô tả cho sách Tình Yêu R', '2023-11-29 11:53:04', '2023-11-29 11:53:04', 6);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'user'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(100) DEFAULT '',
  `phone_number` varchar(10) NOT NULL,
  `address` varchar(200) DEFAULT '',
  `password` varchar(100) NOT NULL DEFAULT '',
  `is_active` tinyint(1) DEFAULT 1,
  `role_id` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `phone_number`, `address`, `password`, `is_active`, `role_id`) VALUES
(3, 'admin1', '0559954302', 'Can Tho', '123456', 1, 2),
(5, 'user1', '0795848854', 'Can Tho', '123456', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`cart_id`),
  ADD UNIQUE KEY `user_id_2` (`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5836;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `fk_user_cart` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `fk_cart_cartitem` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_product_cartitem` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
