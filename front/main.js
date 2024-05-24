"use strict";

// Importation des modules
const express = require('express');
const app = express();
const cors = require("cors");
const forumRoutes = require("./routeur/routes");

//Reglage du serveur
app.set('view engine', 'ejs');
app.use("/public/", express.static('assets'));
app.use(cors());
app.use(forumRoutes);

//Lancement du serveur web
const port = 3000;
app.listen(port, () => console.log(`Server listening on port http://localhost:${port}/index`));