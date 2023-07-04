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
    updateTag
} = require("../controller/tagsController");

// Model Scaffolding
const tagsRouter = express.Router();

// Model Structure

// @METHOD: GET 
// Read all tags
tagsRouter.get('/', getAllTags);

// @METHOD: POST 
// CREATE a tag
tagsRouter.post('/', createTag);

// @METHOD: PATCH 
// UPDATE a tag
tagsRouter.patch('/:tagTitle', updateTag);

// Export Model
module.exports = tagsRouter;