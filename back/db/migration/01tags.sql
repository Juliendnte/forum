DROP TABLE IF EXISTS `tags`;
CREATE TABLE IF NOT EXISTS `tags`
(
    `Id`    int          NOT NULL AUTO_INCREMENT,
    `Label` varchar(50)  NOT NULL,
    `Path`  varchar(255) NOT NULL,
    PRIMARY KEY (`Id`),
    UNIQUE KEY `Label` (`Label`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;