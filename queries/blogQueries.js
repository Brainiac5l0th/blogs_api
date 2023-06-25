/*
 *
 *
 ------->Title: blog queries
 ->Description: this is query file for blogs
 ------>Author: Shawon Talukder
 -------->Date: 06/23/2023
 *
 *
 */

// Model Scaffolding
const blogQueries = {};

// Model Structure
blogQueries.getAllBlogs =
    `SELECT 
        blogs.blog_id, 
        blogs.blog_title, 
        CASE
            WHEN LENGTH(blogs.blog_description) > 100 THEN CONCAT(LEFT(blogs.blog_description, 100), '...')
            ELSE blogs.blog_description
        END blog_description, 
        blogs.blog_banner, 
        blogs.blog_status,
        (
            SELECT COUNT(*)::INTEGER as likes 
            FROM likes 
            WHERE likes.blog_id =  blogs.blog_id
        ), 
        (
            SELECT COUNT(*)::INTEGER as comments 
            FROM comments 
            WHERE comments.blog_id = blogs.blog_id
        ), 
        (
            SELECT 
                CONCAT(users.firstName,' ',users.lastName)  as author_name 
            FROM users 
            WHERE blogs.author_id = users.user_id
        ),
        blogs.created_at,
        blogs.author_id
    FROM blogs
    LEFT JOIN users ON blogs.author_id = users.user_id
    LEFT JOIN likes USING(blog_id)
    LEFT JOIN comments USING(blog_id)
    ORDER BY blogs.created_at;`;

// Export Model
module.exports = blogQueries;