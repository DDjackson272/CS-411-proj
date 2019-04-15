require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require('express');
const app = express();
const cors = require("cors");
const errorHandler = require("./handlers/error");
const userRoutes = require("./routes/user");
const housingRoutes = require("./routes/housing");
const activityRoutes = require("./routes/activity");
const bodyParser = require('body-parser');
const db = require("./models/index");
const PORT = 81;
const exec = require('child_process').exec;

app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// contains two sub-routes: /signup & /signin, both are POST requests
app.use("/api/user", userRoutes);

app.use("/api/user/:username/housing", housingRoutes);

app.use("/api/user/:username/activity", activityRoutes);

app.get("/api/housing", function (req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        let findUserId =
            `Select user_id
        From User
        Where username="${decoded.username}"`;

        let findHousingWithRating =
            "(SELECT * " +
            "FROM Housing " +
            "LEFT JOIN Sentiment " +
            "ON housing_id=Sentiment.sentiment_housing_id) as HousingSentiment";

        let findDetailedHousing =
            `SELECT * 
        FROM ${findHousingWithRating} 
        JOIN HousingFeature 
        ON HousingSentiment.housing_id=HousingFeature.housing_feature_housing_id`;

        // first findUserId
        db.query(findUserId, function (uErr, uResult) {
            if (uErr) {
                return next(uErr)
            } else {
                if (uResult.length === 0) {
                    return next({
                        status: 400,
                        message: "No user record!"
                    })
                } else {
                    let {user_id} = uResult[0];

                    let findUserLikedHousing =
                        `Select * 
                        from History
                        Where history_user_id=${user_id};`;

                    db.query(findUserLikedHousing, function(ulErr, ulResults){
                        if (ulErr) {
                            return next(ulErr)
                        } else {
                            db.query(findDetailedHousing, function (err, hResults) {
                                if (err) {
                                    return next({
                                        status: 400,
                                        message: err.message
                                    });
                                } else {
                                    let  visitedArray = ulResults.map((ul) => (
                                        ul.history_housing_id
                                    ));
                                    return res.status(200).json(hResults.map((hr) => (
                                        {...hr,
                                            visited: visitedArray.includes(hr.housing_id)
                                        }
                                    )));
                                }
                            });
                        }
                    });
                }
            }
        });
    });
});

app.get("/api/activity", function (req, res, next) {
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

app.get("/api/housing/search/:keyword", function (req, res, next) {
    let findHousingWithRating =
        "(SELECT * " +
        "FROM Housing " +
        "LEFT JOIN Sentiment " +
        "ON housing_id=Sentiment.sentiment_housing_id) as HousingSentiment";
    let findDetailedHousing =
        `(SELECT * 
        FROM ${findHousingWithRating} 
        JOIN HousingFeature 
        ON HousingSentiment.housing_id=HousingFeature.housing_feature_housing_id) as detailHousing`;
    let findHouse = `Select * from ${findDetailedHousing} ` +
        `Where housing_name like "%${req.params.keyword}%" or ` +
        `address like "%${req.params.keyword}%" or ` +
        `city like "%${req.params.keyword}%" or ` +
        `housing_type like "%${req.params.keyword}%" or ` +
        `description like "%${req.params.keyword}%";`;

    db.query(findHouse, function (err, results) {
        if (err) {
            return next({
                status: 400,
                message: err.message
            })
        } else {
            return res.status(200).json(results);
        }
    })
});

app.get("/api/activity/search/:keyword", function (req, res, next) {
    let findActivity = `Select * from Activity ` +
        `Where activity_name like "%${req.params.keyword}%" or ` +
        `address like "%${req.params.keyword}%" or ` +
        `city like "%${req.params.keyword}%" or ` +
        `type like "%${req.params.keyword}%" or ` +
        `description like "%${req.params.keyword}%";`;

    db.query(findActivity, function (err, results) {
        if (err) {
            return next({
                status: 400,
                message: err.message
            })
        } else {
            return res.status(200).json(results);
        }
    })
});

app.get("/api/housing/:username/recommend", function (req, res, next) {
    let findHousingWithRating =
        "(SELECT * " +
        "FROM Housing " +
        "LEFT JOIN Sentiment " +
        "ON housing_id=Sentiment.sentiment_housing_id) as HousingSentiment";
    let findDetailedHousing =
        `(SELECT * 
        FROM ${findHousingWithRating} 
        JOIN HousingFeature 
        ON HousingSentiment.housing_id=HousingFeature.housing_feature_housing_id) as detailHousing`;
    let findRecommendHousing =
        `Select * 
        FROM ${findDetailedHousing}
        Join Recommend
        On Recommend.recommend_housing_id=detailHousing.housing_id
        Where Recommend.recommend_username="${req.params.username}";`;

    db.query(findRecommendHousing, function (err, results) {
        if (err) {
            return next({
                status: 400,
                message: err.message
            })
        } else {
            return res.status(200).json(results);
        }
    })
});

app.post("/api/user/:username/add/:housing_id", function (req, res, next) {
    let getIdOfUsername = `select user_id from User where username="${req.params.username}";`;

    db.query(getIdOfUsername, function (uErr, uResults) {
        if (uErr) {
            return next(uErr)
        } else {
            if (uResults.length === 0) {
                return next({
                    status: 400,
                    message: "No user info found!"
                })
            } else {
                let {user_id} = uResults[0];
                let addHistory =
                    `Insert into History (history_user_id, history_housing_id) 
                    values (${user_id}, ${req.params.housing_id})`;

                db.query(addHistory, function (err, results) {
                    if (err) {
                        return next({
                            status: 400,
                            message: err.message
                        })
                    } else {
                        exec('cd ../data; python3.6 recommend.py', function (error) {
                            if (error) {
                                return next(error);
                            } else {
                                return res.status(200).json(results);
                            }
                        });
                    }
                })
            }
        }
    });
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

