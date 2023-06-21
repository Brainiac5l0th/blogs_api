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
    createUser,
    updateUser,
    deleteUser
} = require("../controller/userController");

// Model Scaffolding
const userRouter = express.Router();

// Model Structure
// @ROUTE: GET 
// Read all users
userRouter.get('/', getUsers);

// @ROUTE: GET 
// Read user by id
userRouter.get('/:id', getUserById);

// @ROUTE: POST 
// Add user by id
userRouter.post('/', createUser);

// @ROUTE: PATCH
// Update user by id
userRouter.patch('/:id', updateUser);

// @ROUTE: DELETE
// Delete user by id
userRouter.patch('/:id', deleteUser);


// Export Model
module.exports = userRouter;