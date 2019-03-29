const db = require("../models");

// /api/user/:username/activity
exports.showActivity = function(req, res, next){
    let findAllActivity = `select * from Activity where username="${req.params.username}";`;
    let findUser = `select * from User where username="${req.params.username}";`;

    db.query(findUser, function(err, results){
        if (err){
            return next(err);
        } else {
            if (results.length === 0){
                return next({
                    status: 404,
                    message: "No user record available!"
                })
            }
        }
    });

    db.query(findAllActivity, async function(err, results){
        if (err){
            return next(err);
        } else {
            return res.status(200).json(results)
        }
    })
};

// /api/user/:username/activity
exports.createActivity = function(req, res, next){
    let activity = {
        activity_name: req.body.activity_name,
        username: req.params.username,
        address: req.body.address,
        city: req.body.city,
        type: req.body.type,
        description: req.body.description,
        date: req.body.date,
        img_url: req.body.img_url
    };

    db.query('insert into Activity set ?', activity, function (err) {
        if (err){
            if (err.errno === 1062) {
                err.message = "This address is recorded already.";
            }
            return next({
                status: 400,
                message: err.message
            });
        } else {
            return next({
                status: 200,
                message: "Successfully added an activity!"
            });
        }
    });
};

// /api/user/:username/activity/:activity_id
exports.getActivity = function(req, res, next) {
    let findActivity = `select * from Activity where activity_id=${req.params.activity_id};`;
    let findUser = `select * from User where username="${req.params.username}";`;

    db.query(findUser, function(err, results){
        if (err){
            return next(err);
        } else {
            if (results.length === 0){
                return next({
                    status: 400,
                    message: "No user record available!"
                })
            }
        }
    });

    db.query(findActivity, function(err, results){
        if (err){
            return next(err);
        } else {
            if (results.length === 0){
                return next({
                    status: 400,
                    message: "No activity record available!"
                })
            } else {
                return res.status(200).json(results[0])
            }
        }
    });
};

// /api/user/:username/activity/:activity_id
exports.deleteActivity = function(req, res, next){
    let deleteActivity = `DELETE FROM Activity WHERE activity_id=${req.params.activity_id};`;
    db.query(deleteActivity, function(err){
        if (err){
            return next(err);
        } else {
            return next({
                status: 200,
                message: "Successfully deleted an activity!"
            })
        }
    });
};

// /api/user/:username/activity/:activity_id
exports.updateActivity = function(req, res, next){
    let activity = {
        activity_name: req.body.activity_name,
        username: req.params.username,
        address: req.body.address,
        city: req.body.city,
        type: req.body.type,
        description: req.body.description,
        date: req.body.date,
        img_url: req.body.img_url
    };

    let putActivity = `UPDATE Activity SET ? WHERE activity_id=${req.params.activity_id}`;
    let findUser = `SELECT * FROM User WHERE username="${req.params.username}"`;

    db.query(findUser, function(err, results){
        if (err){
            return next(err);
        } else {
            if (results.length === 0){
                return next({
                    status: 400,
                    message: "No user record available!"
                })
            }
        }
    });

    db.query(putActivity, activity, function(err){
        if (err) {
            if (err.errno === 1062) {
                err.message = "This address is recorded already.";
            }
            return next(err);
        } else {
            return next({
                status: 200,
                message: "Successfully updated an activity!"
            })
        }
    })
};


