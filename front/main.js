"use strict";

// Importation des modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const forumRoutes = require("./routeur/routes");

//Reglage du serveur
const app = express();
app.set("view engine", "ejs");
app.use("/public/", express.static("assets"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(forumRoutes);

//Lancement du serveur web
const port = 3000;
app.listen(port, "0.0.0.0", () =>
    console.log(`Server listening on http://localhost:${port}/index`)
);
