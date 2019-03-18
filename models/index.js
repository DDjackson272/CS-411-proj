const mysql = require('mysql');

// Connect to local database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "CS411!!!",
    database: "cs411proj",
    port: "3306"
});

// Connect to aws
// var connection = mysql.createConnection({
//     host : 'tutorial-db-web.cjb5il7njevi.us-east-2.rds.amazonaws.com',
//     user.js : 'tutorial_user',
//     database : 'sample',
//     password : ''
// });

connection.connect(function(err){
    if(err) {
        console.log("Database not connected!");
        throw err;
    }
    console.log('Database connected!');
});

// first create table in case they do not exist
let user = "create table User (" +
    "email varchar(255) NOT NULL," +
    "username varchar(255) NOT NULL," +
    "password varchar(255) NOT NULL," +
    "img varchar(255) NOT NULL," +
    "PRIMARY KEY (email)" +
    ");";

connection.query(user, function(err){
    if (err) {
        console.log("Table already exists!");
    }
});

module.exports = connection;