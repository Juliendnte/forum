DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message`
(
    `Id`               int       NOT NULL AUTO_INCREMENT,
    `Content`          TEXT      NOT NULL,
    `Create_message`   timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `Update_message`   timestamp NULL     DEFAULT NULL,
    `Id_User`          int       NOT NULL,
    `Id_PostAnswer`    int       NOT NULL,
    `Id_MessageAnswer` int                DEFAULT NULL,
    PRIMARY KEY (`Id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;