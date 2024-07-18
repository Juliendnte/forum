"use strict";

// Importation des modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');

// Reglage du serveur
const app = express();
app.set("view engine", "ejs");
app.use("/public/", express.static("assets"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Création du serveur HTTP
const server = http.createServer(app);
const io = new Server(server);

//Importation des routes
const routeUser = require("./routeur/routesUser");
app.use(routeUser);
const routePost = require("./routeur/routesPost");
app.use(routePost);
const routeTopic = require("./routeur/routesTopic");
app.use(routeTopic);
const routeMessage = require("./routeur/routesMessage");
app.use(routeMessage);
const routeAnnexe = require("./routeur/routesAnnexe");
app.use(routeAnnexe);

// Configuration de Socket.IO
io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Lancement du serveur web
const port = 3000;
server.listen(port, '0.0.0.0',() => console.log(`Server listening on port http://localhost:${port}/coder`));
