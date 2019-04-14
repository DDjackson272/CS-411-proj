const mysql = require('mysql');

// Connect to local database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "CS411!!!",
    database: "cs411proj",
    port: "3306"
});

// Connect to aws-rds
// var connection = mysql.createConnection({
//     host : 'tutorial-db-web.cjb5il7njevi.us-east-2.rds.amazonaws.com',
//     user : 'tutorial_user',
//     database : 'sample',
//     password : 'Zhe12345!'
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
    "img varchar(1024) NOT NULL," +
    "PRIMARY KEY (user_id)" +
    ");";

let housing = "create table Housing (" +
    "housing_id int NOT NULL AUTO_INCREMENT," +
    "housing_name varchar(255) NOT NULL,"+
    "housing_username varchar(255) NOT NULL," +
    "address varchar(255) NOT NULL," +
    "city varchar(255) NOT NULL," +
    "housing_type varchar(255) NOT NULL," +
    "description varchar(1024) NOT NULL, " +
    "img_url varchar(1024) NOT NULL, " +
    "PRIMARY KEY (housing_id)," +
    "FOREIGN KEY (housing_username) REFERENCES User (username)" +
    ");";

let activity = "create table Activity (" +
    "activity_id int NOT NULL AUTO_INCREMENT," +
    "activity_name varchar(255) NOT NULL," +
    "username varchar(255) NOT NULL," +
    "address varchar(255) NOT NULL," +
    "city varchar(255) NOT NULL," +
    "type varchar(255) NOT NULL," +
    "description varchar(1024) NOT NULL," +
    "date DATE NOT NULL," +
    "img_url varchar(1024) NOT NULL," +
    "PRIMARY KEY (activity_id), " +
    "FOREIGN KEY (username) REFERENCES User (username)" +
    ");";

let comment = "create table Comment (" +
    "comment_id int NOT NULL AUTO_INCREMENT," +
    "comment_housing_id int NOT NULL, " +
    "comment_user_id int NOT NULL, " +
    "content varchar(1024) NOT NULL," +
    "PRIMARY KEY (comment_id)," +
    "FOREIGN KEY (comment_housing_id) REFERENCES Housing (housing_id)," +
    "FOREIGN KEY (comment_user_id) REFERENCES User (user_id)" +
    ");";

// let sentiment = "create table Sentiment (" +
//     "sentiment_id int NOT NULL AUTO_INCREMENT," +
//     "comment_id int NOT NULL," +
//     "sentiment_type varchar(1024) NOT NULL," +
//     "PRIMARY KEY (sentiment_id)," +
//     "FOREIGN KEY (sentiment_comment_id) REFERENCES Comment (comment_id)" +
//     ");";

// let wordCloud = "create table Wordcloud (" +
//     "wordcloud_id int NOT NULL AUTO_INCREMENT," +
//     "housing_id int NOT NULL," +
//     "wordcloud_type varchar(1024) NOT NULL," +
//     "PRIMARY KEY (wordcloud_id)," +
//     "FOREIGN KEY (wordcloud_housing_id) REFERENCES Housing (housing_id)" +
//     ");";
//
let recommend = "create table Recommend (" +
    "recommend_id int NOT NULL AUTO_INCREMENT," +
    "recommend_username varchar(255) NOT NULL, " +
    "recommend_housing_id int NOT NULL," +
    "PRIMARY KEY (recommend_id)," +
    "FOREIGN KEY (recommend_username) REFERENCES User (username)," +
    "FOREIGN KEY (recommend_housing_id) REFERENCES Housing (housing_id)" +
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

connection.query(activity, function(err){
    if(err) {
        console.log(err.message);
    }
});

connection.query(comment, function(err){
    if(err){
        console.log(err.message);
    }
});

// connection.query(sentiment, function(err){
//     if(err){
//         console.log(err.message);
//     }
// });
//
// connection.query(wordCloud, function(err){
//     if(err){
//         console.log(err.message);
//     }
// });

connection.query(recommend, function(err){
    if(err){
        console.log(err.message)
    }
});

module.exports = connection;