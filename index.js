/*
 *
 *
 ------->Title: server file
 ->Description: 
 ------>Author: Shawon Talukder
 -------->Date: 06/15/2023
 *
 *
 */

// Dependencies
const express = require("express");
const dotenv = require("dotenv");

// Model Scaffolding
const app = express();

// Configuration
dotenv.config();
const PORT = process.env.PORT || 5005;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '30mb' }))

//routes

//error middleware

// run app
app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
})
