const crypto = require('crypto');
const user = require("../models/userModel");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const url = "http://localhost:4000/";
require("dotenv").config();


const jwtkey = process.env.JWT_KEY
const pepper = process.env.PEPPER//Difference entre pepper et salt et que le salt est dans la bdd et le pepper en local . Les deux servent a modifiée le mdp
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

/**
 * Helper function to hash password
 * @param {string} password - The password to be hashed.
 * @param {string} salt - The salt to be used in hashing.
 * @returns {Object} - The salt and hashed password.
 */
const hashPassword = (password, salt) => {
    const hash = crypto.createHmac('sha512', salt);//Je set le hash a sha512 avec mon salt
    hash.update(password + pepper);//Je rajoute mon pepper au hashage du mdp
    const hashedPassword = hash.digest('hex');
    return {salt, hashedPassword};
};

/**
 * Helper function to validate email
 * @param {string} email - The email to be validated.
 * @returns {boolean} - The validation result.
 */
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

class UserController {

    /**
     * Register a new user
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async Register(req, res) {
        const {username, email, password} = req.body;
        if (!isValidEmail(email)) {
            return res.status(401).send({
                message: 'Email invalid',
                status: 401
            })
        } else if (!username) {
            return res.status(401).send({
                message: 'Username invalid',
                status: 401
            })
        }
        const Password = hashPassword(password, crypto.randomBytes(16).toString('hex'));//hash mon password
        try {
            await user.register({username, email, Password});
            res.status(201).send({
                message: `User registered successfully`,
                status: 201
            })
        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            });
        }
    }

    static async Login(req, res) {
        const {email, username, password, remember} = req.body;
        try {
            let utilisateur
            if (isValidEmail(email))
                utilisateur = await user.login(email);
            else if (username)
                utilisateur = await user.login(null, username);
            else {
                return res.status(401).send({
                    message: `Invalid username, email or password`,
                    status: 401
                });
            }
            if (!utilisateur) {
                return res.status(401).send({
                    message: `Invalid username, email or password`,
                    status: 401
                });
            }
            const hashedPassword = hashPassword(password, utilisateur.Salt);//Récupere le password hashé
            console.log(utilisateur)
            if (hashedPassword.hashedPassword === utilisateur.Password) {//Test s'il est egale au password de l'utilisateur a l'email donné par l'utilisateur
                const Token = jwt.sign({
                    Sub: utilisateur.Id,
                    IsAdmin: utilisateur.Id_role === 1,
                    IsModo: utilisateur.Id_role === 2
                }, jwtkey, {expiresIn: remember ? '365d' : '24h'});//Me passe un token pendant 24h et le régle avec le jwtkey
                res.status(200).send({Token});//Je renvoie un nouveau token a chaque login
            } else {
                return res.status(401).send({
                    message: `Invalid username, email or password`,
                    status: 401
                });
            }
        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            });
        }
    }

    /**
     * Get a user by their name or ID.
     * If a name is provided in the request parameters, it will try to get the user by their name.
     * If no name is provided, it will try to get the user by their ID, which is retrieved from the request user's 'Sub' property.
     * It also retrieves the user's friends, followings, path, tags, and VueEnsemble.
     * If the user is found, it responds with a status of 200 and the user's information.
     * If the user is not found, it responds with a status of 404.
     * If an error occurs, it responds with a status of 500 and the error message.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async getUser(req, res) {
        const {name: userName} = req.params;
        let userId;
        try {
            userId = req.user.Sub;
        } catch (e) {
        }
        try {
            const utilisateur = userName ? await user.getUserByName(userName) : await user.getUserById(userId);
            if (!utilisateur) {
                return res.status(404).send({
                    message: 'User not found',
                    status: 404
                });
            }
            utilisateur.Friends = userName ? await user.getFriendsName(userName) : await user.getFriends(userId);
            utilisateur.Friends.forEach((friend) => friend.Path = `${url}assets/${friend.Path}`)

            utilisateur.Follow = userName ? await user.getFollowName(userName) : await user.getFollow(userId);
            utilisateur.Follow.forEach((follow) => follow.Path = `${url}assets/${follow.Path}`)

            utilisateur.Suivie = userName ? await user.getFollowedName(userName) : await user.getFollowed(userId);
            utilisateur.Suivie.forEach((follow) => follow.Path = `${url}assets/${follow.Path}`)

            utilisateur.Path = `${url}assets/${utilisateur.Path}`;
            utilisateur.Tags = utilisateur.Tags.map((tag) => `${url}assets${tag}`);

            utilisateur.VueEnsemble = userName ? await user.getPostMessageName(userName) : await user.getPostMessage(userId);
            console.log(utilisateur)
            utilisateur.VueEnsemble.forEach((vue) => {
                vue.TopicLike = vue.TopicLike === 0 ? -1 : vue.TopicLike
                vue.Topic.Path = `${url}assets/${vue.Topic.Path}`
            });
            console.log(7)
            res.status(200).send({
                message: 'User successfully found',
                status: 200,
                utilisateur
            });
        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            });
        }
    }

    static async ForgotPassword(req, res) {
        const {email} = req.body;
        try {
            const utilisateur = await user.getUserByEmail(email);
            if (!utilisateur) {
                return res.status(400).send({
                    message: 'No user with that email',
                    status: 400
                });
            }
            const token = jwt.sign({Sub: utilisateur.Id}, jwtkey, {expiresIn: '1h'});
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
        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            });
        }
    }

    static async ResetPassword(req, res) {
        const {password} = req.body;
        try {
            const Password = hashPassword(password, crypto.randomBytes(16).toString('hex'));//hash mon password
            await user.setPassword(Password, req.user.Sub)
            res.status(200).send({
                message: `Password updated successfully`,
                status: 200
            })
        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            })
        }
    }

    static async UpdateUser(req, res) {

        const id = req.user.Sub;
        const body = req.body;
        while (typeof body.Tags == 'string'){
            body.Tags = JSON.parse(body.Tags);
        }
         let filePath;
        console.log(body)
        console.log(req.file)
        if (req.file) {
            filePath = req.file.path;
            body.Path = filePath.replace('api\\assets', '');
        }

        try {
            await user.updatePatchUser(id, body)
            if (req.file) {
                return res.download(filePath, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            return res.status(200).send({
                message: "User successfully updated",
                status: 200
            })
        } catch (err) {
            return res.status(500).send({
                message: err,
                status: 500
            })
        }
    }

    static async SearchFriend(req, res) {
        const searchQuery = req.query.search
        try {
            const search = await user.searchFriend(searchQuery)
            if (search.length === 0) {
                return res.status(404).send({
                    message: 'Nous n\'avons pas trouvé d\'ami pour ' + search,
                    status: 404
                })
            }
            res.status(200).send({
                message: 'Friends found',
                status: 200,
                search
            })
        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            })
        }
    }

    static async SearchFollow(req, res) {
        const searchQuery = req.query.search
        try {
            const search = await user.searchFollow(searchQuery)
            if (search.length === 0) {
                return res.status(404).send({
                    message: 'Nous n\'avons pas trouvé de follower pour ' + search,
                    status: 404
                })
            }
            res.status(200).send({
                message: 'Followers found',
                status: 200,
                search
            })
        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            })
        }
    }

    static async Search(req, res) {
        const searchQuery = req.query.search
        try {
            const search = await user.search(searchQuery)
            search.forEach((search) =>{
                if (search.Type === 'post'){
                    search.Post.User.Path = `${url}assets/${search.Post.User.Path}`
                    search.Topic.Path = `${url}assets/${search.Topic.Path}`
                }else {
                    search.Path = `${url}assets/${search.Path}`
                }
            })
            if (search.length === 0) {
                return res.status(404).send({
                    message: 'Nous n\'avons pas trouvé de résultat pour ' + search,
                    status: 404
                })
            }
            res.status(200).send({
                message: 'Search found',
                status: 200,
                search
            })
        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            })
        }
    }

    static async getAdminModo(req, res) {
        try {
            const admin = await user.getAdminModo()
            if (admin.length === 0) {
                return res.status(404).send({
                    message: 'Nous n\'avons pas trouvé d\'admin ou de modo',
                    status: 404
                })
            }

            admin.forEach((user) => user.Path = `${url}assets/${user.Path}`)
            res.status(200).send({
                message: 'Admins and Modos found',
                status: 200,
                admin
            })
        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            })
        }
    }

    static async Follow(req, res) {

        const id = parseInt(req.body.id)
        const userId = req.user.Sub
        if (id === userId) {
            return res.status(400).send({
                message: 'You can\'t follow yourself',
                status: 400
            })
        }
        try {
            const uFollow = await user.getFollow(userId);
            const uFriend = await user.getFriends(userId);
            const u1Follow = await user.getFollow(id);
            if (uFollow.find(u => u.Id === id)) {
                await user.acceptFollow(userId, id)
                return res.status(200).send({
                    message: 'You\'re friends now !',
                    status: 200
                })
            } else if (uFriend.find(u => u.Id === id)) {
                await user.unfollow(userId, id)
                return res.status(400).send({
                    message: 'Unfollowed successfully',
                    status: 200
                })
            } else if (u1Follow.find(u => u.Id === userId)) {
                await user.unfollow(userId, id)
                return res.status(400).send({
                    message: 'Unfollowed successfully',
                    status: 200
                })
            } else {
                await user.follow(userId, id)
                res.status(200).send({
                    message: 'Followed successfully',
                    status: 200
                })
            }
        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            })
        }
    }

    static async getFav(req, res) {
        const id = req.user.Sub
        try {
            const fav = await user.getFav(id)
            if (fav.length === 0) {
                return res.status(404).send({
                    message: 'Nous n\'avons pas trouvé de favoris',
                    status: 404
                })
            }
            fav.forEach((fav) => fav.TopicPath = `${url}assets/${fav.TopicPath}`)
            res.status(200).send({
                message: 'Fav found',
                status: 200,
                fav
            })
        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            })
        }
    }

    static async postFav (req, res){
        const idUser = req.user.Sub;
        const idPost = req.body.Id;
        try {
            const fav = user.postFav(idUser, idPost)
            if (fav.length  === 0){
                return res.status(404).send({
                    message: 'Fav not found',
                    status: 404
                })
            }
            res.status(200).send({
                message: 'fav insert',
                status: 200
            })
        }catch (err){
            res.status(500).send({
                message: err,
                status: 500
            })
        }
    }


    static async deleteFav(req, res) {
        const id = req.user.Sub
        const idPost = req.body.id

        try {
            await user.deleteFav(id, idPost)

            res.status(200).send({
                message: 'favoris bien supprimé',
                status: 200
            })
        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            })
        }
    }

    static getLiked(req, res) {
        const id = req.user.Sub
        const idPost = req.body.id

        try {
            const liked = user.getLiked(id, idPost)
            res.status(200).send({
                message: 'Like found',
                status: 200,
                liked
            })
        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            })
        }
    }
}

module.exports = UserController;