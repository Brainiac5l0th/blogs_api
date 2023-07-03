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
    getAllTagsQuery
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

        const tags = result.rows;

        // return response
        res.status(200).json({ message: "Success!", data: tags });
    } catch (error) {
        return res.status(500).json({ message: "There is a server side error!" })
    }
}
// Export Model
module.exports = tagsController;