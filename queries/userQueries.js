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
userQueries.getUsersQuery = "SELECT users.user_id, users.firstName, users.middleName, users.lastName, users.email, users.date_of_birth, user_roles.role_name as role FROM users JOIN user_roles USING (role_id) ORDER BY role, users.firstName;";

// @SELECT/GET: user by id
userQueries.getUserByIdQuery = "SELECT users.user_id, users.firstName, users.middleName, users.lastName, users.email, users.user_password, users.date_of_birth, user_roles.role_name as role FROM users JOIN user_roles USING (role_id) WHERE users.user_id = $1";

// @SELECT/GET: user by email or id 
userQueries.userCheckQuery = "SELECT * FROM users WHERE user_id = $1 OR email = $2 ";

// @SELECT/GET: user by email 
userQueries.duplicateEmailCheckQuery = "SELECT u FROM users u WHERE u.email = $1";

// @INSERT/CREATE: create user  
userQueries.addUserQuery = "INSERT INTO users (firstName, middleName, lastName, email, user_password, date_of_birth) VAlUES ($1, $2, $3, $4, $5, $6);";

// @ALTER/UPDATE: update user  
userQueries.updateUserFirstNameQuery = "UPDATE users SET firstName = $1 WHERE user_id = $2;"
userQueries.updateUserLastNameQuery = "UPDATE users SET lastName = $1 WHERE user_id = $2;"
userQueries.updateUserMiddleNameQuery = "UPDATE users SET middleName = $1 WHERE user_id = $2;"
userQueries.updateUserPasswordQuery = "UPDATE users SET user_password = $1 WHERE user_id = $2;"
userQueries.updateUserDOBQuery = "UPDATE users SET date_of_birth = $1 WHERE user_id = $2;"

// @DELETE: delete user
userQueries.deleteUserQuery = "DELETE FROM users WHERE user_id = $1;"

// Export Model
module.exports = userQueries;