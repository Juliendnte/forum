DROP TABLE IF EXISTS `tagstopics`;
CREATE TABLE IF NOT EXISTS `tagstopics`
(
    `Id_topics` int NOT NULL,
    `Id_Tag`    int NOT NULL,
    PRIMARY KEY (`Id_topics`, `Id_Tag`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;