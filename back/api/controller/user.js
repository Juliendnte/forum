const crypto = require('crypto');
const user = require("../models/userModel");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const url = "http://localhost:4000/";
require("dotenv").config();



const jwtkey = process.env.JWT_KEY
const pepper = process.env.PEPPER//Difference entre pepper et salt et que le salt est dans la bdd et le pepper en local . Les deux servent a modifiée le mdp
const hashPassword = (password, salt) => {
    const hash = crypto.createHmac('sha512', salt);//Je set le hash a sha512 avec mon salt
    hash.update(password + pepper);//Je rajoute mon pepper au hashage du mdp
    const hashedPassword = hash.digest('hex');
    return {salt, hashedPassword};
};
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});


class UserController {
    static async Register(req, res) {
        const { username, email, password } = req.body;
        if (!isValidEmail(email)){
            res.status(401).send({
                message: 'Email invalid',
                status: 401
            })
            return
        }else if (!username){
            res.status(401).send({
                message: 'Username invalid',
                status: 401
            })
        }
        const Password  = hashPassword(password, crypto.randomBytes(16).toString('hex'));//hash mon password
        try{
            await user.register({username, email, Password});
            res.status(201).send({
                message : `User registered successfully`,
                status: 201
            })
        }catch (err){
            res.status(500).send({
                message:err,
                status:500
            })
        }
    }

    static async Login(req, res) {
        const { email, username , password ,remember} = req.body;
        try{
            let utilisateur
            if (isValidEmail(email))
                utilisateur = await user.login(email);
            else if (username)
                utilisateur = await user.login(null,username);
            else{
                return res.status(401).send({
                    message:`Invalid username, email or password`,
                    status: 401
                });
            }
            if (!utilisateur){
                return res.status(401).send({
                    message:`Invalid username, email or password`,
                    status: 401
                });
            }
            const hashedPassword = hashPassword(password, utilisateur.Salt);//Récupere le password hashé
            if (hashedPassword.hashedPassword === utilisateur.Password) {//Test s'il est egale au password de l'utilisateur a l'email donné par l'utilisateur
                const Token = jwt.sign({ Sub: utilisateur.Id , IsAdmin: utilisateur.Role === 1, IsModo: utilisateur.Role === 2}, jwtkey, { expiresIn: remember ? '365d':'24h' });//Me passe un token pendant 24h et le régle avec le jwtkey
                res.status(200).send({ Token });//Je renvoie un nouveau token a chaque login
            } else {
                return res.status(401).send({
                    message:`Invalid username, email or password`,
                    status: 401
                });
            }
        }catch (err){
            res.status(500).send({
                message:err,
                status:500
            });
        }
    }

    static async getUser(req, res) {
        const userId = req.params.id || req.user.Sub
        try {
            const utilisateur = await user.getUserById(userId);
            utilisateur.Path = url + "assets/" + utilisateur.Path;
            utilisateur.Tags = utilisateur.Tags.map((tag) => url + "assets/" + tag)
            utilisateur.VueEnsemble = await user.getPostMessage(userId)
            utilisateur.VueEnsemble.forEach((vue) => vue.TopicLike = vue.TopicLike === 0 ? -1 : vue.TopicLike);
            if (!utilisateur){
                res.status(404).send({
                    message: 'User not found',
                    status: 404
                })
            }else{
                res.status(200).send({
                    message: 'User successfully found',
                    status: 200,
                    utilisateur
                })
            }
        }catch (err){
            console.log(err)
            res.status(500).send({
                message : err,
                status: 500
            })
        }
    }

    static async ForgotPassword(req, res) {
        const { email } = req.body;
        try{
            const utilisateur = await user.getUserByEmail(email);
            if (!utilisateur) {
                return res.status(400).send({
                    message:'No user with that email',
                    status: 400
                });
            }
            const token = jwt.sign({ Sub: utilisateur.Id }, jwtkey, { expiresIn: '1h' });
            const resetURL = `http://localhost:3000/resetPassword?token=${token}`;

            await transporter.sendMail({
                from: process.env.EMAIL,
                to: utilisateur.Email,
                subject: '[Horo-Haven] Réinitialisation du mot de passe',
                html: `<p>Bonjour ${utilisateur.Name},</p>
                <p>Vous avez demandé à réinitialiser votre mot de passe.</p>
                <p>Cliquez sur ce <a href="${resetURL}">lien</a> pour réinitialiser votre mot de passe.</p>
                <p>Si vous n'avez pas fait cette demande, veuillez ignorer cet e-mail.</p>`
            });

            res.status(200).send({
                message: 'Password reset link has been sent to your email',
                status: 200
            });
        }catch (err){
            res.status(500).send({
                message:err,
                status:500
            });
        }
    }

    static async ResetPassword(req, res) {
        const { password } = req.body;
        try{
            const Password  = hashPassword(password, crypto.randomBytes(16).toString('hex'));//hash mon password
            await user.setPassword(Password, req.user.Sub)
            res.status(200).send({
                message : `Password updated successfully`,
                status: 200
            })
        }catch (err){
            res.status(500).send({
                message:err,
                status: 500
            })
        }
    }

    static async UploadImage (req,res){
        const filePath = req.file.path.replace('assets', '');
        const id = req.user.Sub;
        try {
            await user.updatePatchUser(id, {Path: filePath})
            res.download(filePath, (err) => {
                if (err) {
                    res.status(500).send({
                        message: err,
                        status: 500
                    })
                }
            });
        }catch (err){
            res.status(500).send({
                message: err,
                status: 500
            })
        }
    }

    static async UpdateUser(req, res){
        const id = req.user.Sub;
        const body = req.body;
        try {
            await user.updatePatchUser(id, body)
            res.status(200).send({
                message: "User successfully updated",
                status: 200
            })
        }catch (err){
            res.status(500).send({
                message: err,
                status: 500
            })
        }
    }

    static async getFriends(req, res){
        const id = req.user.Sub;
        try{
            const friends = await user.getFriends(id);
            if (friends.length !== 0){
                return res.status(404).send({
                    message: 'Vous n\'avez aucun amies',
                    status: 404
                })
            }
            res.status(200).send({
                message: 'Friends successfully got',
                status: 200,
                friends
            })
        }catch (err){
            res.status(500).send({
                message: err,
                status: 500
            })
        }
    }

    static async Search(req, res){
        const searchQuery = req.query.search
        try{
            const search = await user.search(searchQuery)
            if (search.length === 0){
                return res.status(404).send({
                    message: 'Nous n\'avons pas trouvé résultat similaire a ' + search,
                    status: 404
                })
            }
            res.status(200).send({
                message: 'Articles trouvé',
                status: 200,
                search
            })
        }catch (err){
            res.status(500).send({
                message: err,
                status: 500
            })
        }
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = UserController;