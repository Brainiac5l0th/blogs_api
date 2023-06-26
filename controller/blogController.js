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
    getAllBlogs,
    getBlogByIdQuery
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

// @GET: single blog by it's id
blogController.getBlogById = async (req, res) => {
    try {
        // id check
        const id = req.params.id && typeof req.params.id === 'string' && req.params.id.length > 0 ? req.params.id : false;
        if (!id) {
            return res.status(400).json({ message: "Invalid request! get a valid id" });
        }

        // check blog database for this id
        const blog = await pool.query(getBlogByIdQuery, [id]);

        if (!blog.rowCount > 0) {
            return res.status(400).json({ message: "Sorry! There is no data." })
        }
        return res.status(200).json({ message: "success!", data: blog.rows })
    } catch (error) {
        res.status(500).json({ message: "There is a server side error!" })
    }
}
// Export Model
module.exports = blogController;