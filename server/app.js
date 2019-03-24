require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const errorHandler = require("./handlers/error");
const userRoutes = require("./routes/user");
const housingRoutes = require("./routes/housing");
const bodyParser = require('body-parser');
const db = require("./models/index");
const PORT = 81;

app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// contains two sub-routes: /signup & /signin, both are POST requests
app.use("/api/user", userRoutes);

// contains two sub-routes: / and /housing_id,
// / has GET and POST request and /housing_id has GET and DELETE request
// ensure login and correct user before editing housing
app.use("/api/user/:id/housing", housingRoutes);

// contains one sub-route:
// ensure login first before see the houses listed
app.get("/api/housing", async function (req, res, next) {
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

app.use(function (req, res, next) {
    return next({
        status: 404,
        message: "NOT FOUND"
    });
});

app.use(errorHandler);

app.listen(PORT, function () {
    console.log("server running!")
});

