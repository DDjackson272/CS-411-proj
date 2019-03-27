const express = require("express");
const router = express.Router({ mergeParams: true});
const {showHousing, deleteHousing, getHousing, createHousing, updateHousing} = require("../handlers/housing");
const {loginRequired, ensureCorrectUser} = require("../middleware/auth");

router.route("/")
    .get(loginRequired, showHousing)
    .post(loginRequired, ensureCorrectUser, createHousing);
router.route("/:housing_id")
    .get(loginRequired, getHousing)
    .delete(loginRequired, ensureCorrectUser, deleteHousing)
    .put(loginRequired, ensureCorrectUser, updateHousing);

// let housing = "create table Housing (" +
//     "housing_id int NOT NULL AUTO_INCREMENT," +
//     "housing_name varchar(255) NOT NULL,"+
//     "username varchar(255) NOT NULL," +
//     "address varchar(255) NOT NULL UNIQUE," +
//     "city varchar(255) NOT NULL," +
//     "housing_type varchar(255) NOT NULL," +
//     "description varchar(1024) NOT NULL, " +
//     "img_url varchar(1024) NOT NULL, " +
//     "PRIMARY KEY (housing_id)," +
//     "FOREIGN KEY (username) REFERENCES User (username)" +
//     ");";
router.route("/search/:keyword", function(req, res, next){
    let findHouse = `Select * from Housing ` +
        `Where housing_name like "%${req.params.keyword}" or ` +
        `address like "%${req.params.keyword}" or ` +
        `city like "%${req.params.keyword}" or ` +
        `housing_type like "%${req.params.keyword}" or ` +
        `description like "%${req.params.keyword}";`

    db.query(findHouse, function(err, results){
        if (err){
            return next({
                status: 400,
                message: err.message
            })
        } else {
            res.status(200).json(results);
        }
    })
});

module.exports = router;