<h1 align="center">Welcome to CODER 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/forum" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/forum.svg">
  </a>
</p>

> Coder is a programation forum with a lot of topics, posts, messages with admin or modo to administrate the website

## Sommaire
1. [Prérequis](#prérequis)
2. [Installation](#install)
   - [Cloner le dépôt](#cloner-le-dépôt)
    - [Installer les dépendances](#installer-les-dépendances)
   - [Configurer les variables d'environnement](#configurer-les-variables-denvironnement)
   - [Configurer la base de données](#configurer-la-base-de-données)
   - [Démarrer les serveurs](#démarrer-les-serveurs)
   - [Accéder à l'application](#accéder-à-lapplication)
3. [Fonctionnalités](#fonctionnalités)
4. [Structure du projet](#structure-du-projet)
   - [Backend](#backend)
    - [Frontend](#frontend)
5. [Utilisation](#usage)
6. [Contributeurs](#author)
7. [Contact](#contact)
8. [Retours d'expérience](#retours-dexpérience)

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/)
- [phpMyAdmin](https://www.phpmyadmin.net/)

## Install

Suivez ces étapes pour installer et configurer le projet :

### Cloner le dépôt

Clonez le dépôt depuis GitHub :

```bash
git clone https://github.com/Juliendnte/forum.git
cd forum
```
### Installer les dépendances

Installez les dépendances nécessaires pour les serveurs backend et frontend :

**Backend**

```bash
cd back
npm i
```
**Frontend**

```bash
cd ../front
npm i
```

## Configurer les variables d'environnement

Dans le dossier back, copiez le fichier .env.example et renommez-le .env :

```bash
cp .env.example .env
```
Modifiez les valeurs dans le fichier .env avec vos informations :

Exemple de configuration .env pour le backend :

```dotenv
DB_HOST='localhost'
DB_USER='your_user'
DB_PASSWORD='your_pwd'
DB_DATABASE='your_database_name'

HOST='localhost'
BASE_URL='http://localhost:4000'
JWT_KEY='sVF2EEvjLdmomvwWosxEQ2wtpOFVQjQvLCirLECUFjwruHQ19vzOtUMLp3zY8VW7'
PEPPER='quoicoubeh'
PORT=4000
EMAIL='coder.ynov@gmail.com'
PASSWORD='dpwc kjua blct kqtz'
```
## Configurer la base de données

Créez la base de données dans phpMyAdmin :

>    Ouvrez phpMyAdmin et créez une nouvelle base de données nommée your_database_name (ex: coderforum).


Dans le dossier back, exécutez le script pour effectuer les migrations et insertions de données :

```bash
cd back
npm run database
```
## Démarrer les serveurs

### Démarrez les serveurs backend et frontend :

Démarrer le serveur backend :

```bash
cd back
npm start
```
Démarrer le serveur frontend :

```bash
cd ../front
npm start
```

### Accéder à l'application

Ouvrez votre navigateur et accédez à l'URL suivante :

http://localhost:3000/coder

## Fonctionnalités

- Gestion des utilisateurs : Inscription, connexion et gestion des profils utilisateur.
-  Forums et discussions : Création de forums, publication de discussions et réponses. 
- Administration : Interface pour gérer les forums, discussions et utilisateurs.

## Structure du projet

Le projet est divisé en deux parties principales :

### Backend

Technologies utilisées : Node.js, Express.js, MySQL. 
Rôles : Gestion des API, authentification, communication avec la base de données. 
Dépendances clés :
 - cors 
 - dotenv
 - express
 - express-rate-limit 
 - jsonwebtoken 
 - mysql2 
 - nodemailer 
 - path

Arborescence des fichiers du backend :

```
back/
├── api/
│   ├── config/
│   │   └── authBDD.js
│   ├── controller/
│   │   ├── forum.js
│   │   └── user.js
│   ├── middlewares/
│   │   ├── forumExist.js
│   │   ├── auth.js
│   │   └── rate-limit.js
│   ├── models/
│   │   ├── forumModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── forumRoute.js
│   │   └── userRoute.js
│   └── scriptSQL/
│       ├── insertion/
│       │   └── insertion.sql
│       └── migration/
│           └── migration.sql
├── node_modules/
│   │...
├── .env
├── .env.example
├── package.json
├── package-lock.json
└── server.js
```
### Frontend

Technologies utilisées : EJS, CSS, JavaScript. 
Rôles : Rendu des vues, interactions utilisateur, communication avec le backend. 
Dépendances clés :
- axios 
- body-parser 
- cookie-parser 
- cors 
- express 
- ejs

Arborescence des fichiers du frontend :

```
front/
├── assets/
│   ├── css/
│   │   │...
│   ├── font/
│   │   │...
│   ├── img/
│   │   │...
│   ├── js/
│   │   │...
│   └── video/
│       │...
├── controller/
│   ├── control.js
│   └── errorHandle.js
├── routes/
│   └── route.js
├── views/
│   ├── partials/
│   │   │...
│   └── index.ejs
│       │...
├── main.js
├── package.json
└── package-lock.json
```
## Usage

Utilisateurs

- Inscription : Les utilisateurs peuvent s'inscrire en fournissant leur nom, email et mot de passe.
- Connexion : Les utilisateurs peuvent se connecter avec leur email et mot de passe.
- Profil : Les utilisateurs peuvent consulter et mettre à jour leurs informations de profil.

Forums et Discussions
 
- Créer un forum : Les utilisateurs peuvent créer de nouveaux forums. 
- Publier une discussion : Les utilisateurs peuvent publier des discussions dans les forums.
- Répondre à une discussion : Les utilisateurs peuvent répondre aux discussions existantes.

## Contact

Pour toute question ou suggestion, veuillez contacter :

[Email](mailto:coder.ynov@gmail.com)


## Author

👤 **[Julien](https://github.com/Juliendnte)**
👤 **[Kantin](https://github.com/KANTIN-FAGN)**
👤 **[Arthur](https://github.com/Shadow-sinn)**

* Website: Coder

## Show your support

Give a ⭐️ if this project helped you!

Thank you for your support!
***
