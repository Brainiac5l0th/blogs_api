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
const { likeDislikeBlog, getPersonsLikedBlog } = require("../controller/likeController");

// Model Scaffolding
const likesRouter = express.Router();

// Model Structure

/*
 * @METHOD: GET
 * Get all persons id::array who liked the blog by blogId
 * @PARAMS:
 * --blogId: string, id of the blog
 */
likesRouter.get('/:blogId', checkLogin, getPersonsLikedBlog);
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