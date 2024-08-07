ALTER TABLE `users`
    ADD CONSTRAINT `FK_Users_Role` FOREIGN KEY (`Id_role`) REFERENCES `role` (`Id`);

ALTER TABLE `topics`
    ADD CONSTRAINT `FK_Topics_Status` FOREIGN KEY (`Id_Status`) REFERENCES `status` (`Id`),
    ADD CONSTRAINT `FK_Topics_Users` FOREIGN KEY (`Id_User`) REFERENCES `users` (`Id`) ON DELETE CASCADE;

ALTER TABLE `posts`
    ADD CONSTRAINT `FK_Posts_Topics` FOREIGN KEY (`Id_topics`) REFERENCES `topics` (`Id`) ON DELETE CASCADE,
    ADD CONSTRAINT `FK_Posts_Users` FOREIGN KEY (`Id_User`) REFERENCES `users` (`Id`) ON DELETE CASCADE;

ALTER TABLE `message`
    ADD CONSTRAINT `FK_Message_Users` FOREIGN KEY (`Id_User`) REFERENCES `users` (`Id`) ON DELETE CASCADE,
    ADD CONSTRAINT `FK_Message_PostAnswer` FOREIGN KEY (`Id_PostAnswer`) REFERENCES `posts` (`Id`) ON DELETE CASCADE,
    ADD CONSTRAINT `FK_Message_MessageAnswer` FOREIGN KEY (`Id_MessageAnswer`) REFERENCES `message` (`Id`) ON DELETE CASCADE;

ALTER TABLE `userstags`
    ADD CONSTRAINT `FK_Userstags_Tags` FOREIGN KEY (`Id_Tag`) REFERENCES `tags` (`Id`) ON DELETE CASCADE,
    ADD CONSTRAINT `FK_Userstags_Users` FOREIGN KEY (`Id_User`) REFERENCES `users` (`Id`) ON DELETE CASCADE;

ALTER TABLE `favtopics`
    ADD CONSTRAINT `FK_Favtopics_Topics` FOREIGN KEY (`Id_topics`) REFERENCES `topics` (`Id`) ON DELETE CASCADE,
    ADD CONSTRAINT `FK_Favtopics_Users` FOREIGN KEY (`Id_User`) REFERENCES `users` (`Id`) ON DELETE CASCADE;

ALTER TABLE `favposts`
    ADD CONSTRAINT `FK_Favposts_Post` FOREIGN KEY (`Id_Post`) REFERENCES `posts` (`Id`) ON DELETE CASCADE,
    ADD CONSTRAINT `FK_Favposts_Users` FOREIGN KEY (`Id_User`) REFERENCES `users` (`Id`) ON DELETE CASCADE;

ALTER TABLE `friendship`
    ADD CONSTRAINT `FK_Friendship_User1` FOREIGN KEY (`Id_User1`) REFERENCES `users` (`Id`) ON DELETE CASCADE,
    ADD CONSTRAINT `FK_Friendship_User2` FOREIGN KEY (`Id_User2`) REFERENCES `users` (`Id`) ON DELETE CASCADE;

ALTER TABLE `tagstopics`
    ADD CONSTRAINT `FK_Tagstopics_Topics` FOREIGN KEY (`Id_topics`) REFERENCES `topics` (`Id`) ON DELETE CASCADE,
    ADD CONSTRAINT `FK_Tagstopics_Tags` FOREIGN KEY (`Id_Tag`) REFERENCES `tags` (`Id`) ON DELETE CASCADE;

ALTER TABLE `likepost`
    ADD CONSTRAINT `FK_Likepost_Post` FOREIGN KEY (`Id_Post`) REFERENCES `posts` (`Id`) ON DELETE CASCADE,
    ADD CONSTRAINT `FK_Likepost_User` FOREIGN KEY (`Id_User`) REFERENCES `users` (`Id`) ON DELETE CASCADE;
