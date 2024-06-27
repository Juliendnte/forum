const controlUser = require('./controlTreatmentUser');
const controlTopic = require('./controlTreatmentTopics');
const ErrorHandler = require("./ErrorHandler");
const errorHandler = new ErrorHandler();


class ControlTemplate {
    /**
     * Render the index page
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async Index(req, res) {
        try {
            const dataUser = await controlUser.GetUser(req, res);

            res.render('../views/pages/index', {
                dataUser,
            });
        } catch (err) {
            errorHandler.handleRequestError(err);
        }
    };

    /**
     * Render the login page
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async Login(req, res) {
        res.render('../views/pages/login');
    }

    /**
     * Render the register page
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async Register(req, res) {
        res.render('../views/pages/register');
    }

    /**
     * Render the forgot password page
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async ForgotPwd(req, res) {
        res.render('../views/pages/forgotpwd');
    }

    /**
     * Render the user profil profile page
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async ProfilUser(req, res) {
        try {
            let dataUser = await controlUser.GetUser(req, res);
            let Own = true

            if (dataUser.utilisateur.Name !== req.params.name) {
                dataUser = await controlUser.GetUsers(req, res);
                Own = false
            }

            if (dataUser && dataUser.utilisateur && dataUser.utilisateur.Create_at) {
                const date = new Date(dataUser.utilisateur.Create_at);
                const options = {year: 'numeric', month: 'long', day: 'numeric'};
                dataUser.utilisateur.Create_at_formatted = date.toLocaleDateString('fr-FR', options);
            }

            const posts = dataUser.utilisateur.VueEnsemble;
            let totalLikes = 0;
            let totalPosts = 0;

            posts.forEach(post => {
                if (post.Type === 'post') {
                    totalPosts++;
                    totalLikes += parseInt(post.PostLikes, 10);
                }
            });

            // Passer les totaux au template
            res.render('../views/pages/profiluser', {
                dataUser,
                totalLikes,
                totalPosts,
                Own
            });
        } catch (err) {
            errorHandler.handleRequestError(err);
        }
    }

    /**
     * Render the users profils profile page
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async ProfilUsers(req, res) {
        try {
            const UsersName = req.params.name;

            const dataUser = await controlUser.GetUser(req, res);

            if (!dataUser) {
                throw new Error("Données de l'utilisateur non trouvées");
            }

            const dataUsers = await controlUser.GetUsers(UsersName);

            if (!dataUsers) {
                throw new Error("Données du profil non trouvées");
            }

            if (dataUsers.utilisateur && dataUsers.utilisateur.Create_at) {
                const date = new Date(dataUsers.utilisateur.Create_at);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                dataUsers.utilisateur.Create_at_formatted = date.toLocaleDateString('fr-FR', options);
            }

            let totalLikes = 0;
            let totalPosts = 0;

            if (dataUsers.utilisateur && dataUsers.utilisateur.VueEnsemble) {
                dataUsers.utilisateur.VueEnsemble.forEach(post => {
                    if (post.Type === 'post') {
                        totalPosts++;
                        totalLikes += parseInt(post.PostLikes, 10) || 0;
                    }
                });
            }

            res.render('../views/pages/profilusers', {
                dataUser,
                dataUsers,
                totalLikes,
                totalPosts
            });
        } catch (err) {
            errorHandler.handleRequestError(err); // Gestion des erreurs
            res.status(500).send("Erreur interne du serveur");
        }
    }

    /**
     * Render the create topic profile page
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async CreateTopic(req, res) {
        try {
            const dataUser = await controlUser.GetUser(req, res);

            res.render('../views/pages/createTopic', {
                dataUser,
            });
        } catch (err) {
            errorHandler.handleRequestError(err);
        }
    }

    /**
     * Render the create topic profile page
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async GetTopic(req, res) {
        try {
            const topicName = req.params.name;
            const [dataUser, dataTopic, dataAdmin] = await Promise.all([
                controlUser.GetUser(req, res),
                controlTopic.GetTopic(topicName),
                controlUser.GetAdmin(req, res)
            ]);

            if (dataTopic && dataTopic.topic && dataTopic.topic.Create_at) {
                const date = new Date(dataTopic.topic.Create_at);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                dataTopic.topic.Create_at_formatted = date.toLocaleDateString('fr-FR', options);
            }

            res.render('../views/pages/topic', {
                dataUser,
                dataTopic,
                dataAdmin
            });
        } catch (err) {
            console.error("Error fetching topic data:", err);
            res.status(500).send("Internal server error");
        }
    }
    /**
     * Render the create topic profile page
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async GetPost(req, res) {
        try {
            const postId = req.params.id;
            const dataUser = await controlUser.GetUser(req, res);
            const dataPost = await controlTopic.GetPost(postId);

            if (dataPost && dataPost.topic && dataPost.topic.Create_at) {
                const date = new Date(dataPost.topic.Create_at);
                const options = {year: 'numeric', month: 'long', day: 'numeric'};
                dataPost.topic.Create_at_formatted = date.toLocaleDateString('fr-FR', options);
            }

            res.render('../views/pages/detailPost', {
                dataUser,
                dataPost,
            });
        } catch (err) {
            errorHandler.handleRequestError(err);
        }
    }
}

module.exports = ControlTemplate;
