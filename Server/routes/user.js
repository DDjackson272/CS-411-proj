const express = require("express");
const router = express.Router();
const db = require("../models/index");

router.get("/", function(req, res){
    let allData = "select * from User";
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