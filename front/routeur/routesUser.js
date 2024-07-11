// Importation des modules
const express = require("express");
const routeur = express.Router();
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const controllerTemplate = require("../controller/controlTemplate");
const controllerUser = require("../controller/controlTreatmentUser");

// Routes Template
routeur.get("/coder", controllerTemplate.Index);
routeur.get("/coder/login", controllerTemplate.Login);
routeur.get("/coder/accounts/password/reset/", controllerTemplate.ForgotPwd);
routeur.get("/coder/user/:name", controllerTemplate.ProfilUser);
routeur.get("/coder/profil/:name/update", controllerTemplate.UpdateProfil);

// Routes de traitement
routeur.post("/treatment/login", controllerUser.TreatmentUser.LoginTreatment);
routeur.post("/treatment/register", controllerUser.TreatmentUser.RegisterTreatment);
routeur.get("/treatment/disconnect", controllerUser.TreatmentUser.DisconnectTreatment);
routeur.get("/treatment/follow/:id", controllerUser.TreatmentUser.FollowUser)
routeur.post("/treatment/update/user", upload.single('ProfileImage') ,controllerUser.TreatmentUser.UpdateUser);
routeur.get("/treatment/add/:id/favorite", controllerUser.TreatmentUser.AddFavoritePost);
routeur.get("/treatment/remove/:id/favorite", controllerUser.TreatmentUser.RemoveFavoritePost);

// Pour que nos routes soient accessibles
module.exports = routeur;
