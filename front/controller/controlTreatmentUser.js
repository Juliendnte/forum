const url = "http://localhost:4000";
const axios = require("axios");
const ErrorHandler = require("./ErrorHandler");

const errorHandler = new ErrorHandler();

/**
 * Check if a string is a valid email.
 * @param {string} email - The string to check.
 * @returns {boolean} True if the string is a valid email, false otherwise.
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

class TreatmentUser {
    /**
     * Handle login form submission.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    LoginTreatment = async (req, res) => {
        const {name, password, remember} = req.body;
        if (!name) {
            console.log({name, password, remember});
            errorHandler.setError("The username/Email field must be filled", 401);
            return res.redirect('/CODER/login');
        }

        const {username, email} = isValidEmail(name) ? {email: name} : {username: name};
        try {
            const response = await axios.post(`${url}/login`, {
                username,
                password,
                email,
                remember,
            });

            if (response.status === 200) {
                res.cookie("Token", response.data.Token, {
                    maxAge: remember ? 365 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: false,
                    sameSite: "Lax",
                });
                return res.redirect("/Index");
            } else {
                errorHandler.setError(response.data.message, response.data.status);
            }
        } catch (err) {
            errorHandler.handleRequestError(err);
        }
        console.log({name, password, remember})
        res.redirect("/CODER");
    };

    /**
     * Handle register form submission.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    RegisterTreatment = async (req, res) => {
        const {username, password, email} = req.body;

        try {
            const response = await axios.post(`${url}/register`, {
                username,
                password,
                email,
            });
            if (response.data.status === 201) {
                return res.redirect("/index");
            } else {
                errorHandler.setError(response.data.message, response.data.status);
            }
        } catch (err) {
            errorHandler.handleRequestError(err);
        }
        res.redirect("/create-account");
    };
}

module.exports = TreatmentUser;