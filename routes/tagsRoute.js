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
    getAllTags
} = require("../controller/tagsController");

// Model Scaffolding
const tagsRouter = express.Router();

// Model Structure

// @METHOD: GET 
// Read all tags
tagsRouter.get('/', getAllTags);

// Export Model
module.exports = tagsRouter;