const express = require("express");
const router = express.Router();
const db = require("../models/index");
const { signup, signin } = require("../handlers/auth");

// /api/user/signup
router.post("/signup", signup);

// /api/user/search/:keyword
router.get("/search/:keyword", function(req, res, next){
    let searchUser = `select * from User` +
        ` Where username LIKE "%${req.params.keyword}%"`;
    db.query(searchUser, function(err, results){
        if(err) {
            return next({
                status: 400,
                message: err.message
            });
        } else {
            return res.status(200).json(results);
        }
    });

});

// /api/user/signin
router.post("/signin", signin);

// /api/user/
router.get("/", function(req, res, next){
    let allData = "select * from User;";
    db.query(allData, function(err, results){
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

module.exports = router;