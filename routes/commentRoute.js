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
const checkLogin = require("../middleware/checkLogin");
const {
    getCommentsById,
    createComment,
    updateComment
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

/*
 * @METHOD: POST
 * CREATE a comment for the id
 * @PARAMS:
 * --blogId: string, id of the blog
 */
commentRouter.post('/:blogId', checkLogin, createComment);

/*
 * @METHOD: PATCH
 * UPDATE a comment for the id
 * @PARAMS:
 * --blogId: string, id of the blog
 * --commentId: string, comment id for the blog
 */
commentRouter.patch('/:blogId/:commentId', checkLogin, updateComment);

// Export Model
module.exports = commentRouter;