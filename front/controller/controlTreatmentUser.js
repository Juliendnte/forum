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

    static error = {};

    /**
     * Handle login form submission.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async LoginTreatment(req, res) {
        const {name, password, remember} = req.body;
        if (!name) {
            errorHandler.setError("The username/Email field must be filled", 401);
            return res.redirect('/coder/login');
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
                    const userResponse = await axios.get(`${url}/user`, {
                        headers: {
                            "Authorization": Token,
                            "Content-Type": "application/json"
                        }
                    });
                    // Assuming you do something with the userResponse
                } else {
                    errorHandler.setError("Login failed: No Token received", 401);
                    TreatmentUser.error = errorHandler.getError();
                }
            } else {
                errorHandler.setError(response.data.message, response.data.status);
                TreatmentUser.error = errorHandler.getError();
            }
        } catch (err) {
            errorHandler.handleRequestError(err);
            TreatmentUser.error = errorHandler.getError();
            return res.redirect("/coder/login");
        }
        res.redirect("/coder");
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
                return res.redirect("/coder/login");
            }
        } catch (err) {
            errorHandler.handleRequestError(err);
            TreatmentUser.error = errorHandler.getError();
            return res.redirect("/coder/login");
        }
        res.redirect("/coder/login");
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
            res.redirect('/coder'); // Redirection vers la page précédente
        } catch (err) {
            errorHandler.handleRequestError(err);
            res.redirect("/coder/err")
        }
    }

    /**
     * Handle the follow of a user
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async FollowUser(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.redirect('back');
            }

            const token = req.cookies.Token;
            if (!token) {
                return res.redirect('back');
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

    /**
     * Getting the admin and moderators
     */
    static async GetAdmin() {
        try {
            const response = await axios.get(`${url}/admin/`);
            return response.data.admin; // Return the array of admin and moderators

        } catch (err) {
            errorHandler.handleRequestError(err);
            return [];
        }
    }

    /**
     * Getting all tags
     */
    static async GetTags(res) {
        try {
            const response = await axios.get(`${url}/tags`);

            if (response.status === 200) {
                return response.data;
            } else {
                errorHandler.setError("Failed to fetch user data", 401)
            }
        } catch (err) {
            errorHandler.handleRequestError(err);
            res.redirect("/coder/err")
        }
    }

    /**
     * Handle the update of a user
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async UpdateUser(req, res) {
        try {
            const token = req.cookies.Token;

            if (!token) {
                return res.redirect('/coder/user/' + req.body.Name);
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


            res.redirect('/coder/user/' + req.body.Name);
        } catch (err) {
            errorHandler.handleRequestError(err)
            res.redirect('/coder/err')
        }
    }

    /**
     * Getting the liked post of the user
     * @param {Object} req - The request object.
     */
    static async GetLiked(req) {
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

    /**
     * Getting all favorite
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async GetFavorite(req, res) {
        try {
            const token = req.cookies.Token;
            if (!token) {
                return undefined
            }

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
            res.redirect("/coder/err")
        }
    }

    static async AddFavoritePost(req, res) {
        try {
            const idPost = req.params.id;
            if (!idPost) {
                return undefined;
            }

            const token = req.cookies.Token;
            if (!token) {
                return undefined;
            }

            const response = await axios.post(`${url}/FavPost`,
                {
                    idPost
                },
                {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    },
                });

            res.redirect(`back`);
            return response.data;
        } catch (err) {
            errorHandler.handleRequestError(err);
            res.redirect("/coder/err")
        }
    }

    static async RemoveFavoritePost(req, res) {
        try {
            const idPost = req.params.id;
            if (!idPost) {
                return undefined;
            }

            const token = req.cookies.Token;
            if (!token) {
                return undefined;
            }

            const response = await axios.post(`${url}/FavPost/delete`,
                {
                    idPost
                },
                {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    },
                });

            res.redirect(`back`);
            return response.data;
        } catch (err) {
            console.log(err)
            errorHandler.handleRequestError(err);
            res.redirect("/coder/err")
        }
    }

    static async AddFavoriteTopic(req, res) {
        try {
            const idTopic = req.params.id
            if (!idTopic) {
                return undefined;
            }

            const token = req.cookies.Token;
            if (!token) {
                return undefined;
            }

            const response = await axios.post(`${url}/FavTopic`,
                {
                    idTopic
                },
                {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    },
                });

            res.redirect(`back`);
            return response.data;
        } catch (err) {
            errorHandler.handleRequestError(err);
            res.redirect("/coder/err")
        }
    }

    static async RemoveFavoriteTopic(req, res) {
        try {
            const idTopic = req.params.id
            if (!idTopic) {
                return undefined;
            }

            const token = req.cookies.Token;
            if (!token) {
                return undefined;
            }

            const response = await axios.post(`${url}/FavTopic/delete`,
                {
                    idTopic
                },
                {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    },
                });

            res.redirect(`back`);
            return response.data;
        } catch (err) {
            errorHandler.handleRequestError(err);
            res.redirect("/coder/err")
        }
    }
}

module.exports = {TreatmentUser};
