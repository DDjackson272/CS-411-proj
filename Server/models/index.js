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
//     user : 'tutorial_user',
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
    "user_id int NOT NULL AUTO_INCREMENT," +
    "email varchar(255) NOT NULL UNIQUE," +
    "username varchar(255) NOT NULL UNIQUE," +
    "password varchar(255) NOT NULL," +
    "img varchar(255) NOT NULL," +
    "PRIMARY KEY (user_id)" +
    ");";

let housing = "create table Housing (" +
    "housing_id int NOT NULL AUTO_INCREMENT," +
    "user_id int NOT NULL," +
    "address varchar(255) NOT NULL UNIQUE," +
    "PRIMARY KEY (housing_id)," +
    "FOREIGN KEY (user_id) REFERENCES User (user_id)" +
    ");";

connection.query(user, function(err){
    if (err) {
        console.log(err.message);
    }
});

connection.query(housing, function(err){
   if (err) {
       console.log(err.message)
   }
});

module.exports = connection;