/**
 * @fileoverview This module initializes the database for the application.
 * @module init_db
 * @requires module:../api/config/authBDD
 * @requires module:../dotenv
 * @requires module:fs
 * @requires module:path
 */

const connection = require("../api/config/authBDD");
const fs = require("fs");
const path = require("path");
require('dotenv').config();

const migrationDir = path.join(__dirname, 'migration');
const migrations = fs.readdirSync(migrationDir).sort().map(file => {
    const filePath = path.join(migrationDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return fileContent.split(';').map(command => command.trim()).filter(command => command.length > 0);
}).flat();

const insertionDir = path.join(__dirname, 'insertion');
const insertions = fs.readdirSync(insertionDir).sort().map(file => {
    const filePath = path.join(insertionDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return fileContent.split(';').map(command => command.trim()).filter(command => command.length > 0);
}).flat();

/**
 * Initialize the database by executing a series of SQL queries.
 * @async
 * @function initializeDatabase
 * @throws Will throw an error if one occurs during query execution.
 */
const initializeDatabase = async () => {
    try {
        console.log('Setting up database...')
        await DropDatabase();
        await CreateDatabase();
        await UseDatabase();
        for (const migration of migrations) {
            await UseMigration(migration);
        }
        for (const insertion of insertions) {
            await UseInsertion(insertion);
        }
        console.log('Database successfully set up!');
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        connection.end();
    }
};

function DropDatabase() {
    return new Promise((resolve, reject) => {
        connection.query(`DROP DATABASE IF EXISTS \`${process.env.DB_DATABASE}\``, (err, results) => err ? reject(err) : resolve(results));
    })
}

function CreateDatabase() {
    return new Promise((resolve, reject) => {
        connection.query(`CREATE DATABASE \`${process.env.DB_DATABASE}\``, (err, results) => err ? reject(err) : resolve(results));
    })
}

function UseDatabase() {
    return new Promise((resolve, reject) => {
        connection.query(`USE \`${process.env.DB_DATABASE}\``, (err, results) => err ? reject(err) : resolve(results));
    })
}

function UseMigration(migration) {
    return new Promise((resolve, reject) => {
        connection.query(migration, (err, results) => err ? reject(err) : resolve(results));
    })
}

function UseInsertion(insertion) {
    return new Promise((resolve, reject) => {
        connection.query(insertion, (err, results) => err ? reject(err) : resolve(results));
    })
}

initializeDatabase();