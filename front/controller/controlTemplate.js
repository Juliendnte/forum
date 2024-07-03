const controlUser = require('./controlTreatmentUser');
const controlTopic = require('./controlTreatmentTopic');
const controlPost = require('./controlTreatmentPost');
const controlMessage = require('./controlTreatmentMessage');

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
            const [dataUser, dataPost, dataLike, dataTags] = await Promise.all([
                controlUser.TreatmentUser.GetUser(req, res),
                controlPost.GetPosts(req, res),
                controlUser.TreatmentUser.GetLiked(req, res),
                controlTopic.GetTags(req, res)
            ]);

            let query

            const token = req.cookies.Token;
            let PathUserLog = null;

            if (token && dataUser && dataUser.utilisateur) {
                PathUserLog = dataUser.utilisateur.Path;
            }

            res.render('../views/pages/index', {
                dataUser,
                dataPost,
                dataLike,
                dataTags,
                PathUserLog,
                query
            });
        } catch (err) {
            console.error(err);
            errorHandler.handleRequestError(err);
            res.redirect('/coder/error');
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
     * Render the forgot password page
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async ForgotPwd(req, res) {
        res.render('../views/pages/forgotpwd');
    }

    /**
     * Render the users profils profile page
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async ProfilUser(req, res) {
        try {
            let dataUser = await controlUser.TreatmentUser.GetUser(req, res);
            const dataTags = await controlTopic.GetTags(req, res);
            const Name = dataUser.utilisateur.Name;
            let Own = true;
            const IdUserLog = dataUser.utilisateur.Id;
            const PathUserLog = dataUser.utilisateur.Path

            if (dataUser.utilisateur.Name !== req.params.name) {
                dataUser = await controlUser.TreatmentUser.GetUsers(req, res);
                Own = false;
            }

            if (dataUser && dataUser.utilisateur && dataUser.utilisateur.Create_at) {
                const date = new Date(dataUser.utilisateur.Create_at);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
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

            const dataLike = await controlUser.TreatmentUser.GetLiked(req, res);

            console.log('dataLike: ', dataLike);

            let query

            res.render('../views/pages/profiluser', {
                dataUser,
                totalLikes,
                totalPosts,
                dataTags,
                Own,
                Name,
                IdUserLog,
                PathUserLog,
                dataLike,
                query
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
    static async CreateTopic(req, res) {
        try {
            const dataUser = await controlUser.TreatmentUser.GetUser(req, res);

            res.render('../views/pages/createTopic', {
                dataUser
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
            const [dataUser, dataTopic, dataAdmin, dataTags] = await Promise.all([
                controlUser.TreatmentUser.GetUser(req, res),
                controlTopic.GetTopic(topicName),
                controlUser.TreatmentUser.GetAdmin(req, res),
                controlTopic.GetTags(req, res)
            ]);
            const PathUserLog = dataUser.utilisateur.Path

            if (dataTopic && dataTopic.topic && dataTopic.topic.Create_at) {
                const date = new Date(dataTopic.topic.Create_at);
                const options = {year: 'numeric', month: 'long', day: 'numeric'};
                dataTopic.topic.Create_at_formatted = date.toLocaleDateString('fr-FR', options);
            }

            const dataLike = await controlUser.TreatmentUser.GetLiked(req, res);
            let query

            res.render('../views/pages/topic', {
                dataUser,
                dataTopic,
                dataLike,
                dataAdmin,
                dataTags,
                PathUserLog,
                query
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
            const dataUser = await controlUser.TreatmentUser.GetUser(req, res);
            const dataTags = await controlTopic.GetTags(req, res);
            const dataMessages = await controlPost.GetMessagesPost(req, res);
            const dataPost = await controlPost.GetPost(postId);
            const PathUserLog = dataUser.utilisateur.Path
            let query


            if (dataPost && dataPost.topic && dataPost.topic.Create_at) {
                const date = new Date(dataPost.topic.Create_at);
                const options = {year: 'numeric', month: 'long', day: 'numeric'};
                dataPost.topic.Create_at_formatted = date.toLocaleDateString('fr-FR', options);
            }

            const dataLike = await controlUser.TreatmentUser.GetLiked(req, res);

            res.render('../views/pages/detailPost', {
                dataUser,
                dataPost,
                dataLike,
                dataTags,
                dataMessages,
                PathUserLog,
                query
            });
        } catch (err) {
            errorHandler.handleRequestError(err);
        }
    }

    static async GetMessage(req, res) {
        try {
            const id = req.params.id

            const dataUser = await controlUser.TreatmentUser.GetUser(req, res);
            const dataMessage = await controlMessage.GetMessage(id)
            const dataMessages = await controlMessage.GetMessagestoMessage(req, res)
            const dataTags = await controlTopic.GetTags(req, res);
            let query

            const PathUserLog = dataUser.utilisateur.Path

            if (dataMessage && dataMessage.topic && dataMessage.topic.Create_at) {
                const date = new Date(dataMessage.topic.Create_at);
                const options = {year: 'numeric', month: 'long', day: 'numeric'};
                dataMessage.topic.Create_at_formatted = date.toLocaleDateString('fr-FR', options);
            }

            res.render('../views/pages/detailMessage', {
                dataUser,
                dataMessage,
                dataMessages,
                dataTags,
                PathUserLog,
                query
            });
        } catch (err) {
            errorHandler.handleRequestError(err);
        }
    }

    static async CreatePost(req, res) {
        try {
            const dataUser = await controlUser.TreatmentUser.GetUser(req, res);

            const topicName = req.params.nametopic;
            const dataTopic = await controlTopic.GetTopic(topicName);

            console.log("dataTopic:", dataTopic);

            res.render('../views/pages/createPost', {
                dataUser,
                dataTopic
            });
        } catch (err) {
            console.error("Error fetching data for create post:", err);
            res.status(500).send("Internal server error");
        }
    }

    static async UpdateProfil(req, res) {
        try {
            const token = req.cookies.Token;

            if (!token) {
                return res.redirect('/CODER/login');
            }

            const dataUser = await controlUser.TreatmentUser.GetUser(req, res);
            const dataTags = await controlUser.TreatmentUser.GetTags(req, res);

            res.render('../views/pages/UpdateProfil', {
                    dataUser,
                    dataTags
                });
        } catch (err) {
            errorHandler.handleRequestError(err);
        }
    }

    static async UpdateTopic(req, res) {
        try {
            const token = req.cookies.Token;

            if (!token) {
                return res.redirect('/CODER/login');
            }

            const name = req.params.name

            const dataTopic = await controlTopic.GetTopic(name);
            const dataTags = await controlUser.TreatmentUser.GetTags(req, res);

            res.render('../views/pages/UpdateTopic', {
                dataTopic,
                dataTags
            });
        } catch (err) {
            errorHandler.handleRequestError(err);
        }
    }

    static async UpdatePost(req, res) {
        try {
            const token = req.cookies.Token;

            if (!token) {
                return res.redirect('/CODER/login');
            }

            const id = req.params.id

            const dataPost = await controlPost.GetPost(id);

            res.render('../views/pages/UpdatePost', {
                dataPost
            });
        } catch (err) {
            errorHandler.handleRequestError(err);
        }
    }

    static async UpdateMessage(req, res) {
        try {
            const token = req.cookies.Token;

            if (!token) {
                return res.redirect('/CODER/login');
            }

            const id = req.params.id

            const dataMessage = await controlMessage.GetMessage(id);

            res.render('../views/pages/UpdateMessage', {
                dataMessage
            });
        } catch (err) {
            errorHandler.handleRequestError(err);
        }
    }

    static async SearchGlobal(req, res) {
        try {
            const query = req.query.search;

            const [dataUser, dataLike, dataTags, dataSearch] = await Promise.all([
                controlUser.TreatmentUser.GetUser(req, res),
                controlUser.TreatmentUser.GetLiked(req, res),
                controlTopic.GetTags(req, res),
                controlTopic.Search(query)
            ]);

            const token = req.cookies.Token;
            let PathUserLog = null;

            if (token && dataUser && dataUser.utilisateur) {
                PathUserLog = dataUser.utilisateur.Path;
            }

            // Rendre la page de recherche avec les données récupérées
            res.render('../views/pages/searchPage', {
                dataUser,
                dataLike,
                dataSearch,
                dataTags,
                PathUserLog,
                query
            });

        } catch (err) {
            errorHandler.handleRequestError(err);
            res.status(500).json({ error: 'Erreur lors de la récupération des données de recherche' });
        }
    }

    /**
     * Render the error page.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static Error(req, res) {
        const error = errorHandler.getError();
        errorHandler.setError(
            error.message || "Nous n'avons pas trouvé la page que vous cherchez",
            error.status || 404
        );
        res.render("../views/pages/error", {error: errorHandler.getError()});
        errorHandler.resetError();
    };
}

module.exports = ControlTemplate;
