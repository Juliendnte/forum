ALTER TABLE `users`
    ADD CONSTRAINT `FK_Users_Role` FOREIGN KEY (`Id_role`) REFERENCES `role` (`Id`);

ALTER TABLE `topics`
    ADD CONSTRAINT `FK_Topics_Status` FOREIGN KEY (`Id_Status`) REFERENCES `status` (`Id`),
    ADD CONSTRAINT `FK_Topics_Users` FOREIGN KEY (`Id_User`) REFERENCES `users` (`Id`);

ALTER TABLE `posts`
    ADD CONSTRAINT `FK_Posts_Topics` FOREIGN KEY (`Id_topics`) REFERENCES `topics` (`Id`),
    ADD CONSTRAINT `FK_Posts_Users` FOREIGN KEY (`Id_User`) REFERENCES `users` (`Id`),
    ADD CONSTRAINT `FK_Posts_PostAnswer` FOREIGN KEY (`Id_PostAnswer`) REFERENCES `posts` (`Id`);

ALTER TABLE `message`
    ADD CONSTRAINT `FK_Message_Users` FOREIGN KEY (`Id_User`) REFERENCES `users` (`Id`),
    ADD CONSTRAINT `FK_Message_PostAnswer` FOREIGN KEY (`Id_PostAnswer`) REFERENCES `posts` (`Id`),
    ADD CONSTRAINT `FK_Message_MessageAnswer` FOREIGN KEY (`Id_MessageAnswer`) REFERENCES `message` (`Id`);

ALTER TABLE `userstags`
    ADD CONSTRAINT `FK_Userstags_Tags` FOREIGN KEY (`Id_Tag`) REFERENCES `tags` (`Id`),
    ADD CONSTRAINT `FK_Userstags_Users` FOREIGN KEY (`Id_User`) REFERENCES `users` (`Id`);

ALTER TABLE `favtopics`
    ADD CONSTRAINT `FK_Favtopics_Topics` FOREIGN KEY (`Id_topics`) REFERENCES `topics` (`Id`),
    ADD CONSTRAINT `FK_Favtopics_Users` FOREIGN KEY (`Id_User`) REFERENCES `users` (`Id`);

ALTER TABLE `friendship`
    ADD CONSTRAINT `FK_Friendship_User1` FOREIGN KEY (`Id_User1`) REFERENCES `users` (`Id`),
    ADD CONSTRAINT `FK_Friendship_User2` FOREIGN KEY (`Id_User2`) REFERENCES `users` (`Id`);

ALTER TABLE `tagstopics`
    ADD CONSTRAINT `FK_Tagstopics_Topics` FOREIGN KEY (`Id_topics`) REFERENCES `topics` (`Id`),
    ADD CONSTRAINT `FK_Tagstopics_Tags` FOREIGN KEY (`Id_Tag`) REFERENCES `tags` (`Id`);

ALTER TABLE `likepost`
    ADD CONSTRAINT `FK_Likepost_Post` FOREIGN KEY (`Id_Post`) REFERENCES `posts` (`Id`),
    ADD CONSTRAINT `FK_Likepost_User` FOREIGN KEY (`Id_User`) REFERENCES `users` (`Id`);
