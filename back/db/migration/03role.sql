DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role`
(
    `Id`    int NOT NULL AUTO_INCREMENT,
    `Label` varchar(20),
    PRIMARY KEY (`Id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;