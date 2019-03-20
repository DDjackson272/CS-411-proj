const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", function(req, res){
    axios.get("http://localhost:81/api/user")
        .then(function (response) {
            res.render("home", {allData: response.data})
        })
        .catch(function (error) {
            res.render("error", {error: error.response.data.error.message})
        });
});

router.post("/signup", function(req, res){
    axios.post("http://localhost:81/api/user/signup", req.body)
        .then(function(response){
            req.flash("success", response.data.flag);
            res.redirect("/user")
        })
        .catch(function(error){
            req.flash("error", error.response.data.error.message);
            res.redirect("/user");
        })
});

router.post("/signin", function(req, res){
    axios.post("http://localhost:81/api/user/signin", req.body)
        .then(function(response){
            req.flash("success", response.data.flag);
            res.redirect("/user");
        })
        .catch(function(error){
            req.flash("error", error.response.data.error.message);
            res.redirect("/user");
        })
});

module.exports = router;