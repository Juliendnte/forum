//Importation des modules
const express = require("express");
const routeur = express.Router();
const controllerUser = require("../controller/user");
const validateToken = require("../middlewares/auth");

//Configuration des routes CRUD
routeur.get("/user", validateToken, controllerUser.getUsers);
routeur.get("/user/:id",validateToken , controllerUser.getUser);
routeur.post("/user",validateToken ,controllerUser.postUser);
routeur.put("/user/:id",validateToken ,controllerUser.putUser);
routeur.patch("/user/:id",validateToken ,controllerUser.patchUser);
routeur.delete("/user/:id",validateToken ,controllerUser.deleteUser);

//Exportation des routes
module.exports = routeur;