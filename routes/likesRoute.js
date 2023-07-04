/*
 *
 *
 ------->Title: likes route
 ->Description: this route file is for likes
 ------>Author: Shawon Talukder
 -------->Date: 07/04/2023
 *
 *
 */

// Dependencies
const express = require("express");
const checkLogin = require("../middleware/checkLogin");

// Model Scaffolding
const likesRouter = express.Router();

// Model Structure

/*
 * @METHOD: POST
 * Like or Dislike a Post/blog
 * @PARAMS:
 * --blogId: string, id of the blog
 * --status: string, either like or dislike
 */
likesRouter.post('/:blogId/:status', checkLogin, likeDislikeBlog);

// Export Model
module.exports = likesRouter;