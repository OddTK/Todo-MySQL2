const mysql = require('mysql2');
// creating server to connect with todos_db
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'todos_db'
}).promise();

// exporting our connection variable
module.exports = connection;
