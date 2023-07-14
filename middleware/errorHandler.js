/*
 *
 *
 ------->Title: error handler
 ->Description: 
 ------>Author: Shawon Talukder
 -------->Date: MM/DD/2023
 *
 *
 */

//model scaffolding
const errorHandler = (req, res, next, err) => {
    const status = res.statusCode ? res.statusCode : 500;
    res.status(status).json({ message: err.message, isError: true });
};

//export model
module.exports = errorHandler;