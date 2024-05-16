-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 23 avr. 2024 à 06:37
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Structure de la table `tags`
DROP TABLE IF EXISTS `tags`;
CREATE TABLE IF NOT EXISTS `tags` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Label` varchar(50) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Label` (`Label`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Structure de la table `notifs`
DROP TABLE IF EXISTS `notifs`;
CREATE TABLE IF NOT EXISTS `notifs` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Label` varchar(50) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Label` (`Label`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Structure de la table `status`
DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
  `Id` int NOT NULL,
  `Label` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Label` (`Label`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Structure de la table `roles`
DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Label` varchar(50) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Label` (`Label`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Structure de la table `users`
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(15) NOT NULL,
  `Biography` varchar(250) DEFAULT NULL,
  `Photo` varchar(60) DEFAULT 'undefined',
  `Email` varchar(100) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Id_roles` int NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Name` (`Name`),
  UNIQUE KEY `Email` (`Email`),
  FOREIGN KEY (`Id_roles`) REFERENCES `roles`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Structure de la table `topics`
DROP TABLE IF EXISTS `topics`;
CREATE TABLE IF NOT EXISTS `topics` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(75) NOT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `Create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Id_Status` int,
  `Id_User` int,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`Id_User`) REFERENCES `users`(`Id`),
  FOREIGN KEY (`Id_Status`) REFERENCES `status`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Structure de la table `posts`
DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Content` varchar(500) NOT NULL,
  `Create_post` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Update_post` timestamp NULL DEFAULT NULL,
  `Id_PostAnswer` int DEFAULT NULL,
  `Id_topics` int NOT NULL,
  `Id_Users` int NOT NULL,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`Id_PostAnswer`) REFERENCES `posts`(`Id`),
  FOREIGN KEY (`Id_topics`) REFERENCES `topics`(`Id`),
  FOREIGN KEY (`Id_Users`) REFERENCES `users`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Structure de la table `userstags`
DROP TABLE IF EXISTS `userstags`;
CREATE TABLE IF NOT EXISTS `userstags` (
  `Id_Tag` int NOT NULL,
  `Id_User` int NOT NULL,
  PRIMARY KEY (`Id_User`,`Id_Tag`),
  FOREIGN KEY (`Id_Tag`) REFERENCES `tags`(`Id`),
  FOREIGN KEY (`Id_User`) REFERENCES `users`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Structure de la table `favtopics`
DROP TABLE IF EXISTS `favtopics`;
CREATE TABLE IF NOT EXISTS `favtopics` (
  `Id_topics` int NOT NULL,
  `Id_User` int NOT NULL,
  PRIMARY KEY (`Id_User`,`Id_topics`),
  FOREIGN KEY (`Id_topics`) REFERENCES `topics`(`Id`),
  FOREIGN KEY (`Id_User`) REFERENCES `users`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Structure de la table `follow`
DROP TABLE IF EXISTS `follow`;
CREATE TABLE IF NOT EXISTS `follow` (
  `Id_User1` int NOT NULL,
  `Id_User2` int NOT NULL,
  `follow_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_User1`,`Id_User2`),
  FOREIGN KEY (`Id_User1`) REFERENCES `users`(`Id`),
  FOREIGN KEY (`Id_User2`) REFERENCES `users`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Structure de la table `friendship`
DROP TABLE IF EXISTS `friendship`;
CREATE TABLE IF NOT EXISTS `friendship` (
  `Id_User1` int NOT NULL,
  `Id_User2` int NOT NULL,
  `status` varchar(50) DEFAULT 'waiting',
  PRIMARY KEY (`Id_User1`,`Id_User2`),
  FOREIGN KEY (`Id_User1`) REFERENCES `users`(`Id`),
  FOREIGN KEY (`Id_User2`) REFERENCES `users`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Structure de la table `tagstopics`
DROP TABLE IF EXISTS `tagstopics`;
CREATE TABLE IF NOT EXISTS `tagstopics` (
  `Id_topics` int NOT NULL,
  `Id_Tag` int NOT NULL,
  PRIMARY KEY (`Id_topics`,`Id_Tag`),
  FOREIGN KEY (`Id_topics`) REFERENCES `topics`(`Id`),
  FOREIGN KEY (`Id_Tag`) REFERENCES `tags`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Structure de la table `likepost`
DROP TABLE IF EXISTS `likepost`;
CREATE TABLE IF NOT EXISTS `likepost` (
  `Id_Post` int NOT NULL,
  `Id_User` int NOT NULL,
  `Dislike` int DEFAULT 0,
  PRIMARY KEY (`Id_User`,`Id_Post`),
  FOREIGN KEY (`Id_Post`) REFERENCES `posts`(`Id`),
  FOREIGN KEY (`Id_User`) REFERENCES `users`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Structure de la table `liketopics`
DROP TABLE IF EXISTS `liketopics`;
CREATE TABLE IF NOT EXISTS `liketopics` (
  `Id_topics` int NOT NULL,
  `Id_User` int NOT NULL,
  `Dislike` int DEFAULT 0,
  PRIMARY KEY (`Id_User`,`Id_topics`),
  FOREIGN KEY (`Id_topics`) REFERENCES `topics`(`Id`),
  FOREIGN KEY (`Id_User`) REFERENCES `users`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Structure de la table `send`
DROP TABLE IF EXISTS `send`;
CREATE TABLE IF NOT EXISTS `send` (
  `Id_User` int NOT NULL,
  `Id_Notif` int NOT NULL,
  PRIMARY KEY (`Id_User`,`Id_Notif`),
  FOREIGN KEY (`Id_Notif`) REFERENCES `notifs`(`Id`),
  FOREIGN KEY (`Id_User`) REFERENCES `users`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

COMMIT;
