require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const errorHandler = require("./handlers/error");
const userRoutes = require("./routes/user");
const housingRoutes = require("./routes/housing");
const activityRoutes = require("./routes/activity");
const bodyParser = require('body-parser');
const db = require("./models/index");
const {loginRequired} = require("./middleware/auth");
const PORT = 81;

app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// contains two sub-routes: /signup & /signin, both are POST requests
app.use("/api/user", userRoutes);

app.use("/api/user/:username/housing", housingRoutes);

app.use("/api/user/:username/activity", activityRoutes);

app.get("/api/housing", loginRequired, function (req, res, next) {
    let findHousing = "SELECT * FROM Housing";
    db.query(findHousing, function (err, results) {
        if (err) {
            return next({
                status: 400,
                message: err.message
            });
        } else {
            return res.status(200).json(results);
        }
    });
});

app.get("/api/activity", loginRequired, function (req, res, next) {
    let findActivity = "SELECT * FROM Activity";
    db.query(findActivity, function (err, results) {
        if (err) {
            return next({
                status: 400,
                message: err.message
            });
        } else {
            return res.status(200).json(results);
        }
    });
});

app.get("/api/housing/search/:keyword", loginRequired, function(req, res, next){
    let findHouse = `Select * from Housing ` +
        `Where housing_name like "%${req.params.keyword}%" or ` +
        `address like "%${req.params.keyword}%" or ` +
        `city like "%${req.params.keyword}%" or ` +
        `housing_type like "%${req.params.keyword}%" or ` +
        `description like "%${req.params.keyword}%";`;

    db.query(findHouse, function(err, results){
        if (err){
            return next({
                status: 400,
                message: err.message
            })
        } else {
            return res.status(200).json(results);
        }
    })
});

app.get("/api/activity/search/:keyword", loginRequired, function(req, res, next){
    let findActivity = `Select * from Activity ` +
        `Where activity_name like "%${req.params.keyword}%" or ` +
        `address like "%${req.params.keyword}%" or ` +
        `city like "%${req.params.keyword}%" or ` +
        `type like "%${req.params.keyword}%" or ` +
        `description like "%${req.params.keyword}%";`;

    db.query(findActivity, function(err, results){
        if (err){
            return next({
                status: 400,
                message: err.message
            })
        } else {
            return res.status(200).json(results);
        }
    })
});

app.use(function (req, res, next) {
    return next({
        status: 404,
        message: "NOT FOUND"
    });
});

app.use(errorHandler);

app.listen(PORT, function () {
    console.log(`Server running on port: ${PORT}`)
});

