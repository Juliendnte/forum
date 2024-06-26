const mysql = require("mysql2");
require('dotenv').config();

/**
 * Creates a connection to the MySQL database using the mysql2 package.
 * The connection details are retrieved from environment variables.
 *
 * @module connection
 */
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 10
});

/**
 * Establishes a connection to the MySQL database.
 * Logs an error message if the connection fails, otherwise logs a success message.
 */
connection.connect((err)=>{
    if (err) {
        console.error('Failed to connect to the database:', err);
        process.exit(1);
    } else {
        console.log("Connection established");
    }
});

module.exports = connection;