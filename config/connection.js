require('dotenv').config();
const mysql = require('mysql2');

// Creates the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  // Your MySQL username
  user: process.env.DB_USER,
  // Your MySQL password
  password: process.env.DB_PW,
  database: process.env.DB_NAME
});

module.exports = connection;
