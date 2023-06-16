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
// @SELECT/GET: All users
userQueries.getUsersQuery = "SELECT * FROM users";

// @SELECT/GET: user by id
userQueries.getUserByIdQuery = "SELECT * FROM users WHERE id = $1";

// @SELECT/GET: user by email 
userQueries.duplicateEmailCheckQuery = "SELECT u FROM users u WHERE u.email = $1";

// @INSERT/CREATE: user by email 
userQueries.addUserQuery = "INSERT INTO users(fullname, email, role) VALUES ($1, $2, $3)";

// Export Model
module.exports = userQueries;