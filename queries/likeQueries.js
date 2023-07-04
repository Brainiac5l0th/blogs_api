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

//@SELECT/GET: persons who liked the blogId
likeQueries.getPersonsLikedBlogQuery =
    `
        SELECT users.user_id as id, 
        (
            SELECT 
                CONCAT(users.firstName,' ',users.lastName)  as fullName 
            FROM users 
            WHERE likes.user_id = users.user_id
        )
        FROM likes 
        JOIN users USING(user_id)
        WHERE likes.blog_id = $1;
    `
// @INSERT: like 
likeQueries.likeBlogByIdQuery = `INSERT INTO likes(user_id, blog_id) VALUES($1, $2);`;

// @DELETE : like Having blogId and userId
likeQueries.removeLikeByIdQuery = `DELETE FROM likes WHERE user_id=$1 AND blog_id=$2;`;
// Export Model
module.exports = likeQueries;