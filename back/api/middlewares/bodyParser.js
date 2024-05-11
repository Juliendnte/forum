const express = require("express");
const app = express();

//Lire le body sous format JSON
app.use(express.json());
//Lire un formulaire
app.use(express.urlencoded({ extended: true }));

module.exports = app;