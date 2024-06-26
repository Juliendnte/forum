DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts`
(
    `Id`            int          NOT NULL AUTO_INCREMENT,
    `Title`         varchar(75)  NOT NULL,
    `Content`       varchar(500) NOT NULL,
    `Create_post`   timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `Id_topics`     int          NOT NULL,
    `Id_User`       int          NOT NULL,
    `Id_PostAnswer` int                   DEFAULT NULL,
    PRIMARY KEY (`Id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;