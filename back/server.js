"use strict";

//importation des modules
const app = require("./api/app");
require('dotenv').config();

//Port et nom domaine de l'api
const port = process.env.PORT || 4000;
const host = process.env.HOST || 'localhost';

//lancement de l'api
app.listen(port,host, () => console.log(`Server listening on server ${process.env.BASE_URL}`));