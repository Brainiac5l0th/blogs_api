/*
 *
 *
 ------->Title: database configuration
 ->Description: this file is to configure database connection
 ------>Author: Shawon Talukder
 -------->Date: 06/16/2023
 *
 *
 */

// Dependencies
require("dotenv").config();
const { Pool } = require("pg");

// Configuration
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});


pool.connect().then(() => { console.log("Database Connected Successfully!") }).catch((err) => console.log("Could not connect to database!", err?.message));

// Export Model
module.exports = pool;