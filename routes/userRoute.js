/*
 *
 *
 ------->Title: user router
 ->Description: 
 ------>Author: Shawon Talukder
 -------->Date: 06/16/2023
 *
 *
 */

// Dependencies
const express = require("express");
const {
    getUsers,
    getUserById
} = require("../controller/userController");

// Model Scaffolding
const userRouter = express.Router();

// Model Structure
//@GET users
userRouter.get('/', getUsers);

//@GET user by id
userRouter.get('/:id', getUserById);

// Export Model
module.exports = userRouter;