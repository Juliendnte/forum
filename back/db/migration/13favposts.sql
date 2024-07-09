DROP TABLE IF EXISTS `favposts`;
CREATE TABLE IF NOT EXISTS `favposts`
(
    `Id_Post` int NOT NULL,
    `Id_User`   int NOT NULL,
    PRIMARY KEY (`Id_User`, `Id_Post`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;