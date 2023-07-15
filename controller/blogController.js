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
    getBlogByUserIdQuery,
    createBlogQuery,
    updateBlogTitleQuery,
    updateBlogDescriptionQuery,
    updateBlogBannerQuery,
    updateBlogStatusQuery,
    deleteFromBlogsQuery
} = require("../queries/blogQueries");
const { getUserByEmailQuery, getUserByIdQuery } = require("../queries/userQueries");
const { sendMailer } = require("../services/sendMail");
const { WarningHTML } = require("../utils/generateWarningHTML");

// Model Scaffolding
const blogController = {};

// Model Structure

// @GET: all blogs
blogController.getBlogs = async (req, res) => {
    try {
        const result = await pool.query(getAllBlogs);
        if (result.rowCount === 0) {
            return res.status(200).json({ message: "No blogs found!" })
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

// @GET: single blog by it's id
blogController.getBlogByUserId = async (req, res) => {
    try {
        // User Id check
        const userId = req.params.userId && typeof req.params.userId === 'string' && req.params.userId.length === 36 ? req.params.userId : false;

        // if id is not valid send response
        if (!userId) {
            return res.status(400).json({ message: "Invalid request! get a valid id" });
        }

        // check blog database for this id
        const blog = await pool.query(getBlogByUserIdQuery, [userId]);

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
        const status = req.body?.status && typeof req.body.status === 'string' && req.body.status.trim().length > 0 && ['draft', 'published'].includes(req.body.status) ? req.body.status.trim() : "draft";

        // banner/image check
        const banner = req.body?.banner && typeof req.body.banner === 'string' && req.body.banner.trim().length > 0 ? req.body.banner.trim() : false;

        // author_email uuid check 
        const author_email = req.body?.author_email && typeof req.body.author_email === 'string' && req.body.author_email.trim().length > 0 ? req.body.author_email : false;

        // check if any required field is empty!
        if (!title || !description || !banner || !author_email) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // check if author id is same as the loggedin user id
        if (author_email !== req.loggedInUser?.email) {
            return res.status(403).json({ message: "Something went wrong! try again later!" });
        }

        // get author information from the 
        const author = await pool.query(getUserByEmailQuery, [author_email]);

        // get author id from the user 
        const author_id = author.rows[0]?.user_id;

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
        const banner = req.body?.banner && typeof req.body.banner === 'string' && req.body.banner.trim().length > 0 ? req.body.banner.trim() : false;

        // check if any required field is empty!
        if (!title && !description && !banner && (!status && status !== null)) {
            return res.status(400).json({ message: "To update at least one field is required!" });
        }

        // get user information using req.loggedInUser data
        const user = await pool.query(getUserByEmailQuery, [req.loggedInUser.email]);

        if (!user.rowCount) {
            return res.status(403).json({ message: "unauthorized!" });
        }

        //check for blog in the database
        const result = await pool.query(getBlogByIdQuery, [blog_id]);
        if (!result.rowCount > 0) {
            return res.status(400).json({ message: "Something went wrong! Try again later." })
        }
        const blog = result.rows[0];

        // check both userid and author id matches
        if (user.rows[0].user_id !== blog.author_id) {
            return res.status(403).json({ message: "unauthorized!" });
        }
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

        // get user information using req.loggedInUser data
        const user = await pool.query(getUserByEmailQuery, [req.loggedInUser.email]);

        if (!user.rowCount) {
            return res.status(403).json({ message: "unauthorized!" });
        }

        const userId = user.rows[0].user_id;


        // search for blog in the database
        const blog = await pool.query(getBlogByIdQuery, [blog_id]);

        if (!blog.rowCount > 0) {
            return res.status(400).json({ message: "Could not delete blog!" });
        }

        if (userId !== blog.rows[0].author_id) {
            return res.status(403).json({ message: "unauthorized!" });
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

// @SPECIAL: Only Admin
blogController.blogToDraft = async (req, res) => {
    try {
        // check if user role is "admin"
        if (req.loggedInUser?.role !== "admin") {
            return res.status(403).json({ message: "Sorry! Route is authorized." })
        }

        // blog id check
        const blog_id = req.params.id && typeof req.params.id === 'string' && req.params.id.length > 0 && !isNaN(req.params.id) ? req.params.id : false;

        // message check
        const message = req.body.message && typeof req.params.id === 'string' && req.params.id.length > 0 ? req.body.message : false;
        if (!blog_id) {
            return res.status(400).json({ message: "Invalid request! get a valid id" });
        }

        if (!message) {
            return res.status(400).json({ message: "At least a message is required!" });
        }
        // search for blog in the database
        const blog = await pool.query(getBlogByIdQuery, [blog_id]);

        if (!blog.rowCount > 0) {
            return res.status(400).json({ message: "There is no data about this blog!" });
        }

        // find the auther gmail from the database
        const result = await pool.query(getUserByIdQuery, [blog.rows[0].author_id]);

        if (!result.rowCount) {
            return res.status(500).json({ message: "There is a server side error!" });
        }

        // destructure user mail from result
        const { email: author_email } = result.rows[0];

        // constants variables
        const BLOG_TITLE = blog.rows[0].blog_title || "";
        const EMAIL_SUBJECT = `WARNING: ${BLOG_TITLE}`;

        // send mail to the author
        const send = await sendMailer(author_email, EMAIL_SUBJECT, WarningHTML(message, BLOG_TITLE));

        if (!send) {
            return res.status(500).json({ message: "Could not send mail to the author!" });
        }

        // change the status to draft
        const statusChange = await pool.query(updateBlogStatusQuery, ['draft', blog_id]);

        if (!statusChange.rowCount > 0) {
            return res.status(500).json({ message: "Admin: Could not update status!" })
        }

        return res.status(200).json({ message: "Author notified and updated blog status to 'Draft'! " });
    } catch (error) {
        res.status(500).json({ message: "There is a server side error!" });
    }
}
// Export Model
module.exports = blogController;