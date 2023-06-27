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
    createBlogQuery,
    updateBlogTitleQuery,
    updateBlogDescriptionQuery,
    updateBlogBannerQuery,
    updateBlogStatusQuery,
    deleteFromBlogsQuery
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
        const status = req.body?.status && typeof req.body.status === 'string' && req.body.status.trim().length > 0 && ['draft', 'published'].includes(req.body.status) ? req.body.status.trim() : null;

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

// @PATCH: update blog
blogController.updateBlog = async (req, res) => {
    try {
        // blog id check
        const blog_id = req.params.id && typeof req.params.id === 'string' && req.params.id.length > 0 && !isNaN(req.params.id) ? req.params.id : false;

        // title check
        const title = req.body?.title && typeof req.body.title === 'string' && req.body.title.trim().length > 0 ? req.body.title.trim() : false;

        // description check
        const description = req.body?.description && typeof req.body.description === 'string' && req.body.description.trim().length > 0 ? req.body.description.trim() : false;

        // status check
        const status = req.body?.status && typeof req.body.status === 'string' && req.body.status.trim().length > 0 && ['draft', 'published'].includes(req.body.status) ? req.body.status.trim() : null;

        // banner/image check
        const banner = req.body?.banner && typeof req.body.banner === 'string' && req.body.banner.trim().length > 0 ? req.body.banner.trim() : null;

        // check if any required field is empty!
        if (!title && !description && (!banner && banner !== null) && (!status && status !== null)) {
            return res.status(400).json({ message: "To update at least one field is required!" });
        }

        //check for blog in the database
        const result = await pool.query(getBlogByIdQuery, [blog_id]);
        if (!result.rowCount > 0) {
            return res.status(400).json({ message: "Something went wrong! Try again later." })
        }
        const blog = result.rows[0];
        // update blog information
        if (title && title !== blog?.blog_title) {
            //send title change query to database
            await pool.query(updateBlogTitleQuery, [title, blog_id]);
        }
        if (description && description !== blog?.blog_description) {
            //send description change query to database
            await pool.query(updateBlogDescriptionQuery, [description, blog_id]);
        }
        if ((banner || banner === null) && banner !== blog?.blog_banner) {
            //send banner change query to database
            await pool.query(updateBlogBannerQuery, [banner, blog_id]);
        }
        if (status && status !== blog?.blog_status) {
            //send status change query to database
            await pool.query(updateBlogStatusQuery, [status, blog_id]);
        }

        // response with success code
        res.status(200).json({ message: "blog information updated successfully!" })
    } catch (error) {
        res.status(500).json({ message: "There is a server side error!" })
    }
}

// @DELETE: delete blog
blogController.removeBlog = async (req, res) => {
    try {
        // blog id check
        const blog_id = req.params.id && typeof req.params.id === 'string' && req.params.id.length > 0 && !isNaN(req.params.id) ? req.params.id : false;

        if (!blog_id) {
            return res.status(400).json({ message: "Invalid request! get a valid id" });
        }

        // search for blog in the database
        const blog = await pool.query(getBlogByIdQuery, [blog_id]);

        if (!blog.rowCount > 0) {
            return res.status(400).json({ message: "Could not delete blog!" });
        }

        //delete the blog
        const result = await pool.query(deleteFromBlogsQuery, [blog_id]);

        if (!result.rowCount) {
            return res.status(400).json({ message: "Could not delete blog!" });
        }
        return res.status(200).json({ message: "Blog information deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "There is a server side error!" })
    }
}
// Export Model
module.exports = blogController;