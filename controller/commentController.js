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
const { getUserByEmailQuery } = require("../queries/userQueries");
const { getBlogByIdQuery } = require("../queries/blogQueries");
const {
    getCommentsByIdQuery, createCommentQuery
} = require("../queries/commentQueries");

// Model Scaffolding
const commentController = {};

// Model Structure

/* 
 * function: getCommentsById
 * @Params: 
 * ---blog id 
 * returns: all comments against the blogId
 */
commentController.getCommentsById = async (req, res) => {
    try {
        // blog id 
        const blogId = req.params?.blogId && typeof req.params.blogId === 'string' && req.params.blogId.trim().length > 0 && !isNaN(req.params.blogId) ? req.params.blogId : false;

        if (!blogId) {
            return res.status(400).json({ message: "Invalid blog id!" });
        }
        // lookup blogs table if blog with this id exists
        const blog = await pool.query(getBlogByIdQuery, [blogId]);

        if (!blog.rowCount) {
            // means there is no data for this id
            return res.status(400).json({ message: "Invalid Request! There is no data against this id." });
        }

        // lookup for comments in the database
        const result = await pool.query(getCommentsByIdQuery, [blogId]);

        if (!result.rowCount) {
            return res.status(200).json({ message: "No comments found!" });
        }

        // return success message with all comments
        return res.status(200).json({ message: "Success!", data: result.rows });
    } catch (error) {
        return res.status(500).json({ message: "there is a server side error!" });
    }
}

/* 
 * function: createComment
 * @Params: 
 * ---blog id 
 * returns: success message after creating a comment 
 */
commentController.createComment = async (req, res) => {
    try {
        // blog id 
        const blogId = req.params?.blogId && typeof req.params.blogId === 'string' && req.params.blogId.trim().length > 0 && !isNaN(req.params.blogId) ? req.params.blogId : false;

        // comment text
        const commentText = req.body.comment && typeof req.body.comment === 'string' && req.body.comment.trim().length > 0 ? req.body.comment : false;

        if (!blogId) {
            return res.status(400).json({ message: "Invalid blog id!" });
        }
        if (!commentText) {
            return res.status(400).json({ message: "Invalid request! Field required." });
        }

        // lookup blogs table if blog with this id exists
        const blog = await pool.query(getBlogByIdQuery, [blogId]);

        if (!blog.rowCount) {
            // means there is no data for this id
            return res.status(400).json({ message: "Invalid Request! There is no data against this id." });
        }

        const userEmail = req.loggedInUser?.email || '';
        if (!userEmail) {
            return res.status(401).json({ message: "Authentication Failure!" });
        }

        // get user information from users table
        const users = await pool.query(getUserByEmailQuery, [userEmail]);
        if (!users.rowCount) {
            return res.status(401).json({ message: "Authentication Failure!" });
        }
        //destructure user id from user object
        const userId = users.rows[0].user_id;

        // insert comment in the database
        const saveComment = await pool.query(createCommentQuery, [commentText, userId, blogId]);

        if (!saveComment.rowCount) {
            return res.status(500).json({ message: "Could not create comment!" });
        }

        // return success message
        return res.status(201).json({ message: "Comment created successfully!" });

    } catch (error) {
        return res.status(500).json({ message: "there is a server side error!" });
    }
}

// Export Model
module.exports = commentController;