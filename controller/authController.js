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
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../config/db");
const { duplicateEmailCheckQuery } = require("../queries/userQueries");

// Model Scaffolding
const authController = {};

// Model Structure
// login user
// @path: '/login'
authController.logIn = async (req, res) => {
    try {
        //check inputs
        //email
        const email = req.body?.email && typeof req.body.email === "string" && req.body.email.trim().length > 0 ? req.body.email : false;

        //password
        const password = req.body?.password && typeof req.body.password === "string" && req.body.password.length > 0 ? req.body.password : false;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields required!" })
        }

        // check if user exists
        const user = await pool.query(duplicateEmailCheckQuery, [email]);

        if (!user.rowCount > 0) {
            return res.status(401).json({ message: "Invalid email or password!" })
        }
        const loggedInUser = user.rows[0] || {};

        //compare password with bcrypt
        const isValidPass = await bcrypt.compare(password, loggedInUser.user_password)
        if (!isValidPass) {
            return res.status(401).json({ message: "Invalid email or password!" })
        }

        //create a access token
        const accessToken = jwt.sign(
            {
                loggedInuser: {
                    email: loggedInUser.email,
                    role: loggedInUser.role
                }
            },
            process.env.JWT_ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        // create refresh token
        const refreshToken = jwt.sign(
            { email: loggedInUser.email },
            process.env.JWT_REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        // set refresh token at the cookie
        res.cookie("blog_jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        res.status(200).json({ token: accessToken })
    } catch (error) {
        res.status(500).json({ message: "There is a server side error!" })
    }
}

// refresh token generator
// @path: '/refresh'
authController.refresh = async (req, res) => {
    try {
        //get cookie from the request
        const cookies = req.cookies;
        console.log(cookies);
        if (!cookies.blog_jwt) {
            return res.status(401).json({ message: "Unauthoried! Authorizaion failure." })
        }

        const refreshToken = cookies.blog_jwt;

        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET, async (err, data) => {
            if (err) {
                return res.status(401).json({ message: "Unauthoried! Authorizaion failure." })
            }
            // get user data
            const user = await pool.query(duplicateEmailCheckQuery, [data.email])
            if (!user) {
                return res.status(401).json({ message: "Unauthoried! Authorizaion failure." })
            }

            //generate access token again
            const accessToken = jwt.sign(
                {
                    loggedInuser: {
                        email: loggedInUser.email,
                        role: loggedInUser.role
                    }
                },
                process.env.JWT_ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" }
            );

            return res.status(200).json({ token: accessToken });
        });
    } catch (error) {
        res.status(500).json({ message: "There is a server side error!" })
    }
}

// Export Model
module.exports = authController;