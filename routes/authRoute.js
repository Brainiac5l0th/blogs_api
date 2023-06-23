/*
 *
 *
 ------->Title: auth router
 ->Description: this router is to handle user login, logout, JWT token
 ------>Author: Shawon Talukder
 -------->Date: 06/23/2023
 *
 *
 */

// Dependencies
const express = require("express");
const {
    logIn,
    refresh,
} = require("../controller/authController");

// Model Scaffolding
const authRouter = express.Router();

// Model Structure

//@ROUTE: POST
// login user
authRouter.post('/login', logIn);

// sign up user
authRouter.get('/refresh', refresh);

// Export Model
module.exports = authRouter;