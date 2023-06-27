/*
 *
 *
 ------->Title: blogs router
 ->Description: this file is to handle all blogs related routes
 ------>Author: Shawon Talukder
 -------->Date: 06/25/2023
 *
 *
 */

// Dependencies
const express = require("express");
const {
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    removeBlog
} = require("../controller/blogController");
const checkLogin = require("../middleware/checkLogin");

// Model Scaffolding
const blogRouter = express.Router();

// middleware

// Model Structure

// @ROUTE: GET 
// Read all blogs
blogRouter.get('/', getBlogs);

// @ROUTE: GET 
// Read single blogs
blogRouter.get('/:id', getBlogById);

// @ROUTE: POST 
// CREATE a blog
blogRouter.post('/', checkLogin, createBlog);

// @ROUTE: PATCH 
// CREATE a blog
blogRouter.patch('/:id', updateBlog);

// @ROUTE: DELETE 
// DELETE a blog
blogRouter.delete('/:id', removeBlog);


// Export Model
module.exports = blogRouter;