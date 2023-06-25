/*
 *
 *
 ------->Title: blogs controller
 ->Description: this controller file is to handle all blogs related content
 ------>Author: Shawon Talukder
 -------->Date: 06/25/2023
 *
 *
 */

// Dependencies
const pool = require("../config/db");
const {
    getAllBlogs
} = require("../queries/blogQueries");

// Model Scaffolding
const blogController = {};

// Model Structure

// @GET: all blogs
blogController.getBlogs = async (req, res) => {
    try {
        const result = await pool.query(getAllBlogs);
        if (result.rowCount === 0) {
            return res.status(204).json({ message: "No blogs found!" })
        }
        return res.status(200).json({ message: "success!", data: result.rows })
    } catch (error) {
        res.status(500).json({ message: "There is a server side error!" })
    }
}
// Export Model
module.exports = blogController;