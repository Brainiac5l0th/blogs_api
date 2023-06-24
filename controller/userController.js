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
    addUserQuery,
    updateUserFirstNameQuery,
    updateUserLastNameQuery,
    updateUserMiddleNameQuery,
    updateUserPasswordQuery,
    updateUserDOBQuery,
    userCheckQuery,
    deleteUserQuery
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
        const id = req.params?.id && typeof req.params.id === 'string' && req.params.id.length === 36 ? req.params.id : false;

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

// @POST: A user
userController.createUser = async (req, res) => {
    try {
        //get id from the params
        const { body } = req;

        // check the data
        // firstName check
        const firstName = body?.firstName && typeof body.firstName === "string" && body.firstName.trim().length > 0 ? body.firstName : false;

        // middleName check
        const middleName = body?.middleName;

        // lastName check
        const lastName = body?.lastName && typeof body.lastName === "string" && body.lastName.trim().length > 0 ? body.lastName : false;

        // email check
        const email = body?.email && typeof body.email === "string" && body.email.trim().length > 0 ? body.email : false;

        // password check
        const password = body?.password && typeof body.password === "string" && body.password.trim().length > 0 ? body.password : false;

        // dateOfBirth check
        const dateOfBirth = body?.dateOfBirth && typeof body.dateOfBirth === "string" && body.dateOfBirth.trim().length > 0 ? body.dateOfBirth : false;

        // role check : Don't need 
        // const role = body?.role && typeof body.role === "string" && body.role.trim().length > 0 && ["admin", "user"].includes(body.role) ? body.role : false;

        //check if any field is false or empty
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "All fields required!" })
        }
        //check if email already exists
        const duplicateEmail = await pool.query(duplicateEmailCheckQuery, [email]);

        // return 409:conflict if email already exists
        if (duplicateEmail.rows?.length > 0) {
            return res.status(400).json({ message: "Could not create user!" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // add user to the database
        const newUser = await pool.query(addUserQuery, [firstName, middleName, lastName, email, hashedPassword, dateOfBirth]);

        if (!newUser.rowCount > 0) {
            return res.status(400).json({ message: "Could not create user!" });
        }
        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        res.status(500).json({ message: "There is a server side error" });
    }
}

// @PATCH: user by id
userController.updateUser = async (req, res) => {
    try {
        //get id from the params
        const { body } = req;

        // check the data
        // id check
        const id = req.params?.id && typeof req.params.id === 'string' && req.params.id.length === 36 ? req.params.id : false;

        if (!id) {
            return res.status(400).json({ message: "Invalid request! Give a valid id" })
        }
        // check the data
        // firstName check
        const firstName = body?.firstName && typeof body.firstName === "string" && body.firstName.trim().length > 0 ? body.firstName : false;

        // middleName check
        const middleName = body?.middleName

        // lastName check
        const lastName = body?.lastName && typeof body.lastName === "string" && body.lastName.trim().length > 0 ? body.lastName : false;

        // email check
        const email = body?.email && typeof body.email === "string" && body.email.trim().length > 0 ? body.email : false;

        // password check
        const password = body?.password && typeof body.password === "string" && body.password.trim().length > 0 ? body.password : false;

        // dateOfBirth check
        const dateOfBirth = body?.dateOfBirth && typeof body.dateOfBirth === "string" && body.dateOfBirth.trim().length > 0 ? body.dateOfBirth : false;

        //check if all fields are false or empty
        if (!firstName && !lastName && !email && !password && !dateOfBirth) {
            return res.status(400).json({ message: "At least A field data is required!" })
        }
        //check if user exists in the database
        const userCheck = await pool.query(userCheckQuery, [id, email])

        if (!userCheck) {
            return res.status(400).json({ message: "Invalid request! No users found." })
        }
        //update the user information if there is user
        let updated = false;
        if (firstName) {
            await pool.query(updateUserFirstNameQuery, [firstName, id])
            updated = true;
        }
        if (lastName) {
            await pool.query(updateUserLastNameQuery, [lastName, id])
            updated = true;
        }
        if (middleName || middleName === null) {
            await pool.query(updateUserMiddleNameQuery, [middleName, id])
            updated = true;
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await pool.query(updateUserPasswordQuery, [hashedPassword, id])
            updated = true;
        }
        if (dateOfBirth) {
            await pool.query(updateUserDOBQuery, [dateOfBirth, id])
            updated = true;
        }
        if (!updated) {
            return res.status(400).json({ message: "Could not update the user!" })
        }
        return res.status(200).json({ message: "User updated successfully!" })
    } catch (error) {
        res.status(500).json({ message: "There is a server side error" });
    }
}

// @DELETE: by id
userController.deleteUser = async (req, res) => {
    try {
        // id check
        const id = req.params?.id && typeof req.params.id === 'string' && req.params.id.length === 36 ? req.params.id : false;

        if (!id) {
            return res.status(400).json({ message: "Invalid request! Give a valid id" })
        }
        //check if exists user
        const userCheck = await pool.query(getUserByIdQuery, [id]);

        // notify user if there is no data against the id
        if (!userCheck.rowCount > 0) {
            return res.status(400).json({ message: "Invalid request!" })
        }

        //delete user from database
        const deletedUser = await pool.query(deleteUserQuery, [id]);

        // if no operation completed notify the user
        if (!deletedUser.rowCount > 0) {
            return res.status(500).json({ message: "Could not delete the user!" })
        }
        return res.status(200).json({ message: `User deleted successfully!` })
    } catch (error) {

    }
}

// Export Model
module.exports = userController;