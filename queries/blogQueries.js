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

// get all blogs joined with tags, comments, likes
blogQueries.getAllBlogs =
    `SELECT 
        blogs.blog_id, 
        blogs.blog_title, 
        CASE
            WHEN LENGTH(blogs.blog_description) > 100 
                THEN CONCAT(LEFT(blogs.blog_description, 100), '...')
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

// get single blog using id
blogQueries.getBlogByIdQuery = `
    SELECT 
        blogs.blog_id, 
        blogs.blog_title, 
        blogs.blog_description, 
        blogs.blog_banner, 
        blogs.blog_status,
        (
            SELECT COUNT(*)::INTEGER as likes 
            FROM likes 
            WHERE likes.blog_id =  blogs.blog_id
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
    WHERE blogs.blog_id = $1;`

// get single blog using id
blogQueries.getBlogByUserIdQuery = `
    SELECT 
        blogs.blog_id, 
        blogs.blog_title, 
        blogs.blog_description, 
        blogs.blog_banner, 
        blogs.blog_status,
        (
            SELECT COUNT(*)::INTEGER as likes 
            FROM likes 
            WHERE likes.blog_id =  blogs.blog_id
        ), 
        (
            SELECT 
                CONCAT(users.firstName,' ',users.lastName)  as author_name 
            FROM users 
            WHERE blogs.author_id = users.user_id
        ),
        blogs.created_at
    FROM blogs
    LEFT JOIN users ON blogs.author_id = users.user_id
    LEFT JOIN likes USING(blog_id)
    LEFT JOIN comments USING(blog_id)
    WHERE blogs.author_id = $1
    ORDER BY blogs.created_at desc;`


// insert into blogs database
blogQueries.createBlogQuery = `
    INSERT INTO blogs(blog_title, blog_description, blog_status, blog_banner, author_id) VALUES($1, $2, $3, $4, $5);
`;

// update blog title
blogQueries.updateBlogTitleQuery = `UPDATE blogs SET blog_title=$1 WHERE blog_id=$2;`

// update blog description
blogQueries.updateBlogDescriptionQuery = `UPDATE blogs SET blog_description=$1 WHERE blog_id=$2;`

// update blog banner
blogQueries.updateBlogBannerQuery = `UPDATE blogs SET blog_banner=$1 WHERE blog_id=$2;`

// update blog banner
blogQueries.updateBlogStatusQuery = `UPDATE blogs SET blog_status=$1 WHERE blog_id=$2;`

// delete blog banner
blogQueries.deleteFromBlogsQuery = `DELETE FROM blogs WHERE blog_id=$1;`

// Export Model
module.exports = blogQueries;