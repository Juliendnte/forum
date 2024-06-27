DROP TABLE IF EXISTS `favtopics`;
CREATE TABLE IF NOT EXISTS `favtopics`
(
    `Id_topics` int NOT NULL,
    `Id_User`   int NOT NULL,
    PRIMARY KEY (`Id_User`, `Id_topics`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;