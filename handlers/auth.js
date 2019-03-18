const db = require("../models");
const jwt = require("jsonwebtoken");

// signup and signin, if successfully done, will return a decoded token
exports.signin = async function (req, res, next) {
    try {
        // finding a user.js
        let user = await db.User.findOne({
            email: req.body.email
        });
        let {id, username, profileImageUrl} = user;
        let isMatch = await user.comparePassword(req.body.password);
        // checking if their password matches what was sent to the server
        // if it all matches
        // log them in
        if (isMatch) {
            let token = jwt.sign({
                id,
                username,
                profileImageUrl
            }, process.env.SECRET_KEY);

            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            });
        } else {
            return next({
                status: 400,
                message: "Invalid email/password."
            })
        }
    } catch (err) {
        return next({
            status: 400,
            message: "Invalid email/password."
        })
    }

};

exports.signup = async function (req, res, next) {
    let person = {
        email: req.body.email,
        username: req.body.username,
        img: req.body.img,
        password: req.body.password
    };
    person.password = await bcrypt.hash(person.password, 10);

    db.query('insert into User set ?', person, function (err) {
        if (err) {
            if (err.errno === 1062) {
                err.message = "This email address has been registered! Try another one.";
            }
            return next({
                status: 400, // user.js validation failed: do not provide required information
                message: err.message
            });
        } else {
            let {email, username, img} = person;

            let token = jwt.sign({
                email,
                username,
                img
            }, process.env.SECRET_KEY);

            return res.status(200).json({
                email,
                username,
                img,
                token
            });
        }
    });
};