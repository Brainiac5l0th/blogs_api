/*
 *
 *
 ------->Title: like controller
 ->Description: 
 ------>Author: Shawon Talukder
 -------->Date: 07/04/2023
 *
 *
 */

// Dependencies
const pool = require("../config/db");

// Model Scaffolding
const likesController = {};

// Model Structure

/*
 *
 */
likesController.likeDislikeBlog = async (req, res) => {
    try {
        // blog id 
        const blogId = req.params?.blogId && typeof req.params.blogId === 'string' && req.params.blogId.trim().length > 0 && !isNaN(req.params.blogId) ? req.params.blogId : false;
    } catch (error) {
        return res.status(500).json({ message: "there is a server side error!" });
    }
}
// Export Model
module.exports = likesController;