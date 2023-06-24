/*
 *
 *
 ------->Title: check login
 ->Description: this file is to handle auth from user and verify the login
 ------>Author: Shawon Talukder
 -------->Date: 06/24/2023
 *
 *
 */

// Dependencies
const jwt = require("jsonwebtoken");

// Model Structure
const checkLogin = (req, res, next) => {
    try {
        const header = req.headers;
        const auth = header?.authorization || header?.Authorization;
        if (!auth) {
            return res.status(401).json({ message: "Authentication failure!" });
        }
        if (!auth.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Authentication failure!" });
        }
        const token = auth.split(" ")[1];

        //get logged in user data from the jwt
        const { loggedInuser } = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET) || {}

        //if no data return response
        if (!loggedInuser) {
            return res.status(401).json({ message: "Authentication failure!" });
        }

        //set global variable loggedInUser
        req.loggedInUser = { ...loggedInuser };
        next();
    } catch (error) {
        return res.status(500).json({ message: "There is a server side error!" })
    }
}


// Export Model
module.exports = checkLogin 