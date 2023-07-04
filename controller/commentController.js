/*
 *
 *
 ------->Title: comments controller
 ->Description: This controller is to handle comment request, response accordingly. 
 ------>Author: Shawon Talukder
 -------->Date: 07/05/2023
 *
 *
 */

// Dependencies
const pool = require("../config/db");

// Model Scaffolding
const commentController = {};

// Model Structure

/* 
 * function: getCommentsById
 * One Param: blog id 
 * returns: all comments against the blogId
 */
commentController.getCommentsById = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({ message: "there is a server side error!" });
    }
}

// Export Model
module.exports = commentController;