// Importation des modules
const express = require("express");
const routeur = express.Router();
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const controllerTemplate = require("../controller/controlTemplate");
const controllerUser = require("../controller/controlTreatmentUser");
const controllerTopic = require("../controller/controlTreatmentTopic");
const controllerPost = require("../controller/controlTreatmentPost");
const controllerMessage = require("../controller/controlTreatmentMessage");

// Configuration des routes Users
routeur.get("/coder", controllerTemplate.Index);
routeur.get("/coder/login", controllerTemplate.Login);
routeur.get("/coder/accounts/password/reset/", controllerTemplate.ForgotPwd);
routeur.get("/coder/user/:name", controllerTemplate.ProfilUser);
routeur.get("/coder/profil/:name/update", controllerTemplate.UpdateProfil);

// Configuration des routes Topics
routeur.get("/coder/create/topic", controllerTemplate.CreateTopic);
routeur.get("/coder/t/:name", controllerTemplate.GetTopic);
routeur.get("/coder/topic/:name/update", controllerTemplate.UpdateTopic);

// Configuration des routes Posts
routeur.get("/coder/:nametopic/create/post", controllerTemplate.CreatePost);
routeur.get("/coder/p/:id", controllerTemplate.GetPost);
routeur.get("/coder/post/:id/update", controllerTemplate.UpdatePost);

// Configuration des routes Messages
routeur.get("/coder/m/:id", controllerTemplate.GetMessage);
routeur.get("/coder/message/:id/update", controllerTemplate.UpdateMessage);

// Route Traitement en rapport avec le User
routeur.post("/treatment/login", controllerUser.TreatmentUser.LoginTreatment);
routeur.post("/treatment/register", controllerUser.TreatmentUser.RegisterTreatment);
routeur.get("/treatment/disconnect", controllerUser.TreatmentUser.DisconnectTreatment);
routeur.get("/treatment/follow/:id", controllerUser.TreatmentUser.FollowUser)
routeur.post("/treatment/update/user", upload.single('ProfileImage') ,controllerUser.TreatmentUser.UpdateUser);

// Route Traitement en rapport avec les Topics
routeur.post("/treatment/createTopic", controllerTopic.CreateTopicTreatment);
routeur.post("/treatment/update/topic/:id",upload.single('ProfileImage'), controllerTopic.UpdateTopic);

// Route Traitement en rapport avec les Posts
routeur.post("/treatment/create/post", controllerPost.CreatePost)
routeur.get("/treatment/like/post/:id", controllerPost.LikePost)
routeur.get("/treatment/unlike/post/:id", controllerPost.UnLikePost)
routeur.post("/treatment/update/post/:id", controllerPost.UpdatePost)
routeur.get("/treatment/delete/post/:id", controllerPost.DeletePost)

// Route Traitment en rapport avec les Message
routeur.post("/treatment/update/message/:id", controllerMessage.UpdateMessage)

// Route Erreur
routeur.get("/coder/:err", controllerTemplate.Error)

// Pour que nos routes soient accessibles
module.exports = routeur;
