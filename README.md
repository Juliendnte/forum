<h1 align="center">Welcome to CODER <img src="front/assets/images/icon/Logo.png" alt="coder" width="30" height="23"></h1>
<p>
  <a href="https://www.npmjs.com/package/forum" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/forum.svg">
  </a>
</p>


> Coder is a programming forum featuring numerous topics, posts, and messages, managed by admins and moderators to ensure smooth operation and community engagement.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
   - [Clone the Repository](#clone-the-repository)
   - [Install Dependencies](#install-dependencies)
   - [Configure Environment Variables](#configure-environment-variables)
   - [Set Up the Database](#set-up-the-database)
   - [Start the Servers](#start-the-servers)
   - [Access the Application](#access-the-application)
3. [Features](#features)
4. [Project Structure](#project-structure)
   - [Backend](#backend)
   - [Frontend](#frontend)
5. [Usage](#usage)
6. [Contributors](#contributors)
7. [Contact](#contact)
8. [User Experiences](#user-experiences)
9. [Show Your Support](#show-your-support)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [phpMyAdmin](https://www.phpmyadmin.net/)

## Installation

Follow these steps to install and set up the project:

### Clone the Repository

Clone the repository from GitHub:

```bash
git clone https://github.com/Juliendnte/forum.git
cd forum
```
### Install Dependencies

Install the necessary dependencies for the backend and frontend servers:

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

### Configure Environment Variables

In the back directory, copy the .env.example file to .env:

```bash
cp .env.example .env
```
Edit the values in the .env file with your information:

Example configuration for the backend .env:

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
## Set Up the Database

Create the database in phpMyAdmin:

> Open phpMyAdmin and create a new database named your_database_name (e.g., coderforum).

In the back directory, run the script to perform database migrations and data insertions:

```bash
cd back
npm run database
```
## Start the Servers
### Start the backend and frontend servers:

Start the backend server:

```bash
cd back
npm start
```

Start the frontend server:

```bash
cd ../front
npm start
```

### Access the Application

Open your browser and go to the following URL:

http://localhost:3000/coder

## Features

    User Management: Registration, login, and profile management.
    Forums and Discussions: Topic creation, posting discussions, and replying.
    Administration: Interface for managing forums, discussions, and users.

## Project Structure

The project is divided into two main parts:

### Backend

Technologies used: Node.js, Express.js, MySQL.
Roles: API management, authentication, and database communication.
Key dependencies:
- cors
- dotenv 
- express 
- express-rate-limit 
- jsonwebtoken 
- mysql2 
- nodemailer 
- path

Backend file structure:

```
back/
├── api/
│   ├── assets/
│   │   │...
│   ├── config/
│   │   └── authBDD.js
│   ├── controller/
│   │   │...
│   ├── middlewares/
│   │   │...
│   ├── models/
│   │   │...
│   ├── routeur/
│   │   │...
│   └── app.js
├── db/
│   ├── insertions/
│   │   │...
│   ├── migrations/
│   │   │...
│   └── init_db.js
├── node_modules/
│   │...
├── .env
├── .env.example
├── package.json
├── package-lock.json
└── server.js
```
### Frontend

Technologies used: EJS, CSS, JavaScript.
Roles: View rendering, user interactions, backend communication.
Key dependencies:

- axios 
- body-parser 
- cookie-parser 
- cors 
- express 
- ejs

Frontend file structure:

```
front/
├── assets/
│   ├── css/
│   │   │...
│   ├── font/
│   │   │...
│   ├── img/
│   │   │...
│   └── js/
│       │...
├── controller/
│   │...
├── routes/
│   │...
├── views/
│   ├── components/
│   │   │...
│   └── pages/
│       │...
├── main.js
├── package.json
└── package-lock.json
```
## Usage

Users

- Registration: Users can register by providing their name, email, and password. 
- Login: Users can log in with their email and password. 
- Profile: Users can view and update their profile information.

Forums and Discussions

-  Create a Topic: Users can create new topics. 
- Post a Discussion: Users can post discussions in the forums. 
- Reply to a Discussion: Users can reply to existing discussions.

## Contact

For any questions or suggestions, please contact:

[Email](mailto:coder.ynov@gmail.com)


## Contributors

👤 **[Julien](https://github.com/Juliendnte)**
👤 **[Kantin](https://github.com/KANTIN-FAGN)**
👤 **[Arthur](https://github.com/Shadow-sinn)**

* Website: Coder

## User Experiences

> This project has been an excellent opportunity to apply our web development skills. We worked on both frontend and backend aspects using various technologies to create a functional and interactive application. We also learned to collaborate effectively as a team, sharing ideas, solving problems, and making decisions together. We are proud of the final result and hope you enjoy our work!

## Show Your Support

Give a ⭐️ if this project helped you!

Thank you for your support!
***
