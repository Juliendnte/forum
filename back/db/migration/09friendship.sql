DROP TABLE IF EXISTS `friendship`;
CREATE TABLE IF NOT EXISTS `friendship`
(
    `Id_User1` int NOT NULL,
    `Id_User2` int NOT NULL,
    `status`   varchar(50) DEFAULT 'waiting',
    PRIMARY KEY (`Id_User1`, `Id_User2`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;