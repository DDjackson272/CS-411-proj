require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const housingRoutes = require("./routes/housing");
const bodyParser = require('body-parser');
const {loginRequired, ensureCorrectUser} = require("./middleware/auth");
const bcrypt = require("bcrypt");
const db = require("./models/index");
const flash = require("connect-flash");
const PORT = 80;

app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.use(require("express-session")({
    secret: "cs411proj",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.use("/api/users/:id/housing", housingRoutes);

// add encryption of password to not show them explicitly in database
// used for un-restful api

// app.post("/register", async function(req, res){
//     let person = {email: req.body.email,
//                 username: req.body.username,
//                 img: req.body.img,
//                 password: req.body.password};
//
//     person.password = await bcrypt.hash(person.password, 10);
//
//     db.query('insert into User set ?', person, function(err){
//         if (err) {
//             if (err.errno === 1062) {
//                 // alert("This email address has been registered! Try another one.");
//                 req.flash("error", "This email address has been registered! Try another one.");
//                 res.redirect("/");
//                 // console.log("This email address has been registered! Try another one.");
//             } else {
//                 req.flash("error", err.message);
//                 res.redirect("/");
//             }
//         } else {
//             req.flash("success", "Register successfully!");
//             res.redirect("/");
//         }
//     })
// });

app.use(function(req, res, next){
    return next({
        status: 404,
        message: "NOT FOUND"
    });
});

app.use(errorHandler);

app.listen(PORT, function(){
    console.log("Server running!")
});

