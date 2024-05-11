
-- Insérer des données factices dans la table `roles`
INSERT INTO `roles` (`Label`) VALUES
                                  ('Admin'),
                                  ('Modérateur'),
                                  ('Utilisateur');

-- Insérer des données factices dans la table `status`
INSERT INTO `status` (`Id`, `Label`) VALUES
                                         (1, 'Actif'),
                                         (2, 'Inactif');

-- Insérer des données factices dans la table `tags`
INSERT INTO `tags` (`Label`) VALUES
                                 ('PHP'),
                                 ('JavaScript'),
                                 ('HTML'),
                                 ('CSS'),
                                 ('MySQL');

-- Insérer des données factices dans la table `users`
INSERT INTO `users` (`Name`, `Biography`, `Email`, `Password`, `Id_roles`) VALUES
                                                                               ('admin', 'Administrateur du forum', 'admin@example.com', 'hashed_password', 1),
                                                                               ('moderator', 'Modérateur du forum', 'moderator@example.com', 'hashed_password', 2),
                                                                               ('user1', 'Utilisateur régulier', 'user1@example.com', 'hashed_password', 3),
                                                                               ('user2', 'Nouvel utilisateur', 'user2@example.com', 'hashed_password', 3);

-- Insérer des données factices dans la table `topic`
INSERT INTO `topic` (`Title`, `Description`, `Id_Status`, `Id_User`) VALUES
                                                                         ('Introduction à PHP', 'Un sujet pour discuter de l''introduction à PHP.', 1, 1),
                                                                         ('Problèmes de compatibilité CSS', 'Un endroit pour discuter des problèmes de compatibilité CSS.', 1, 2),
                                                                         ('Bases de données MySQL', 'Discussion sur les bases de données MySQL.', 1, 3);

-- Insérer des données factices dans la table `posts`
INSERT INTO `posts` (`Content`, `Id_Topic`, `Id_Users`) VALUES
                                                            ('Bonjour à tous, voici une introduction à PHP.', 1, 1),
                                                            ('Je rencontre des problèmes de compatibilité CSS avec certains navigateurs.', 2, 2),
                                                            ('Quelles sont les meilleures pratiques pour optimiser les requêtes MySQL ?', 3, 3);
