/*
 *
 *
 ------->Title: auth controller
 ->Description: this controller is to provide all type of auth controller function
 ------>Author: Shawon Talukder
 -------->Date: 06/23/2023
 *
 *
 */

// Dependencies
const pool = require("../config/db");
const {
    getAllTagsQuery,
    createTagQuery,
    getTagByTitleQuery,
    updateTagByTitleQuery,
    deleteTagByTitleQuery
} = require("../queries/tagQueries");

// Model Scaffolding
const tagsController = {};

// Model Structure

// all tags
// METHOD: GET
// @path: '/'
tagsController.getAllTags = async (req, res) => {
    try {
        const result = await pool.query(getAllTagsQuery);

        // if there is no tags
        if (!result.rowCount > 0) {
            return res.status(200).json({ message: "No tags Found!" });
        }

        const tags = result.rows[0];

        // return response
        res.status(200).json({ message: "Success!", data: tags });
    } catch (error) {
        return res.status(500).json({ message: "There is a server side error!" })
    }
}

// create tag
// METHOD: POST
// @path: '/'
tagsController.createTag = async (req, res) => {
    try {
        // title
        const title = req.body?.title && typeof req.body?.title === 'string' && req.body?.title.trim().length > 0 ? req.body?.title : false;

        // blog id
        const blogId = req.body?.blog_id && typeof req.body.blog_id === 'string' && req.body.blog_id.length > 0 && !isNaN(req.body.blog_id) ? req.body?.blog_id : null;

        if (!title) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        //insert into the database
        const result = await pool.query(createTagQuery, [title, blogId]);

        if (!result.rowCount) {
            return res.status(400).json({ message: "could not create tag by this name!" })
        }

        return res.status(201).json({ message: "tag created successfully!" })
    } catch (error) {
        return res.status(500).json({ message: "There is a server side error!" })
    }
}

// update tag by Name
// METHOD: PATCH
// @path: '/:tagTitle'
tagsController.updateTag = async (req, res) => {
    try {
        // title
        const title = req.params?.tagTitle ? req.params.tagTitle.trim().replace('-', ' ') : false;

        // updated title
        const updatedTitle = req.body.title && typeof req.body.title === 'string' && req.body.title.trim().length > 0 ? req.body.title : false;

        if (!title) {
            return res.status(400).json({ message: "Tag title is not valid!" });
        }
        if (!updatedTitle) {
            return res.status(400).json({ message: "Field Required!" });
        }

        // lookup in the database for this title
        const tags = await pool.query(getTagByTitleQuery, [title]);

        if (!tags.rowCount > 0) {
            return res.status(400).json({ message: "Tag title is not valid!" });
        }

        if (req.loggedInUser?.role !== 'admin') {
            return res.status(401).json({ message: "Unauthorized! Only admin has access to this route." });
        }

        //set tag title with new updated one
        const result = await pool.query(updateTagByTitleQuery, [updatedTitle, title]);

        // if there is no row count, means no rows updated
        if (!result.rowCount) {
            return res.status(500).json({ message: "Could not update tag title!" });
        }
        // return success message
        return res.status(200).json({ message: "Tag title updated successfully!" });

    } catch (error) {
        return res.status(500).json({ message: "There is a server side error!" })
    }
}

// delete tag by name
// METHOD: DELETE
// @PATH: '/:tagTitle'
tagsController.removeTag = async (req, res) => {
    try {
        // title
        const title = req.params?.tagTitle ? req.params.tagTitle.trim().replace('-', ' ') : false;

        if (!title) {
            return res.status(400).json({ message: "Tag title is not valid!" });
        }

        // lookup in the database for this title
        const tags = await pool.query(getTagByTitleQuery, [title]);

        if (!tags.rowCount > 0) {
            return res.status(400).json({ message: "Tag title is not valid!" });
        }

        if (req.loggedInUser?.role !== 'admin') {
            return res.status(401).json({ message: "Unauthorized! Only admin has access to this route." });
        }

        // continue deleting from the database
        const result = await pool.query(deleteTagByTitleQuery, [title]);

        if (!result.rowCount) {
            return res.status(500).json({ message: "Could not delete tag!" });
        }

        // return success message
        return res.status(200).json({ message: "Tag deleted successfully!!" });

    } catch (error) {
        return res.status(500).json({ message: "There is a server side error!" })
    }
}
// Export Model
module.exports = tagsController;