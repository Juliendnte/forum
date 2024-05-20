-- Insertion des données dans la table `tags`
INSERT INTO `tags` (`Label`) VALUES
                                 ('Technology'),
                                 ('Science'),
                                 ('Math'),
                                 ('Art'),
                                 ('History');

-- Insertion des données dans la table `notifs`
INSERT INTO `notifs` (`Label`) VALUES
                                   ('New Message'),
                                   ('New Comment'),
                                   ('New Follower');

-- Insertion des données dans la table `status`
INSERT INTO `status` (`Id`, `Label`) VALUES
                                         (1, 'Open'),
                                         (2, 'Closed'),
                                         (3, 'In Progress');

-- Insertion des données dans la table `roles`
INSERT INTO `roles` (`Label`) VALUES
                                  ('User'),
                                  ('Admin'),
                                  ('Moderator');

-- Insertion des données dans la table `users`
INSERT INTO `users` (`Name`, `Biography`, `Photo`, `Email`, `Password`, `Id_roles`) VALUES
                                                                                        ('Alice', 'Loves painting and digital art.', 'alice.jpg', 'alice@example.com', 'password123', 2),
                                                                                        ('Bob', 'A passionate programmer.', 'bob.jpg', 'bob@example.com', 'password123', 1),
                                                                                        ('Charlie', 'Interested in ancient history.', 'charlie.jpg', 'charlie@example.com', 'password123', 2),
                                                                                        ('David', 'Math enthusiast and teacher.', 'david.jpg', 'david@example.com', 'password123', 3);

-- Insertion des données dans la table `topics`
INSERT INTO `topics` (`Title`, `Description`, `Id_Status`, `Id_User`) VALUES
                                                                          ('The Future of AI', 'Discussion about advancements in AI technology.', 1, 2),
                                                                          ('Ancient Civilizations', 'Exploring the mysteries of ancient cultures.', 1, 3),
                                                                          ('Modern Art Techniques', 'Share and learn about new art techniques.', 1, 1);

-- Insertion des données dans la table `posts`
INSERT INTO `posts` (`Content`, `Id_topics`, `Id_Users`) VALUES
                                                             ('AI is evolving rapidly and changing the world.', 1, 2),
                                                             ('The Egyptian pyramids are fascinating.', 2, 3),
                                                             ('I love using mixed media in my artworks.', 3, 1);

-- Insertion des données dans la table `userstags`
INSERT INTO `userstags` (`Id_Tag`, `Id_User`) VALUES
                                                  (1, 2),
                                                  (2, 3),
                                                  (3, 4),
                                                  (4, 1),
                                                  (5, 3);

-- Insertion des données dans la table `favtopics`
INSERT INTO `favtopics` (`Id_topics`, `Id_User`) VALUES
                                                     (1, 2),
                                                     (2, 3),
                                                     (3, 1);

-- Insertion des données dans la table `follow`
INSERT INTO `follow` (`Id_User1`, `Id_User2`) VALUES
                                                  (1, 2),
                                                  (2, 3),
                                                  (3, 1);

-- Insertion des données dans la table `friendship`
INSERT INTO `friendship` (`Id_User1`, `Id_User2`, `status`) VALUES
                                                                (1, 2, 'accepted'),
                                                                (2, 3, 'waiting'),
                                                                (3, 1, 'accepted');

-- Insertion des données dans la table `have`
INSERT INTO `tagstopics` (`Id_topics`, `Id_Tag`) VALUES
                                               (1, 1),
                                               (2, 5),
                                               (3, 4);

-- Insertion des données dans la table `likepost`
INSERT INTO `likepost` (`Id_Post`, `Id_User`, `Dislike`) VALUES
                                                             (1, 3, 0),
                                                             (2, 1, 0),
                                                             (3, 2, 1);

-- Insertion des données dans la table `liketopics`
INSERT INTO `liketopics` (`Id_topics`, `Id_User`, `Dislike`) VALUES
                                                                 (1, 3, 0),
                                                                 (2, 1, 0),
                                                                 (3, 2, 1);

-- Insertion des données dans la table `send`
INSERT INTO `send` (`Id_User`, `Id_Notif`) VALUES
                                               (1, 1),
                                               (2, 2),
                                               (3, 3);
