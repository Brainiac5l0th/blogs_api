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
userQueries.getUsersQuery = "SELECT user_id, firstName, middleName, lastName, email, date_of_birth, role_id FROM users";

// @SELECT/GET: user by id
userQueries.getUserByIdQuery = "SELECT * FROM users WHERE id = $1";

// @SELECT/GET: user by email 
userQueries.duplicateEmailCheckQuery = "SELECT u FROM users u WHERE u.email = $1";

// @INSERT/CREATE: create user  
userQueries.addUserQuery = "INSERT INTO users (firstName, middleName, lastName, email, user_password, date_of_birth) VAlUES ($1, $2, $3, $4, $5, $6);";

// Export Model
module.exports = userQueries;