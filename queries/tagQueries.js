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

// @SELECT/GET: All TAGS
tagQueries.getTagByTitleQuery = `SELECT * FROM tags WHERE tag_title ilike $1`;

// @INSERT/CREATE: a TAG
tagQueries.createTagQuery = `INSERT INTO tags(tag_title, blog_id) VALUES ($1, $2);`;

// @INSERT/CREATE: a TAG
tagQueries.updateTagByTitleQuery = `UPDATE tags SET tag_title = $1 WHERE tag_title ilike $2`;

// Export Model
module.exports = tagQueries;