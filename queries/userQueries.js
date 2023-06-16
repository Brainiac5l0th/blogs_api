/*
 *
 *
 ------->Title: user queries
 ->Description: this file is to contain all queries about users.
 ------>Author: Shawon Talukder
 -------->Date: 06/16/2023
 *
 *
 */

// Dependencies


// Model Scaffolding
const userQueries = {};

// Model Structure
// @GET: All users
userQueries.getUsersQuery = "SELECT * FROM users";

// @GET: A user by id
userQueries.getUserByIdQuery = "SELECT * FROM users WHERE id = $1";

// Export Model
module.exports = userQueries;