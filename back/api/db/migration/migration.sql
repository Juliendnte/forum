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

-- Structure de la table `status`
DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
                                        `Id` int NOT NULL AUTO_INCREMENT,
                                        `Label` varchar(50) DEFAULT NULL,
                                        PRIMARY KEY (`Id`),
                                        UNIQUE KEY `Label` (`Label`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Structure de la table `users`
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
                                       `Id` int NOT NULL AUTO_INCREMENT,
                                       `Name` varchar(50) NOT NULL UNIQUE,
                                       `Biography` varchar(1200) DEFAULT NULL,
                                       `Path` varchar(255) DEFAULT 'user/undefined',
                                       `Email` varchar(100) NOT NULL UNIQUE,
                                       `Password` varchar(200) NOT NULL,
                                       `Salt` varchar(100) NOT NULL,
                                       `Create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                       `Id_role` int NOT NULL DEFAULT 3,
                                       PRIMARY KEY(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Structure de la table `topics`
DROP TABLE IF EXISTS `topics`;
CREATE TABLE IF NOT EXISTS `topics` (
                                        `Id` int NOT NULL AUTO_INCREMENT,
                                        `Title` varchar(75) NOT NULL,
                                        `Path` varchar(255) DEFAULT NULL,
                                        `Create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                                        `Id_Status` int NOT NULL,
                                        `Id_User` int NOT NULL,
                                        PRIMARY KEY (`Id`),
                                        CONSTRAINT `FK_Topics_Status` FOREIGN KEY (`Id_Status`) REFERENCES `status`(`Id`),
                                        CONSTRAINT `FK_Topics_Users` FOREIGN KEY (`Id_User`) REFERENCES `users`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Structure de la table `posts`
DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
                                       `Id` int NOT NULL AUTO_INCREMENT,
                                       `Content` varchar(500) NOT NULL,
                                       `Create_post` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                       `Id_topics` int NOT NULL,
                                       `Id_User` int NOT NULL,
                                       `Id_PostAnswer` int,
                                       PRIMARY KEY (`Id`),
                                       CONSTRAINT `FK_Posts_Topics` FOREIGN KEY (`Id_topics`) REFERENCES `topics`(`Id`),
                                       CONSTRAINT `FK_Posts_Users` FOREIGN KEY (`Id_User`) REFERENCES `users`(`Id`),
                                       CONSTRAINT `FK_Posts_PostAnswer` FOREIGN KEY (`Id_PostAnswer`) REFERENCES `posts`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Structure de la table `message`
DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
                                         `Id` int NOT NULL AUTO_INCREMENT,
                                         `Content` TEXT NOT NULL,
                                         `Create_message` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                         `Update_message` timestamp NULL DEFAULT NULL,
                                         `Id_User` int NOT NULL,
                                         `Id_PostAnswer` int NOT NULL,
                                         `Id_MessageAnswer` int DEFAULT NULL,
                                         PRIMARY KEY (`Id`),
                                         CONSTRAINT `FK_Message_Users` FOREIGN KEY (`Id_User`) REFERENCES `users`(`Id`),
                                         CONSTRAINT `FK_Message_PostAnswer` FOREIGN KEY (`Id_PostAnswer`) REFERENCES `posts`(`Id`),
                                         CONSTRAINT `FK_Message_MessageAnswer` FOREIGN KEY (`Id_MessageAnswer`) REFERENCES `message`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Structure de la table `userstags`
DROP TABLE IF EXISTS `userstags`;
CREATE TABLE IF NOT EXISTS `userstags` (
                                           `Id_Tag` int NOT NULL,
                                           `Id_User` int NOT NULL,
                                           PRIMARY KEY (`Id_User`,`Id_Tag`),
                                           CONSTRAINT `FK_Userstags_Tags` FOREIGN KEY (`Id_Tag`) REFERENCES `tags`(`Id`),
                                           CONSTRAINT `FK_Userstags_Users` FOREIGN KEY (`Id_User`) REFERENCES `users`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Structure de la table `favtopics`
DROP TABLE IF EXISTS `favtopics`;
CREATE TABLE IF NOT EXISTS `favtopics` (
                                           `Id_topics` int NOT NULL,
                                           `Id_User` int NOT NULL,
                                           PRIMARY KEY (`Id_User`,`Id_topics`),
                                           CONSTRAINT `FK_Favtopics_Topics` FOREIGN KEY (`Id_topics`) REFERENCES `topics`(`Id`),
                                           CONSTRAINT `FK_Favtopics_Users` FOREIGN KEY (`Id_User`) REFERENCES `users`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Structure de la table `friendship`
DROP TABLE IF EXISTS `friendship`;
CREATE TABLE IF NOT EXISTS `friendship` (
                                            `Id_User1` int NOT NULL,
                                            `Id_User2` int NOT NULL,
                                            `status` varchar(50) DEFAULT 'waiting',
                                            PRIMARY KEY (`Id_User1`,`Id_User2`),
                                            CONSTRAINT `FK_Friendship_User1` FOREIGN KEY (`Id_User1`) REFERENCES `users`(`Id`),
                                            CONSTRAINT `FK_Friendship_User2` FOREIGN KEY (`Id_User2`) REFERENCES `users`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Structure de la table `tagstopics`
DROP TABLE IF EXISTS `tagstopics`;
CREATE TABLE IF NOT EXISTS `tagstopics` (
                                            `Id_topics` int NOT NULL,
                                            `Id_Tag` int NOT NULL,
                                            PRIMARY KEY (`Id_topics`,`Id_Tag`),
                                            CONSTRAINT `FK_Tagstopics_Topics` FOREIGN KEY (`Id_topics`) REFERENCES `topics`(`Id`),
                                            CONSTRAINT `FK_Tagstopics_Tags` FOREIGN KEY (`Id_Tag`) REFERENCES `tags`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Structure de la table `likepost`
DROP TABLE IF EXISTS `likepost`;
CREATE TABLE IF NOT EXISTS `likepost` (
                                          `Id_Post` int NOT NULL,
                                          `Id_User` int NOT NULL,
                                          `Dislike` int DEFAULT 0,
                                          PRIMARY KEY (`Id_User`,`Id_Post`),
                                          CONSTRAINT `FK_Likepost_Post` FOREIGN KEY (`Id_Post`) REFERENCES `posts`(`Id`),
                                          CONSTRAINT `FK_Likepost_User` FOREIGN KEY (`Id_User`) REFERENCES `users`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Structure de la table `role`
DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
                                      `Id` int NOT NULL AUTO_INCREMENT,
                                      `Label` varchar(20),
                                      PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Ajout des clés étrangères
ALTER TABLE `users`
    ADD CONSTRAINT `FK_Users_Role` FOREIGN KEY (`Id_role`) REFERENCES `role`(`Id`);

COMMIT;
