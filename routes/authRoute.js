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
    logOut
} = require("../controller/authController");

// Model Scaffolding
const authRouter = express.Router();

// Model Structure

// @METHOD: POST
// login user
authRouter.post('/login', logIn);

// @METHOD: GET
// refresh
authRouter.get('/refresh', refresh);

// @METHOD: POST
// log out user
authRouter.post('/logout', logOut);

// Export Model
module.exports = authRouter;