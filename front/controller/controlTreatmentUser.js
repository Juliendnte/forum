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
    static async LoginTreatment(req, res) {
        const { name, password, remember } = req.body;
        if (!name) {
            console.log({ name, password, remember});
            errorHandler.setError("The username/Email field must be filled", 401);
            return res.redirect('/CODER/login');
        }

        const { username, email } = isValidEmail(name) ? { email: name } : { username: name };
        try {
            const response = await axios.post(`${url}/login`, {
                username,
                password,
                email,
                remember,
            });
            if (response.status === 200) {
                const { Token } = response.data;
                if (Token) {
                    res.cookie("Token", Token, {
                        maxAge: remember ? 365 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
                        httpOnly: true,
                        secure: false, // Change to true if using HTTPS
                        sameSite: "Lax",
                    });
                    return res.redirect("/CODER");
                } else {
                    console.error("No Token found in response data");
                    errorHandler.setError("Login failed: No Token received", 401);
                }
            } else {
                errorHandler.setError(response.data.message, response.data.status);
            }
        } catch (err) {
            errorHandler.handleRequestError(err);
        }
        console.log({ name, password, remember });
        res.redirect("/CODER");
    }

    /**
     * Handle register form submission.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async RegisterTreatment(req, res) {
        const { username, password, email } = req.body;

        try {
            const response = await axios.post(`${url}/register`, {
                username,
                password,
                email,
            });
            if (response.data.status === 201) {
                return res.redirect("/CODER/login");
            } else {
                errorHandler.setError(response.data.message, response.data.status);
            }
        } catch (err) {
            errorHandler.handleRequestError(err);
        }
        console.log({ username, password, email })
        res.redirect("/CODER/login");
    }

    /**
     * Handle getUser form submission.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async GetUser(req, res) {
        try {
            const token = req.cookies.Token;

            if (!token) {
                return undefined;
            }

            const response = await axios.get(`${url}/user`, {
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                return response.data;
            } else {
                console.error("Unexpected response status when fetching user data: ", response.status);
                res.status(401).send("Failed to fetch user data");
                return undefined;
            }
        } catch (err) {
            console.error("Failed to fetch user data");
            res.status(500).send("Internal Server Error");
            return undefined;
        }
    }
}

module.exports = TreatmentUser;
