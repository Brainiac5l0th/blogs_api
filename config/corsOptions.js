/*
 *
 *
 ------->Title: 
 ->Description: 
 ------>Author: Shawon Talukder
 -------->Date: 06/25/2023
 *
 *
 */

// Dependencies
const { allowedOrigins } = require("../config/allowedOrigin.js");

// model configuration
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS!"));
        }
    },
    credentials: true,
    optionSuccessStatus: 200,
}

// Export Model
module.exports = corsOptions;