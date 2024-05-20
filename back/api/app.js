"use strict";

//Importation des modules
const express = require('express');
const cors = require("cors");
const path = require("path");

// Crée une application Express
const app = express();
app.use(cors());
app.use("/asset", express.static(path.join(__dirname,"./")));
//Lire le body
app.use(express.json());
//Lire un formulaire
app.use(express.urlencoded({ extended: true }));

//Applique une limite de requête pour toutes les routes
const rateLimit = require("./middlewares/rate-limit");
app.use(rateLimit);

const routePost = require("./routeur/postRoute");
app.use(routePost);
const routeUser = require("./routeur/userRoute");
app.use(routeUser);
const routeTopic = require("./routeur/topicRoute");
app.use(routeTopic);

module.exports = app;