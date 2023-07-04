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
const tagQueries = {};

// Model Structure
// @SELECT/GET: All TAGS
tagQueries.getAllTagsQuery =
    `SELECT ARRAY_AGG(DISTINCT tag_title::VARCHAR) tags FROM tags WHERE status='active';`

// @INSERT/CREATE: a TAG
tagQueries.createTagQuery = `INSERT INTO tags(tag_title, blog_id) VALUES ($1, $2);`;

// Export Model
module.exports = tagQueries;