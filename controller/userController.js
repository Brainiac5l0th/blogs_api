/*
 *
 *
 ------->Title: user controller
 ->Description: 
 ------>Author: Shawon Talukder
 -------->Date: 06/16/2023
 *
 *
 */

// Dependencies
const pool = require("../config/db");
const {
    getUsersQuery,
    getUserByIdQuery
} = require("../queries/userQueries");

// Model Scaffolding
const userController = {};

// Model Structure
// @GET: all users
userController.getUsers = async (req, res) => {
    try {
        const result = await pool.query(getUsersQuery);
        if (result.rows?.length === 0) {
            return res.status(204).json({ message: "Table is empty." })
        }
        res.status(200).json({ message: "Success", data: result.rows })
    } catch (error) {
        res.status(500).json({ message: "There is a server side error" })
    }
}

// @GET: all users
userController.getUserById = async (req, res) => {
    try {
        //get id from the params
        const { id } = req.params;

        const result = await pool.query(getUserByIdQuery, [int(id)]);
        console.log(result);
        res.status(200).json({ message: "Success", data: result.rows });
    } catch (error) {
        res.status(500).json({ message: "There is a server side error" });
    }
}

// Export Model
module.exports = userController;