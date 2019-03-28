const db = require("../models");

// /api/user/:username/housing
exports.showHousing = function(req, res, next){
    let findAllHousing = `select * from Housing where username=${req.params.username};`;
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

    db.query(findAllHousing, async function(err, results){
        if (err){
            return next(err);
        } else {
            return res.status(200).json(results)
        }
    })
};

// /api/user/:username/housing
exports.createHousing = function(req, res, next){
    let housing = {
        address: req.body.address,
        city: req.body.city,
        username: req.params.username,
        housing_name: req.body.housing_name,
        description: req.body.description,
        img_url: req.body.img_url,
        housing_type: req.body.housing_type
    };

    db.query('insert into Housing set ?', housing, function (err) {
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
                message: "Successfully added a house!"
            });
        }
    });
};

// /api/user/:username/housing/:housing_id
exports.getHousing = function(req, res, next) {
    let findHousing = `select * from Housing where housing_id=${req.params.housing_id};`;
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

    db.query(findHousing, function(err, results){
       if (err){
           return next(err);
       } else {
           if (results.length === 0){
               return next({
                   status: 400,
                   message: "No housing record available!"
               })
           } else {
               return res.status(200).json(results[0])
           }
       }
    });
};

// /api/user/:username/housing/:housing_id
exports.deleteHousing = function(req, res, next){
    let deleteHousing = `DELETE FROM Housing WHERE housing_id=${req.params.housing_id};`;
    db.query(deleteHousing, function(err){
        if (err){
            return next(err);
        } else {
            return next({
                status: 200,
                message: "Successfully deleted a house!"
            })
        }
    });
};

// /api/user/:username/housing/:housing_id
exports.updateHousing = function(req, res, next){
    let housing = {
        address: req.body.address,
        city: req.body.city,
        username: req.params.username,
        housing_name: req.body.housing_name,
        description: req.body.description,
        img_url: req.body.img_url,
        housing_type: req.body.housing_type
    };

    let updateHousing = `UPDATE Housing SET ? WHERE housing_id=${req.params.housing_id}`;
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

    db.query(updateHousing, housing, function(err){
        if (err) {
            if (err.errno === 1062) {
                err.message = "This address is recorded already.";
            }
            return next(err);
        } else {
            return next({
                status: 200,
                message: "Successfully updated a house!"
            })
        }
    })

};