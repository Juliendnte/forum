DROP TABLE IF EXISTS `topics`;
CREATE TABLE IF NOT EXISTS `topics`
(
    `Id`        int         NOT NULL AUTO_INCREMENT,
    `Title`     varchar(75) NOT NULL,
    `Path`      varchar(255)     DEFAULT 'topic/undefined.webp',
    `Create_at` timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    `Id_Status` int         NOT NULL,
    `Id_User`   int         NOT NULL,
    PRIMARY KEY (`Id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;