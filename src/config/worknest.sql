-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 15 juin 2026 à 10:42
-- Version du serveur : 9.1.0
-- Version de PHP : 8.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS worknest
CHARACTER SET utf8mb4
COLLATE utf8mb4_0900_ai_ci;

USE worknest;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `worknest`
--

-- --------------------------------------------------------

--
-- Structure de la table `listings`
--

DROP TABLE IF EXISTS `listings`;
CREATE TABLE IF NOT EXISTS `listings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `service` text,
  `equipment` text,
  `average_rating` decimal(3,2) DEFAULT '0.00',
  `capacity` int DEFAULT NULL,
  `number_address` varchar(10) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_listings_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
CREATE TABLE IF NOT EXISTS `reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `room_id` int NOT NULL,
  `start_at` date NOT NULL,
  `end_at` date NOT NULL,
  `status` enum('en_attente','confirme','annule') DEFAULT 'en_attente',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_res_user` (`user_id`),
  KEY `fk_res_room` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
CREATE TABLE IF NOT EXISTS `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listing_id` int NOT NULL,
  `room_number` varchar(10) DEFAULT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `start_at` date DEFAULT NULL,
  `end_at` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_rooms_listing` (`listing_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `last_name` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `role` enum('client','proprietaire','admin') NOT NULL,
  `password` varchar(255) NOT NULL,
  `number_address` varchar(10) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `last_name`, `first_name`, `birth_date`, `email`, `gender`, `role`, `password`, `number_address`, `street`, `city`, `postal_code`, `country`, `created_at`, `updated_at`) VALUES
(1, 'Sall', 'Rokhaya', '1998-02-16', 'rokhaya@test.fr', 'Femme', 'client', '$2b$10$pT.8Rs7TF8SlhmukRfnh3e4n37V1mY1q59/JsB2mc4/6lqR3QAWiC', '52', 'Rue des Fleurs', 'Caluire-et-Cuire', '69300', 'France', '2026-06-08 09:46:32', '2026-06-08 09:46:32'),
(2, 'Martin', 'Sarah', '1990-05-12', 'sarah.admin@worknest.fr', 'Femme', 'admin', '$2b$10$Si9MrwvBvsBybifWR8Vy2O9JS6fTPo1eHKp.5dsjgoUaJ6VzxsqwG', '10', 'Rue de la République', 'Lyon', '69002', 'France', '2026-06-09 12:56:39', '2026-06-10 08:41:06'),
(11, 'Dubois', 'Alex', '1988-09-25', 'alex.admin@worknest.fr', 'Homme', 'admin', '$2b$10$GVxWSluKwAJgm.aKRvu/ie7TzDE0egAy7D21XxXLAC8Zc.02Vjzxy', '15', 'Rue Victor Hugo', 'Lyon', '69002', 'France', '2026-06-12 13:16:38', '2026-06-12 13:16:38'),
(12, 'Moreau', 'Emma', '1998-11-07', 'emma.client@worknest.fr', 'Femme', 'client', '$2b$10$L7AeNpORm.R6Y.zc6bAyB.JwFLpW.z3iOsj98rSt1qd318pHR.jtK', '8', 'Rue Nationale', 'Lille', '59000', 'France', '2026-06-15 08:16:37', '2026-06-15 08:16:37'),
(13, 'Bernard', 'Thomas', '1985-03-18', 'thomas.owner@worknest.fr', 'Homme', 'proprietaire', '$2b$10$m5Wm/Td/zt3qrCee3WNYIOR16JZCvnh8DeSIKyGXDJtKEj0V728im', '22', 'Avenue Jean Jaurès', 'Marseille', '13001', 'France', '2026-06-15 08:17:37', '2026-06-15 08:17:37');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `listings`
--
ALTER TABLE `listings`
  ADD CONSTRAINT `fk_listings_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `fk_res_room` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_res_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `fk_rooms_listing` FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
