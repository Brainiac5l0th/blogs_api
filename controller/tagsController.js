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
    createTagQuery
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
            return res.status(204).json({ message: "No tags Found!" });
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
        const blogId = req.body?.blog_id && typeof req.params.blog_id === 'string' && req.params.blog_id.length > 0 && !isNaN(req.params.blog_id) ? req.body?.blog_id : null;

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
// Export Model
module.exports = tagsController;