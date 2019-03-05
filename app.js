var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
    host : 'tutorial-db-web.cjb5il7njevi.us-east-2.rds.amazonaws.com',
    user : 'tutorial_user',
    database : 'sample',
    password : 'Zhe12345!'
})

app.get("/", function(req, res){
    res.send("new")
    // var q = "select count(*) as count from sample";
    // connection.query(q, function(err,results){
    //     if (err) throw err;
    //     var count = (results[0].count);
    //     //res.send("We have " + count + " users in our database!")
    //     res.render("home", {data: count});
    // })
});

app.post("/register", function(req, res){
    var person = {name: req.body.Name, address: req.body.Address};
    connection.query('insert into sample set ?', person, function(err, results){
        if (err) throw err;
        res.redirect("/");
    })
})

app.listen(8080, function(){
    console.log("Server running!")
});

