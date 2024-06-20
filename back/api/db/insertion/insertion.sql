-- Insertion des données dans la table `status`
INSERT INTO `status` (Label)
VALUES ('Public'),
       ('Private'),
       ('Archived');

INSERT INTO `role` (Label)
VALUES ('Admin'),
       ('Modérateur'),
       ('Utilisateur');

INSERT INTO users (Name, Email, Password, Salt, Create_at, Id_role)
VALUES ('Julien', 'julien.dante@ynov.com',
        '73baa14e7d39ae873baf5d32d7268a4dec2cce537242888b5f8654176d79cbd4f3a953334a9111bacfbf41097b79d06a06ebe72538637e31c61f18e20669e25a',
        '6c84b71877d2139b9e9ea5cf50d8417e', DEFAULT, 1),
       ('Kantin', 'kantin.fagn@ynov.com',
        'fc1b1b35c54765f3e28eac589c2a6bee23d89804c39f1e2d4dc6ddb67492411d30064114e1e02db12bf97a5260e1ea8d64287ab9d63ab4b5e3ed44df210f54ec',
        'd9014054414b8cc39318191bfdf9175', DEFAULT, 1),
       ('Arthur', 'arthur.herry@ynov.com', '7f733e2ef3f533e23ef7ee116f77621cf98c118704c9d423124a5a14eb91ea6f23465937c999364d3c582d6b3e4ddf870dabe06a868144988776932400b6e790',
        'd330d63d02467268109c2aa925e20f21', DEFAULT, 2);

-- Insertion des données dans la table `tags`
INSERT INTO `tags` (`Label`, Path)
VALUES ('c#', '/languages/Csharp-icon.png'),
       ('cpp', '/languages/C++-icon.png'),
       ('c', '/languages/C-icon.png'),
       ('css', '/languages/CSS-icon.png'),
       ('go', '/languages/GOLANG-icon.png'),
       ('html', '/languages/HTML-icon.png'),
       ('java', '/languages/JAVA-icon.png'),
       ('js', '/languages/JS-icon.png'),
       ('kotlin', '/languages/KOTLIN-icon.png'),
       ('php', '/languages/PHP-icon.png'),
       ('python', '/languages/PYTHON-icon.png'),
       ('r', '/languages/R-icon.png'),
       ('ruby', '/languages/RUBY-icon.png'),
       ('sql', '/languages/SQL-icon.png');

INSERT INTO `topics` (Title, Id_Status, Id_User)
VALUES ('Les carrousels en js', 1, 1);

INSERT INTO posts (Content, Id_topics, Id_User)
VALUES ('Faut mieux faire un carrousel en natif ou avec bibliothèque ?', 1, 1);

INSERT INTO message (Content, Id_User, Id_PostAnswer)
VALUES ('Moi je préfére faire mes carrousels avec Swiper', 2, 1);

INSERT INTO tagstopics (Id_topics, Id_Tag)
VALUES (1, 8);

INSERT INTO userstags (Id_Tag, Id_User)
VALUES (8, 1);

INSERT INTO friendship (Id_User1, Id_User2, status)
VALUES (1,2, 'friend');
