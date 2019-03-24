require('dotenv').config();
const jwt = require("jsonwebtoken");

// make sure user.js is logged in - Authentication
exports.loginRequired = function (req, res, next) {
    try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded){
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Please log in first"
                });
            }
        });
    } catch (e) {
        return next({
            status: 401,
            message: "Please log in first"
        });
    }
};
// make sure we get the correct user.js - Authorization
// "/api/user/:username/housing"
exports.ensureCorrectUser = function(req, res, next){
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if (decoded && decoded.username === req.params.username){
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Unauthorized"
                })
            }
        });
    } catch (e) {
        return next({
            status: 401,
            message: e.message
        })
    }
};