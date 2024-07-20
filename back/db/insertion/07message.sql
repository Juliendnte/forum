INSERT INTO message (Content, Id_User, Id_PostAnswer, Create_message)
VALUES
    -- Messages for post 1 in topic 1
    ('Moi je préfère faire mes carrousels avec Swiper, c\'est plus rapide et j\'ai moins de bugs.', 2, 1,
     '2024-04-14 08:53:27'),
    ('J\'aime créer mes propres carrousels car cela me permet d\'apprendre plus sur le DOM et le JavaScript.', 3, 1,
     '2024-04-14 09:15:00'),
    ('Si tu veux vraiment optimiser ton code, tu pourrais essayer de créer ton propre carrousel, mais c\'est vrai que Swiper est très pratique.',
     4, 1, '2024-04-14 10:22:45'),

-- Messages for post 2 in topic 1
    ('Je trouve que les carrousels natifs sont souvent plus légers en performance.', 5, 2, '2024-04-14 11:05:32'),
    ('Utiliser une bibliothèque comme Swiper peut vraiment accélérer le développement, surtout si tu as beaucoup de fonctionnalités à implémenter.',
     6, 2, '2024-04-14 11:35:18'),

-- Messages for post 3 in topic 1
    ('Personnellement, j\'utilise souvent Flickity, qui est aussi une bonne alternative à Swiper.', 7, 3,
     '2024-04-14 12:00:00'),
    ('Créer un carrousel personnalisé peut offrir plus de flexibilité et moins de dépendances externes.', 1, 3,
     '2024-04-14 12:25:45'),

-- Messages for post 4 in topic 1
    ('Les carrousels créés avec des bibliothèques sont souvent mieux testés et offrent plus de fonctionnalités out-of-the-box.',
     2, 4, '2024-04-14 12:50:32'),
    ('Il est parfois intéressant de comparer la performance d\'un carrousel natif et d\'un carrousel de bibliothèque dans un projet.',
     3, 4, '2024-04-14 13:15:27'),

-- Messages for post 1 in topic 2
    ('Le responsive design est crucial pour améliorer l\'expérience utilisateur sur différents appareils.', 4, 1,
     '2024-04-15 08:30:22'),
    ('Utiliser des media queries est un excellent moyen d\'assurer que votre site est responsive.', 5, 1,
     '2024-04-15 09:00:15'),

-- Messages for post 2 in topic 2
    ('Les grilles CSS et Flexbox sont aussi des outils puissants pour le responsive design.', 6, 2,
     '2024-04-15 09:30:00'),
    ('Je trouve que la mise en page mobile-first est la meilleure approche pour le responsive design.', 7, 2,
     '2024-04-15 10:00:45'),

-- Messages for post 3 in topic 2
    ('Les techniques de responsive design sont essentielles pour garantir que vos applications sont utilisables sur tous les appareils.',
     1, 3, '2024-04-15 10:30:22'),
    ('J\'utilise souvent des frameworks comme Bootstrap pour faciliter le responsive design.', 2, 3,
     '2024-04-15 11:00:00'),

-- Messages for post 4 in topic 2
    ('N\'oubliez pas d\'utiliser des images adaptatives pour un meilleur rendu sur différents écrans.', 3, 4,
     '2024-04-15 11:30:15'),
    ('Les techniques de responsive design peuvent vraiment améliorer la performance de votre site sur mobile.', 4, 4,
     '2024-04-15 12:00:00'),

-- Messages for post 1 in topic 3
    ('L\'animation CSS peut vraiment améliorer l\'expérience utilisateur si elle est utilisée avec parcimonie.', 5, 1,
     '2024-04-16 08:30:00'),
    ('Les transitions CSS sont parfaites pour des effets simples comme les survols ou les changements d\'état.', 6, 1,
     '2024-04-16 09:00:22'),
    ('Les animations CSS peuvent également être performantes si elles sont bien optimisées.', 7, 1,
     '2024-04-16 09:30:15'),

-- Messages for post 2 in topic 3
    ('Pour des animations plus complexes, je recommande d\'utiliser JavaScript avec la bibliothèque GreenSock (GSAP).',
     1, 2, '2024-04-16 10:00:00'),
    ('Les animations peuvent parfois ralentir le rendu, donc il est important d\'optimiser les performances.', 2, 2,
     '2024-04-16 10:30:00'),

-- Messages for post 3 in topic 3
    ('Je trouve que les animations en SVG offrent une grande flexibilité pour des effets graphiques.', 3, 3,
     '2024-04-16 11:00:00')
        ,
    ('Les animations devraient être testées sur plusieurs navigateurs pour assurer la compatibilité.', 4, 3,
     '2024-04-16 11:30:00'),

-- Messages for post 4 in topic 3
    ('N\'oubliez pas d\'utiliser des animations qui améliorent l\'utilisabilité et ne distraient pas.', 5, 4,
     '2024-04-16 12:00:00')
        ,
    ('Les animations CSS peuvent être facilement gérées avec des classes et des transitions.', 6, 4,
     '2024-04-16 12:30:00'),

-- Messages for post 1 in topic 4
    ('Le mode sombre peut vraiment réduire la fatigue oculaire, surtout lors de l\'utilisation nocturne.', 2, 1,
     '2024-04-17 08:30:00')
        ,
    ('Assurez-vous d\'offrir une option pour revenir au mode clair, certains utilisateurs préfèrent cette option.', 3,
     1, '2024-04-17 09:00:22'),

-- Messages for post 2 in topic 4
    ('Le mode sombre peut aussi aider à économiser la batterie sur les écrans OLED.', 4, 2, '2024-04-17 09:30:00')
        ,
    ('Pour une bonne expérience utilisateur, testez le mode sombre sur différents types d\'écrans.', 5, 2,
     '2024-04-17 10:00:15'),

-- Messages for post 3 in topic 4
    ('Je recommande d\'utiliser des variables CSS pour gérer les thèmes de couleur plus facilement.', 6, 3,
     '2024-04-17 10:30:00')
        ,
    ('Les préférences de thème peuvent être stockées dans les paramètres utilisateur pour une meilleure personnalisation.',
     7, 3, '2024-04-17 11:00:00'),

-- Messages for post 4 in topic 4
    ('Les thèmes sombres peuvent avoir un impact positif sur le taux de conversion en réduisant la fatigue.', 1, 4,
     '2024-04-17 11:30:00')
        ,
    ('Assurez-vous que le contraste est suffisant pour que le texte soit lisible dans le mode sombre.', 2, 4,
     '2024-04-17 12:00:00'),

    -- Messages for post 1 in topic 5
    ('Les validations de formulaire côté client peuvent éviter beaucoup d\'erreurs de saisie avant l\'envoi.', 2, 1,
     '2024-04-18 08:30:00'),
    ('Je trouve que l\'utilisation de bibliothèques comme Formik rend la validation plus facile à gérer.', 3, 1,
     '2024-04-18 09:00:15'),
    ('Ne négligez pas la validation côté serveur, elle est cruciale pour la sécurité des données.', 4, 1,
     '2024-04-18 09:30:00'),

-- Messages for post 2 in topic 5
    ('Les règles de validation doivent être clairement définies pour améliorer l\'expérience utilisateur.', 5, 2,
     '2024-04-18 10:00:22'),
    ('L\'utilisation de messages d\'erreur clairs aide à guider les utilisateurs pour corriger les erreurs de saisie.',
     6, 2, '2024-04-18 10:30:00'),

-- Messages for post 3 in topic 5
    ('Je recommande d\'utiliser des tests automatisés pour vérifier les validations de formulaire.', 7, 3,
     '2024-04-18 11:00:00'),
    ('Les validations doivent être testées dans différents scénarios pour garantir leur fiabilité.', 1, 3,
     '2024-04-18 11:30:00'),

-- Messages for post 4 in topic 5
    ('La validation des formulaires peut aider à éviter des erreurs courantes comme les adresses email invalides.', 2,
     4, '2024-04-18 12:00:00'),
    ('Assurez-vous d\'utiliser des validations en temps réel pour une meilleure expérience utilisateur.', 3, 4,
     '2024-04-18 12:30:00'),

-- Messages for post 1 in topic 6
    ('L\'intégration d\'API peut grandement améliorer la fonctionnalité de votre application.', 4, 1,
     '2024-04-19 08:30:00'),
    ('Je trouve que l\'utilisation de bibliothèques comme Axios facilite les appels API.', 5, 1, '2024-04-19 09:00:22'),
    ('Assurez-vous de gérer les erreurs d\'API pour une meilleure expérience utilisateur.', 6, 1,
     '2024-04-19 09:30:00'),

-- Messages for post 2 in topic 6
    ('Les API REST sont souvent plus simples à utiliser que les API GraphQL, surtout pour les débutants.', 7, 2,
     '2024-04-19 10:00:00'),
    ('Il est important de bien documenter vos API pour faciliter leur utilisation par d\'autres développeurs.', 1, 2,
     '2024-04-19 10:30:15'),

-- Messages for post 3 in topic 6
    ('L\'authentification via des tokens est une bonne pratique pour sécuriser les appels API.', 2, 3,
     '2024-04-19 11:00:00'),
    ('Les tests d\'API sont cruciaux pour garantir que les endpoints fonctionnent correctement.', 3, 3,
     '2024-04-19 11:30:00'),

-- Messages for post 4 in topic 6
    ('L\'utilisation des services d\'API en arrière-plan peut améliorer les performances de votre application.', 4, 4,
     '2024-04-19 12:00:00'),
    ('Il est souvent utile d\'implémenter un cache pour les réponses d\'API afin de réduire le nombre d\'appels.', 5, 4,
     '2024-04-19 12:30:00'),

-- Messages for post 1 in topic 7
    ('Les applications à page unique peuvent offrir une expérience utilisateur plus fluide.', 6, 1,
     '2024-04-20 08:30:00'),
    ('Je trouve que l\'utilisation de React Router facilite la gestion des routes dans une SPA.', 7, 1,
     '2024-04-20 09:00:22'),
    ('Les SPA peuvent parfois être plus difficiles à optimiser pour le référencement.', 1, 1, '2024-04-20 09:30:00'),

-- Messages for post 2 in topic 7
    ('L\'utilisation de la technique de chargement paresseux (lazy loading) peut améliorer les performances des SPA.',
     2, 2, '2024-04-20 10:00:00'),
    ('Les SPA doivent souvent gérer les états de chargement et les erreurs pour une meilleure expérience utilisateur.',
     3, 2, '2024-04-20 10:30:00'),

-- Messages for post 3 in topic 7
    ('Pour les SPA, il est crucial d\'optimiser la gestion des états avec des bibliothèques comme Redux.', 4, 3,
     '2024-04-20 11:00:00'),
    ('L\'utilisation de services d\'API asynchrones est courante dans les SPA pour gérer les données.', 5, 3,
     '2024-04-20 11:30:00'),

-- Messages for post 4 in topic 7
    ('Les SPA peuvent améliorer les performances perçues grâce à la gestion côté client du routage.', 6, 4,
     '2024-04-20 12:00:00'),
    ('Assurez-vous que vos SPA sont accessibles et testées pour divers navigateurs et appareils.', 7, 4,
     '2024-04-20 12:30:00'),

-- Messages for post 1 in topic 8
    ('Les Progressive Web Apps (PWA) peuvent offrir une expérience utilisateur semblable à celle des applications natives.',
     2, 1, '2024-04-21 08:30:00'),
    ('Les PWAs permettent aux utilisateurs de travailler hors ligne, ce qui est un gros avantage.', 3, 1,
     '2024-04-21 09:00:15'),
    ('L\'utilisation de service workers est cruciale pour les fonctionnalités hors ligne des PWAs.', 4, 1,
     '2024-04-21 09:30:00'),

-- Messages for post 2 in topic 8
    ('Assurez-vous que votre PWA est rapide et réactive pour offrir une bonne expérience utilisateur.', 5, 2,
     '2024-04-21 10:00:22'),
    ('Les PWAs peuvent être ajoutées à l\'écran d\'accueil des utilisateurs, offrant une expérience similaire à une application native.',
     6, 2, '2024-04-21 10:30:00'),

-- Messages for post 3 in topic 8
    ('Il est important de tester les PWAs sur différents navigateurs et appareils pour garantir leur bon fonctionnement.',
     7, 3, '2024-04-21 11:00:00'),
    ('Les PWAs utilisent des manifestes pour définir comment l\'application doit se comporter lorsqu\'elle est ajoutée à l\'écran d\'accueil.',
     1, 3, '2024-04-21 11:30:00'),

-- Messages for post 4 in topic 8
    ('Les notifications push sont une fonctionnalité puissante des PWAs qui peuvent aider à engager les utilisateurs.',
     2, 4, '2024-04-21 12:00:00'),
    ('Les PWAs doivent être conçues en tenant compte des performances pour garantir une expérience fluide.', 3, 4,
     '2024-04-21 12:30:00'),

-- Messages for post 1 in topic 9
    ('Le rendu côté serveur (SSR) peut améliorer les temps de chargement initiaux et le SEO.', 4, 1,
     '2024-04-22 08:30:00'),
    ('Utiliser Next.js est une excellente option pour les applications React avec SSR.', 5, 1, '2024-04-22 09:00:22'),
    ('Le SSR peut introduire des complexités supplémentaires dans la gestion des états de l\'application.', 6, 1,
     '2024-04-22 09:30:00'),

-- Messages for post 2 in topic 9
    ('Assurez-vous de bien gérer le cache pour améliorer les performances avec SSR.', 7, 2, '2024-04-22 10:00:00'),
    ('Le SSR est souvent combiné avec le rendu côté client pour une meilleure expérience utilisateur.', 1, 2,
     '2024-04-22 10:30:00'),

-- Messages for post 3 in topic 9
    ('L\'optimisation des temps de réponse côté serveur est essentielle pour le SSR.', 2, 3, '2024-04-22 11:00:00'),
    ('Les frameworks SSR peuvent aider à gérer les différences entre le rendu côté client et côté serveur.', 3, 3,
     '2024-04-22 11:30:00'),

-- Messages for post 4 in topic 9
    ('Le rendu côté serveur peut améliorer l\'indexation par les moteurs de recherche en fournissant un contenu prêt à l\'emploi.',
     4, 4, '2024-04-22 12:00:00'),
    ('Assurez-vous que votre application SSR est bien configurée pour éviter les erreurs de rendu.', 5, 4,
     '2024-04-22 12:30:00'),

-- Messages for post 1 in topic 10
    ('Le chargement paresseux des images peut améliorer considérablement les temps de chargement de la page.', 6, 1,
     '2024-04-23 08:30:00'),
    ('Je recommande d\'utiliser le lazy loading pour les images qui ne sont pas immédiatement visibles.', 7, 1,
     '2024-04-23 09:00:22'),
    ('Assurez-vous que le lazy loading n\'affecte pas l\'accessibilité de votre site.', 1, 1, '2024-04-23 09:30:00'),

-- Messages for post 2 in topic 10
    ('Le lazy loading est souvent intégré dans les frameworks modernes pour améliorer les performances.', 2, 2,
     '2024-04-23 10:00:00'),
    ('Les images de haute qualité devraient être optimisées pour un meilleur rendu et des temps de chargement réduits.',
     3, 2, '2024-04-23 10:30:00'),

-- Messages for post 3 in topic 10
    ('Le lazy loading peut aider à réduire la consommation de bande passante pour les utilisateurs.', 4, 3,
     '2024-04-23 11:00:00'),
    ('Il est important de tester le lazy loading sur différents navigateurs pour s\'assurer de sa compatibilité.', 5, 3,
     '2024-04-23 11:30:00'),

-- Messages for post 4 in topic 10
    ('Les images doivent être servies dans des formats modernes pour une meilleure performance avec le lazy loading.',
     6, 4, '2024-04-23 12:00:00'),
    ('Assurez-vous que les images sont dimensionnées correctement pour éviter des recharges inutiles.', 7, 4,
     '2024-04-23 12:30:00'),

-- Messages for post 1 in topic 11
    ('Les WebSockets sont excellents pour les applications en temps réel comme les chats ou les jeux.', 2, 1,
     '2024-04-24 08:30:00'),
    ('L\'utilisation des WebSockets peut réduire le besoin de polling et améliorer les performances.', 3, 1,
     '2024-04-24 09:00:15'),
    ('Assurez-vous de gérer correctement les connexions et les déconnexions pour éviter les fuites de mémoire.', 4, 1,
     '2024-04-24 09:30:00'),

-- Messages for post 2 in topic 11
    ('Les WebSockets nécessitent un support côté serveur, assurez-vous que votre backend est configuré pour cela.', 5,
     2, '2024-04-24 10:00:22'),
    ('Il est important de sécuriser les connexions WebSocket pour éviter les vulnérabilités.', 6, 2,
     '2024-04-24 10:30:00'),

-- Messages for post 3 in topic 11
    ('Les WebSockets peuvent être utilisés pour synchroniser les données en temps réel entre les clients.', 7, 3,
     '2024-04-24 11:00:00'),
    ('Assurez-vous que les messages WebSocket sont correctement formatés pour éviter les erreurs de communication.', 1,
     3, '2024-04-24 11:30:00'),

-- Messages for post 4 in topic 11
    ('Les WebSockets peuvent améliorer les interactions en temps réel sur les plateformes sociales.', 2, 4,
     '2024-04-24 12:00:00'),
    ('Assurez-vous de bien gérer les erreurs de connexion et les tentatives de reconnexion.', 3, 4,
     '2024-04-24 12:30:00'),

-- Messages for post 1 in topic 12
    ('La gestion de contenu est cruciale pour les sites dynamiques qui nécessitent des mises à jour fréquentes.', 4, 1,
     '2024-04-25 08:30:00'),
    ('Je trouve que l\'utilisation d\'un CMS comme WordPress simplifie la gestion de contenu.', 5, 1,
     '2024-04-25 09:00:22'),
    ('Assurez-vous que votre système de gestion de contenu est bien sécurisé contre les attaques.', 6, 1,
     '2024-04-25 09:30:00'),

-- Messages for post 2 in topic 12
    ('Les systèmes de gestion de contenu peuvent offrir des fonctionnalités de gestion des utilisateurs pour un meilleur contrôle.',
     7, 2, '2024-04-25 10:00:00'),
    ('Assurez-vous de tester régulièrement votre système de gestion de contenu pour éviter les problèmes de performance.',
     1, 2, '2024-04-25 10:30:00'),

-- Messages for post 3 in topic 12
    ('Les fonctionnalités de gestion des médias dans les CMS peuvent simplifier le travail avec les images et les vidéos.',
     2, 3, '2024-04-25 11:00:00'),
    ('La mise en place d\'un système de sauvegarde est essentielle pour protéger votre contenu.', 3, 3,
     '2024-04-25 11:30:00'),

-- Messages for post 4 in topic 12
    ('L\'utilisation de balises sémantiques dans les systèmes de gestion de contenu peut améliorer le SEO.', 4, 4,
     '2024-04-25 12:00:00'),
    ('Il est important d\'offrir des outils d\'édition conviviaux pour les utilisateurs non techniques.', 5, 4,
     '2024-04-25 12:30:00'),

-- Messages for post 1 in topic 13
    ('L\'optimisation pour les moteurs de recherche est cruciale pour améliorer la visibilité en ligne.', 6, 1,
     '2024-04-26 08:30:00'),
    ('Je trouve que l\'utilisation d\'outils comme Google Search Console est très utile pour le SEO.', 7, 1,
     '2024-04-26 09:00:22'),
    ('Assurez-vous que votre site utilise des mots-clés pertinents pour attirer le bon public.', 1, 1,
     '2024-04-26 09:30:00'),

-- Messages for post 2 in topic 13
    ('L\'optimisation des balises méta peut aider à améliorer les taux de clics dans les résultats de recherche.', 2, 2,
     '2024-04-26 10:00:00'),
    ('Les backlinks de qualité peuvent également améliorer le classement dans les moteurs de recherche.', 3, 2,
     '2024-04-26 10:30:00'),

-- Messages for post 3 in topic 13
    ('L\'analyse des performances SEO peut fournir des informations utiles pour les ajustements.', 4, 3,
     '2024-04-26 11:00:00'),
    ('L\'utilisation des données structurées peut aider les moteurs de recherche à comprendre le contenu de votre site.',
     5, 3, '2024-04-26 11:30:00'),

-- Messages for post 4 in topic 13
    ('Les audits SEO réguliers peuvent aider à identifier et à corriger les problèmes de performance.', 6, 4,
     '2024-04-26 12:00:00'),
    ('Assurez-vous que votre site est optimisé pour les appareils mobiles, car cela affecte le SEO.', 7, 4,
     '2024-04-26 12:30:00'),

-- Messages for post 1 in topic 14
    ('L\'accessibilité web est essentielle pour garantir que tous les utilisateurs peuvent accéder à votre contenu.', 2,
     1, '2024-04-27 08:30:00'),
    ('L\'utilisation des attributs ARIA peut aider à améliorer l\'accessibilité pour les technologies d\'assistance.',
     3, 1, '2024-04-27 09:00:22'),
    ('Assurez-vous que les contrastes de couleur sont suffisants pour les utilisateurs malvoyants.', 4, 1,
     '2024-04-27 09:30:00'),

-- Messages for post 2 in topic 14
    ('Les tests d\'accessibilité peuvent vous aider à identifier et corriger les problèmes potentiels.', 5, 2,
     '2024-04-27 10:00:00'),
    ('Il est important d\'inclure des descriptions alternatives pour les images afin d\'aider les utilisateurs avec des déficiences visuelles.',
     6, 2, '2024-04-27 10:30:00'),

-- Messages for post 3 in topic 14
    ('Les formulaires doivent être accessibles et faciles à utiliser pour tous les utilisateurs.', 7, 3,
     '2024-04-27 11:00:00'),
    ('L\'accessibilité est non seulement une question de conformité, mais aussi de meilleure expérience utilisateur.',
     1, 3, '2024-04-27 11:30:00'),

-- Messages for post 4 in topic 14
    ('L\'utilisation de textes alternatifs descriptifs est cruciale pour les utilisateurs de lecteurs d\'écran.', 2, 4,
     '2024-04-27 12:00:00'),
    ('Les tests de contraste de couleur peuvent aider à s\'assurer que votre contenu est lisible pour tous.', 3, 4,
     '2024-04-27 12:30:00'),

    -- Messages for post 1 in topic 15
    ('Les microservices permettent une meilleure scalabilité en décomposant les applications en services indépendants.',
     3, 1, '2024-04-28 08:30:00'),
    ('L\'architecture basée sur les microservices peut améliorer la résilience en isolant les pannes.', 4, 1,
     '2024-04-28 09:00:00'),
    ('Il est important de bien gérer la communication entre les microservices pour éviter des problèmes de performance.',
     5, 1, '2024-04-28 09:30:00'),

-- Messages for post 2 in topic 15
    ('L\'utilisation de conteneurs comme Docker facilite le déploiement des microservices.', 6, 2,
     '2024-04-28 10:00:00'),
    ('La gestion des versions et des configurations est cruciale pour les microservices.', 7, 2, '2024-04-28 10:30:00'),

-- Messages for post 3 in topic 15
    ('Les microservices peuvent être développés et déployés indépendamment, ce qui accélère le cycle de développement.',
     1, 3, '2024-04-28 11:00:00'),
    ('Il est essentiel de mettre en place des tests automatisés pour chaque microservice.', 2, 3,
     '2024-04-28 11:30:00'),

-- Messages for post 4 in topic 15
    ('La gestion des transactions distribuées peut être complexe dans une architecture de microservices.', 3, 4,
     '2024-04-28 12:00:00'),
    ('L\'utilisation d\'outils de surveillance et de logging est importante pour le débogage des microservices.', 4, 4,
     '2024-04-28 12:30:00'),

    -- Messages for post 1 in topic 16
    ('Le test unitaire est essentiel pour s’assurer que chaque composant individuel fonctionne correctement.', 1, 1,
     '2024-04-29 08:30:00'),
    ('Les tests unitaires peuvent aider à détecter les bugs tôt dans le cycle de développement.', 2, 1,
     '2024-04-29 09:00:00'),
    ('Utiliser des frameworks de test comme JUnit ou NUnit peut simplifier l’écriture des tests unitaires.', 3, 1,
     '2024-04-29 09:30:00'),

-- Messages for post 2 in topic 16
    ('Les mocks et les stubs sont des outils utiles pour isoler les composants pendant les tests unitaires.', 4, 2,
     '2024-04-29 10:00:00'),
    ('Il est important de maintenir une bonne couverture de code avec les tests unitaires.', 5, 2,
     '2024-04-29 10:30:00'),

-- Messages for post 3 in topic 16
    ('Les tests unitaires doivent être rapides et fiables pour être efficaces.', 6, 3, '2024-04-29 11:00:00'),
    ('Les tests doivent être automatisés pour s’assurer qu’ils sont exécutés régulièrement.', 7, 3,
     '2024-04-29 11:30:00'),

-- Messages for post 4 in topic 16
    ('Les tests unitaires peuvent aider à documenter le comportement attendu des composants.', 1, 4,
     '2024-04-29 12:00:00'),
    ('Intégrer les tests unitaires dans votre pipeline CI/CD peut améliorer la qualité du code.', 2, 4,
     '2024-04-29 12:30:00'),

    -- Messages for post 1 in topic 17
    ('Les tests de bout en bout permettent de vérifier que l’application fonctionne comme prévu du début à la fin.', 2,
     1, '2024-04-30 08:30:00'),
    ('Les tests end-to-end peuvent détecter des problèmes d’intégration entre différents composants de l’application.',
     3, 1, '2024-04-30 09:00:00'),
    ('Utiliser des outils comme Selenium ou Cypress peut faciliter l’automatisation des tests de bout en bout.', 4, 1,
     '2024-04-30 09:30:00'),

-- Messages for post 2 in topic 17
    ('Les tests de bout en bout doivent couvrir les scénarios d’utilisation les plus critiques pour l’application.', 5,
     2, '2024-04-30 10:00:00'),
    ('Assurez-vous que les tests end-to-end sont robustes et peuvent gérer les changements dans l’application.', 6, 2,
     '2024-04-30 10:30:00'),

-- Messages for post 3 in topic 17
    ('Les tests de bout en bout peuvent être plus lents que les tests unitaires, donc il est important de les exécuter de manière judicieuse.',
     7, 3, '2024-04-30 11:00:00'),
    ('Les tests end-to-end doivent être maintenus à jour pour refléter les évolutions de l’application.', 1, 3,
     '2024-04-30 11:30:00'),

-- Messages for post 4 in topic 17
    ('L’intégration des tests de bout en bout dans votre pipeline CI/CD peut aider à détecter les régressions avant la mise en production.',
     2, 4, '2024-04-30 12:00:00'),
    ('Les tests end-to-end doivent être bien documentés pour faciliter leur maintenance et leur compréhension.', 3, 4,
     '2024-04-30 12:30:00'),

    -- Messages for post 1 in topic 18
    ('Une bonne conception de base de données commence par l’identification des entités et des relations entre elles.',
     4, 1, '2024-05-01 08:30:00'),
    ('L’utilisation de schémas normalisés peut aider à éviter la redondance des données et à améliorer l’intégrité.', 5,
     1, '2024-05-01 09:00:00'),
    ('Il est crucial de choisir les types de données appropriés pour chaque colonne pour optimiser les performances.',
     6, 1, '2024-05-01 09:30:00'),

-- Messages for post 2 in topic 18
    ('Les index peuvent améliorer les performances des requêtes, mais leur utilisation doit être équilibrée pour éviter des pénalités sur les écritures.',
     7, 2, '2024-05-01 10:00:00'),
    ('La conception des clés étrangères et des clés primaires doit être bien pensée pour maintenir la cohérence des données.',
     1, 2, '2024-05-01 10:30:00'),

-- Messages for post 3 in topic 18
    ('Il est important de mettre en place des stratégies de sauvegarde et de récupération pour protéger les données.',
     2, 3, '2024-05-01 11:00:00'),
    ('Les schémas de base de données doivent être évolutifs pour s’adapter aux futurs besoins de l’application.', 3, 3,
     '2024-05-01 11:30:00'),

-- Messages for post 4 in topic 18
    ('L’utilisation de vues et de procédures stockées peut aider à encapsuler la logique métier dans la base de données.',
     4, 4, '2024-05-01 12:00:00'),
    ('Il est essentiel de surveiller les performances des requêtes et d’optimiser les requêtes lentes.', 5, 4,
     '2024-05-01 12:30:00'),

-- Messages for post 1 in topic 19
    ('Le contrôle de version permet de suivre les modifications du code source et de collaborer efficacement.', 2, 1,
     '2024-05-02 08:30:00'),
    ('Utiliser Git pour le contrôle de version est une pratique courante qui facilite la gestion des branches et des merges.',
     3, 1, '2024-05-02 09:00:00'),
    ('Les commits fréquents et descriptifs aident à maintenir un historique clair des modifications.', 4, 1,
     '2024-05-02 09:30:00'),

-- Messages for post 2 in topic 19
    ('Les branches permettent de développer des fonctionnalités en parallèle sans perturber le code principal.', 5, 2,
     '2024-05-02 10:00:00'),
    ('Les pull requests facilitent la revue de code et l’intégration des modifications dans la branche principale.', 6,
     2, '2024-05-02 10:30:00'),

-- Messages for post 3 in topic 19
    ('Il est important de résoudre les conflits de merge rapidement pour éviter des problèmes dans le code.', 7, 3,
     '2024-05-02 11:00:00'),
    ('Les tags peuvent être utilisés pour marquer des versions importantes de votre code.', 1, 3,
     '2024-05-02 11:30:00'),

-- Messages for post 4 in topic 19
    ('Les outils de gestion de version tels que GitHub et GitLab offrent des fonctionnalités supplémentaires comme la gestion des issues et des projets.',
     2, 4, '2024-05-02 12:00:00'),
    ('L’intégration continue avec des systèmes de contrôle de version peut améliorer la qualité du code.', 3, 4,
     '2024-05-02 12:30:00'),

-- Messages for post 1 in topic 20
    ('La modélisation de données est essentielle pour une conception efficace des bases de données.', 4, 1,
     '2024-05-03 08:30:00'),
    ('L’utilisation de diagrammes ER (Entité-Relation) peut aider à visualiser la structure de la base de données.', 5,
     1, '2024-05-03 09:00:00'),
    ('Les contraintes d’intégrité doivent être définies pour maintenir la cohérence des données.', 6, 1,
     '2024-05-03 09:30:00'),

-- Messages for post 2 in topic 20
    ('Les opérations de jointure peuvent être utilisées pour combiner les données de plusieurs tables.', 7, 2,
     '2024-05-03 10:00:00'),
    ('Les transactions sont importantes pour garantir la cohérence des opérations de base de données.', 1, 2,
     '2024-05-03 10:30:00'),

-- Messages for post 3 in topic 20
    ('La normalisation aide à réduire la redondance des données et à améliorer l’intégrité.', 2, 3,
     '2024-05-03 11:00:00'),
    ('Les bases de données NoSQL peuvent être une bonne alternative pour des modèles de données non relationnels.', 3,
     3, '2024-05-03 11:30:00'),

-- Messages for post 4 in topic 20
    ('L’analyse des performances de la base de données est cruciale pour maintenir une bonne réactivité.', 4, 4,
     '2024-05-03 12:00:00'),
    ('Les bases de données en mémoire peuvent améliorer les temps de réponse pour des opérations fréquentes.', 5, 4,
     '2024-05-03 12:30:00'),

-- Messages for post 1 in topic 21
    ('Le rendu côté serveur (SSR) peut améliorer le temps de chargement initial de la page.', 2, 1,
     '2024-05-04 08:30:00'),
    ('SSR est utile pour le SEO car le contenu est visible pour les moteurs de recherche dès le chargement de la page.',
     3, 1, '2024-05-04 09:00:00'),
    ('L’utilisation de frameworks comme Next.js ou Nuxt.js peut simplifier l’implémentation du SSR.', 4, 1,
     '2024-05-04 09:30:00'),

-- Messages for post 2 in topic 21
    ('Le SSR peut être plus complexe à mettre en œuvre que le rendu côté client, en raison de la gestion des états et des données.',
     5, 2, '2024-05-04 10:00:00'),
    ('Assurez-vous que votre serveur est optimisé pour gérer les demandes de rendu côté serveur.', 6, 2,
     '2024-05-04 10:30:00'),

-- Messages for post 3 in topic 21
    ('Les pages rendues côté serveur peuvent améliorer l’expérience utilisateur sur des réseaux lents ou instables.', 7,
     3, '2024-05-04 11:00:00'),
    ('Le rendu côté serveur peut réduire la charge initiale sur le client, permettant un rendu plus rapide.', 1, 3,
     '2024-05-04 11:30:00'),

-- Messages for post 4 in topic 21
    ('Il est important de gérer correctement les états entre le rendu côté serveur et le client pour éviter les incohérences.',
     2, 4, '2024-05-04 12:00:00'),
    ('Le SSR peut être combiné avec des techniques de rendu côté client pour optimiser les performances.', 3, 4,
     '2024-05-04 12:30:00');



