const controlUser = require('./controlTreatmentUser');

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
            console.error(err);
            res.status(500).send("Internal Server Error");
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
     * Render the user profile page
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async ProfilUser(req, res) {
        res.render('../views/pages/profiluser');
    }
}

module.exports = ControlTemplate;
