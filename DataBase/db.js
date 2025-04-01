const postgres = require('postgres');
const sql = postgres( "postgresql://linkcode_user:niRrDgV0vTwF9nWqNG3ZNVVBkwuueO6C@dpg-cv8jqsggph6c73aca8gg-a.oregon-postgres.render.com/linkcode", {
    ssl: 'require'
});



module.exports = sql;