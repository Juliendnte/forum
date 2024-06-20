class ControlPage {
    /**
     * Render the index page
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    Index = (req, res) => {
        res.render('../views/pages/index');
    };

    /**
     * Render the login page
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    Login = (req, res) => {
        res.render('../views/pages/login');
    }

    /**
     * Render the register page
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    Register = (req, res) => {
        res.render('../views/pages/register');
    }

    /**
     * Render the forgot password page
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    ForgotPwd = (req, res) => {
        res.render('../views/pages/forgotpwd');
    }

    /**
     * Render the user profile page
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    ProfilUser = (req, res) => {
        res.render('../views/pages/profiluser');
    }
}

module.exports = ControlPage;
