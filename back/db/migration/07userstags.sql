DROP TABLE IF EXISTS `userstags`;
CREATE TABLE IF NOT EXISTS `userstags`
(
    `Id_Tag`  int NOT NULL,
    `Id_User` int NOT NULL,
    PRIMARY KEY (`Id_User`, `Id_Tag`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;