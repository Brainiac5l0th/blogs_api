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
const { duplicateEmailCheckQuery } = require("../queries/userQueries");
const {
    getLikesByIdQuery,
    removeLikeByIdQuery
} = require("../queries/likeQueries");

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

        // status
        const status = req.params?.status && typeof req.params.status === 'string' && req.params.status.trim().length > 0 && ['like', 'dislike'].includes(req.params.status) ? req.params.status : false;

        //if there is no blog id or status notify user
        if (!blogId || !status) {
            return res.status(400).json({ message: "Invalid request! All fields required." });
        }

        // get email from loggedInUser
        const userEmail = req.loggedInUser?.email || '';

        if (!userEmail) {
            return res.status(401).json({ message: "Authentication failure! please login" });
        }

        // get user information from the database
        const user = await pool.query(duplicateEmailCheckQuery, [userEmail]);

        if (!user.rowCount) {
            return res.status(401).json({ message: "Authentication failure! please login" });
        }

        // destructure the user id
        const userId = user.rows[0].user_id;
        console.log(userId);
        // lookup the likes::database if there is any for the user
        const isLiked = await pool.query(getLikesByIdQuery, [userId, blogId]);

        if (isLiked) {
            if (status === 'like') {
                return res.status(400).json({ message: "You can not double like a post." });
            }
            // if status is dislike, remove the liked one
            const removeLike = await pool.query(removeLikeByIdQuery, [userId, blogId]);
            if (!removeLike.rowCount) {
                return res.status(500).json({ message: "Could not perform the task::dislike." });
            }
            // return success message
            return res.status(200).json({ message: "Like removed successfully!" })
        } else {

        }
    } catch (error) {
        return res.status(500).json({ message: "there is a server side error!" });
    }
}
// Export Model
module.exports = likesController;