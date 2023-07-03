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
    `SELECT DISTINCT tag_title FROM tags WHERE status='active';`

// Export Model
module.exports = tagQueries;