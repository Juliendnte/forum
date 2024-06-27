DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status`
(
    `Id`    int NOT NULL AUTO_INCREMENT,
    `Label` varchar(50) DEFAULT NULL,
    PRIMARY KEY (`Id`),
    UNIQUE KEY `Label` (`Label`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
