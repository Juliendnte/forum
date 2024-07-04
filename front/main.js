"use strict";

// Importation des modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const path = require("path");
const forumRoutes = path.join(__dirname, "./routeur/");
const fs = require("fs");

//Reglage du serveur
const app = express();
app.set("view engine", "ejs");
app.use("/public/", express.static("assets"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

fs.readdirSync(forumRoutes).forEach((file) => {
    const route = require(path.join(forumRoutes, file));
    app.use(route);
});

//Lancement du serveur web
const port = 3000;
app.listen(port, () => console.log(`Server listening on port http://localhost:${port}/coder`));
