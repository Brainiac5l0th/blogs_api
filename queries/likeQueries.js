/*
 *
 *
 ------->Title: like queries
 ->Description: this file is to contain all queries about like database.
 ------>Author: Shawon Talukder
 -------->Date: 07/04/2023
 *
 *
 */

// Dependencies


// Model Scaffolding
const likeQueries = {};

// Model Structure
// @SELECT/GET: likes from blogid and userid
likeQueries.getLikesByIdQuery =
    `SELECT * FROM likes WHERE user_id=$1 AND blog_id=$2;`

// @DELETE : like Having blogId and userId
likeQueries.removeLikeByIdQuery = `DELETE FROM likes WHERE user_id=$1 AND blog_id=$2;`;
// Export Model
module.exports = likeQueries;