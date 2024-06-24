const controlUser = require('./controlTreatmentUser');
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
    static async Register (req, res) {
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
            const dataUser = await controlUser.GetUser(req, res);

            if (dataUser && dataUser.utilisateur && dataUser.utilisateur.Create_at) {
                const date = new Date(dataUser.utilisateur.Create_at);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                dataUser.utilisateur.Create_at_formatted = date.toLocaleDateString('fr-FR', options);
            }

            res.render('../views/pages/profiluser', {
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
}

module.exports = ControlTemplate;
