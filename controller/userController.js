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
const bcrypt = require("bcrypt");
const pool = require("../config/db");
const {
    getUsersQuery,
    getUserByIdQuery,
    duplicateEmailCheckQuery,
    addUserQuery
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

        // id check
        const id = req.params?.id && !isNaN(req.params.id) ? req.params.id : false;

        //if id invalid return code 400 
        if (!id) {
            return res.status(400).json({ message: "Invalid request!" });
        }

        // fetch data from query
        const result = await pool.query(getUserByIdQuery, [id]);

        if (result?.rows?.length === 0 || !result.rows[0]?.email) {
            return res.status(404).json({ message: "No user found!" });
        }
        res.status(200).json({ message: "Success", data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: "There is a server side error" });
    }
}

// @GET: all users
userController.createUser = async (req, res) => {
    try {
        //get id from the params
        const { body } = req;

        // check the data
        // fullname check
        const fullname = body?.fullname && typeof body.fullname === "string" && body.fullname.trim().length > 0 ? body.fullname : false;

        // email check
        const email = body?.email && typeof body.email === "string" && body.email.trim().length > 0 ? body.email : false;

        // password check
        const password = body?.password && typeof body.password === "string" && body.password.trim().length > 0 ? body.password : false;

        // role check
        const role = body?.role && typeof body.role === "string" && body.role.trim().length > 0 && ["Admin", "User"].includes(body.role) ? body.role : false;

        //check if any field is false or empty
        if (!fullname || !email || !password || !role) {
            return res.status(400).json({ message: "All fields required!" })
        }
        //check if email already exists
        const duplicateEmail = await pool.query(duplicateEmailCheckQuery, [email]);

        // return 409:conflict if email already exists
        if (duplicateEmail.rows?.length > 0) {
            return res.status(409).json({ message: "Email already exists!" })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        // add user to the database
        const newUser = await pool.query(addUserQuery, [fullname, email, role]);
        if (!newUser.rowCount > 0) {
            return res.status(400).json({ message: "Could not create user!" })
        }
        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "There is a server side error" });
    }
}

// Export Model
module.exports = userController;