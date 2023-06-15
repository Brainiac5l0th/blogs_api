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
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD
})

// Export Model
module.exports = pool;