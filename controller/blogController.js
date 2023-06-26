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
    getBlogByIdQuery,
    createBlogQuery
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
        const id = req.params.id && typeof req.params.id === 'string' && req.params.id.length > 0 && !isNaN(req.params.id) ? req.params.id : false;

        // if id is not valid send response
        if (!id) {
            return res.status(400).json({ message: "Invalid request! get a valid id" });
        }

        // check blog database for this id
        const blog = await pool.query(getBlogByIdQuery, [id]);

        if (!blog.rowCount > 0) {
            return res.status(400).json({ message: "Sorry! There is no data." });
        }
        return res.status(200).json({ message: "success!", data: blog.rows });
    } catch (error) {
        res.status(500).json({ message: "There is a server side error!" });
    }
}

// @POST: create blog
blogController.createBlog = async (req, res) => {
    try {
        // title check
        const title = req.body?.title && typeof req.body.title === 'string' && req.body.title.trim().length > 0 ? req.body.title.trim() : false;

        // description check
        const description = req.body?.description && typeof req.body.description === 'string' && req.body.description.trim().length > 0 ? req.body.description.trim() : false;

        // status check
        const status = req.body?.status && typeof req.body.status === 'string' && req.body.status.trim().length > 0 && ['published'].includes(req.body.status) ? req.body.status.trim() : 'draft';

        // banner/image check
        const banner = req.body?.banner && typeof req.body.banner === 'string' && req.body.banner.trim().length > 0 ? req.body.banner.trim() : false;

        // author_id uuid check 
        const author_id = req.body?.author_id && typeof req.body.author_id === 'string' && req.body.author_id.trim().length === 36 ? req.body.author_id : false;
        console.log(title, description, status, banner, author_id);

        // check if any required field is empty!
        if (!title || !description || !banner || !author_id) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // insert into the database
        const result = await pool.query(createBlogQuery, [title, description, status, banner, author_id]);
        // if returns no rowcount then response with server error
        if (!result.rowCount > 0) {
            return res.status(500).json({ message: "Could not create blog!" });
        }

        // return create status
        return res.status(201).json({ message: "Blog created successfully!" });

    } catch (error) {
        res.status(500).json({ message: "There is a server side error!" })
    }
}

// Export Model
module.exports = blogController;