/**
 * A class to handle error management.
 */
class ErrorHandler {
    /**
     * Constructs an instance of ErrorHandler.
     */
    constructor() {
        /**
         * @type {{message: string, status: number}}
         * @private
         */
        this.error = {message: "", status: 0,};
    }

    /**
     * Handles request errors.
     * Sets the error message and status based on the response from the request error.
     * If there is no response, it calls handleServerError.
     *
     * @param {Object} err - The error object from the request.
     */
    handleRequestError(err) {
        return err.response ? this.setError(err.response.data.message, err.response.data.status) : this.handleServerError();
    }

    /**
     * Handles server errors.
     * Sets a generic server error message and status.
     */
    handleServerError() {
        this.setError("Server problem", 500);
    }

    /**
     * Sets the error message and status.
     *
     * @param {string} message - The error message.
     * @param {number} status - The error status code.
     */
    setError(message, status) {
        this.error = { message, status };
    }

    /**
     * Resets the error message and status to default values.
     */
    resetError() {
        this.error = { message: "", status: 0 };
    }

    /**
     * Retrieves the current error message and status.
     *
     * @returns {{message: string, status: number}} The current error object.
     */
    getError() {
        return this.error;
    }
}

module.exports = ErrorHandler;