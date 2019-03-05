var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'ddjackson272',
    database : 'join_us'
})

app.get("/", function(req, res){
    var q = "select count(*) as count from users";
    connection.query(q, function(err,results){
        if (err) throw err;
        var count = (results[0].count);
        //res.send("We have " + count + " users in our database!")
        res.render("home", {data: count});
    })
});

app.get("/joke", function(req, res){
    var joke = "HeiHei";
    res.send(joke);
})

app.get("/random_num", function(req, res){
    var num = Math.floor((Math.random() * 10) + 1);
    res.send("Your lucky number is " + num);
});

app.post("/register", function(req, res){
    var person = {email: req.body.email};
    connection.query('insert into users set ?', person, function(err, results){
        if (err) throw err;
        res.redirect("/");
    })
})

app.listen(8080, function(){
    console.log("Server running on 8080!")
});

