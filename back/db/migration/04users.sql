DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users`
(
    `Id`        int          NOT NULL AUTO_INCREMENT,
    `Name`      varchar(50)  NOT NULL UNIQUE,
    `Biography` varchar(1200)         DEFAULT NULL,
    `Path`      varchar(255)          DEFAULT 'user/undefined.webp',
    `Email`     varchar(140) NOT NULL UNIQUE,
    `Password`  varchar(250) NOT NULL,
    `Salt`      varchar(150) NOT NULL,
    `Create_at` timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `Id_role`   int          NOT NULL DEFAULT 3,
    PRIMARY KEY (`Id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
