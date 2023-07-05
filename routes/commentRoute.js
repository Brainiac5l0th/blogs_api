/*
 *
 *
 ------->Title: comments route
 ->Description: this route file is for comment related routes
 ------>Author: Shawon Talukder
 -------->Date: 07/05/2023
 *
 *
 */

// Dependencies
const express = require("express");
const {
    getCommentsById
} = require("../controller/commentController");

// Model Scaffolding
const commentRouter = express.Router();

// Model Structure

/*
 * @METHOD: GET
 * Get all comments for the id
 * @PARAMS:
 * --blogId: string, id of the blog
 */
commentRouter.get('/:blogId', getCommentsById);

// Export Model
module.exports = commentRouter;