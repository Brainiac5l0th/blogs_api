/*
 *
 *
 ------->Title: tags route
 ->Description: this route file is for tags
 ------>Author: Shawon Talukder
 -------->Date: 07/04/2023
 *
 *
 */

// Dependencies
const express = require("express");
const {
    getAllTags,
    createTag,
    updateTag,
    removeTag
} = require("../controller/tagsController");
const checkLogin = require("../middleware/checkLogin");

// Model Scaffolding
const tagsRouter = express.Router();

// Model Structure

// @METHOD: GET 
// Read all tags
tagsRouter.get('/', getAllTags);

// @METHOD: POST 
// CREATE a tag
tagsRouter.post('/', checkLogin, createTag);

// @METHOD: PATCH 
// UPDATE a tag
tagsRouter.patch('/:tagTitle', checkLogin, updateTag);

// @METHOD: DELETE 
// DELETE tag from database
tagsRouter.delete('/:tagTitle', checkLogin, removeTag);

// Export Model
module.exports = tagsRouter;