//Importation des modules
const express = require('express');
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// Crée une application Express
const app = express();

//Appel des routes automatisé
const forumRoutes = path.join(__dirname,"./routeur/");
fs.readdirSync(forumRoutes).forEach((file) => {
    const route = require(path.join(forumRoutes, file));
    app.use(route);
})

app.use(cors());
app.use("/asset", express.static(path.join(__dirname,"../")));

module.exports = app;