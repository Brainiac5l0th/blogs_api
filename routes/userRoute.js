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
    getUserById,
    createUser
} = require("../controller/userController");

// Model Scaffolding
const userRouter = express.Router();

// Model Structure
//@GET users
userRouter.get('/', getUsers);

//@GET user by id
userRouter.get('/:id', getUserById);

//@POST user by id
userRouter.post('/', createUser);

// Export Model
module.exports = userRouter;