const express = require('express');
const userRoutes = require('./routes/user');
const housingRoutes = require("./routes/housing");
const methodOverride = require('method-override');
const app = express();
const bodyParser = require('body-parser');
const flash = require("connect-flash");
const PORT = 80;

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.use(methodOverride('_method'));

app.use(require("express-session")({
    secret: "CS411Project",
    resave: false,
    saveUninitialized: false
}));

app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/user", userRoutes);

app.use("/user/:id/housing", housingRoutes);

app.listen(PORT, function(){
    console.log("server running!")
});