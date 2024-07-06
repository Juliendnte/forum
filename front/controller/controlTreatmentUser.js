const url = "http://localhost:4000";
const axios = require("axios");
const ErrorHandler = require("./ErrorHandler");
const {Blob} = require('blob-polyfill');

let user

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
        const {name, password, remember} = req.body;
        if (!name) {
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
                const {Token} = response.data;

                if (Token) {
                    res.cookie("Token", Token, {
                        maxAge: remember ? 365 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
                        httpOnly: true,
                        secure: false, // Change to true if using HTTPS
                        sameSite: "Lax",
                    });
                    user = await axios.get(url + "/user", {
                        headers: {
                            "Authorization": Token,
                            "Content-Type": "application/json"
                        }
                    });
                } else {
                    errorHandler.setError("Login failed: No Token received", 401);
                }
            } else {
                errorHandler.setError(response.data.message, response.data.status);
            }
        } catch (err) {
            errorHandler.handleRequestError(err);
        }
        res.redirect("/CODER");
    }

    /**
     * Handle register form submission.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async RegisterTreatment(req, res) {
        const {username, password, email} = req.body;

        try {
            const response = await axios.post(`${url}/register`, {
                username,
                password,
                email,
            });
            if (response.data.status === 201) {
                return res.redirect("/CODER/login");
            }
        } catch (err) {
            errorHandler.handleRequestError(err);
        }
        res.redirect("/CODER/login");
    }

    /**
     * Handle get user form submission.
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
            return response.data;
        } catch (err) {
            errorHandler.setError("Failed to fetch user data", 401);
            return undefined;
        }
    }

    /**
     * Handle get users form submission.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async GetUsers(req, res) {
        try {
            const response = await axios.get(`${url}/user/${req.params.name}`);
            return response.data;
        } catch (err) {
            errorHandler.handleRequestError(err);
            return undefined;
        }
    }

    /**
     * Handle disconnect form submission.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async DisconnectTreatment(req, res) {
        try {
            // Suppression du cookie de session
            res.clearCookie('Token');
            user = undefined;
            res.redirect('/CODER'); // Redirection vers la page précédente
        } catch (err) {
            errorHandler.handleRequestError(err);
            res.redirect("/CODER/err")
        }
    }

    static async FollowUser(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).send("No user found");
            }

            const token = req.cookies.Token;
            if (!token) {
                return res.status(400).send("No token found");
            }

            await axios.post(`${url}/follow`, {id}, {
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            });

            res.redirect('back');
        } catch (err) {
            if (err.response) {
                res.redirect('back');
            } else if (err.request) {
                errorHandler.setError("No response from server", 500)
            } else {
                errorHandler.setError("Request error", 500)
            }
        }
    }

    static async GetAdmin(req, res) {
        try {
            const response = await axios.get(`${url}/admin/`);
            return response.data.admin; // Return the array of admin and moderators

        } catch (err) {
            errorHandler.handleRequestError(err);
            return [];
        }
    }

    static async GetTags() {
        try {
            const response = await axios.get(`${url}/tags`);

            if (response.status === 200) {
                return response.data;
            } else {
                errorHandler.setError("Failed to fetch user data", 401)
            }
        } catch (err) {
            errorHandler.handleRequestError(err);
            res.redirect("/CODER/err")
        }
    }

    static async UpdateUser(req, res) {
        try {
            const token = req.cookies.Token;

            if (!token) {
                return res.status(400).send("No token found");
            }
            const formData = new FormData();
            let blobFile;

            formData.append('Name', req.body.Name);
            formData.append('Email', req.body.Email);
            formData.append('Biography', req.body.Biography);
            formData.append('Tags', JSON.stringify(req.body.Tags));
            if (req.file) {
                blobFile = new Blob([req.file.buffer], {type: req.file.mimetype});
                formData.append('ProfileImage', blobFile, req.file.originalname);
            }

            await axios.patch(`${url}/user/update`, formData,
                {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "multipart/form-data"
                    },
                });


            res.redirect('/CODER/user/' + req.body.Name);
        } catch (err) {
            errorHandler.handleRequestError(err)
            res.redirect('/CODER/err')
        }
    }

    static async GetLiked(req, res) {
        try {
            const token = req.cookies.Token;

            const response = await axios.get(`${url}/getLiked`,
                {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    },
                });

            return response.data

        } catch (err) {
            errorHandler.handleRequestError(err);
            return undefined
        }
    }

    static async AddFavorite(req, res) {
        try {
            const Id = req.params.id;
            const token = req.cookies.Token;

            const response = await axios.post(`${url}/postFav`,
                {
                    Id
                },
                {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    },
                });

            return response.data
        } catch (err) {
            errorHandler.handleRequestError(err);
            res.redirect("/CODER/err")
        }
    }

    static async RemoveFavorite(req, res) {
        try {
            const Id = req.params.id;
            const token = req.cookies.Token;

            const response = await axios.delete(`${url}/deleteFav`,
                {
                    Id
                },
                {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    },
                });

            return response.data
        } catch (err) {
            errorHandler.handleRequestError(err);
            res.redirect("/CODER/err")
        }
    }

    static async GetFavorite(req, res) {
        try {
            const token = req.cookies.Token;

            const response = await axios.get(`${url}/getFav`,
                {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    },
                });

            return response.data
        } catch (err) {
            errorHandler.handleRequestError(err);
            res.redirect("/CODER/err")
        }
    }

}

module.exports = {TreatmentUser};
