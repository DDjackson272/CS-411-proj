const db = require("../models");

// /api/users/:id/housing
exports.showHousing = function(req, res, next){
    let findAllHousing = "select * from Housing where user_id=\""+req.params.id+"\"";
    let findUser = `select * from User where user_id=${req.params.id}`;

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

// /api/users/:id/housing
exports.createHousing = function(req, res, next){
    let housing = {
        address: req.body.address,
        user_id: req.params.id
    };

    db.query('insert into Housing set ?', housing, function (err) {
        if (err){
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

// /api/users/:id/messages/:housing_id
exports.getHousing = function(req, res, next) {
    let findHousing = "select * from Housing where housing_id=\""+req.params.housing_id+"\";";
    let findUser = `select * from User where user_id=${req.params.id};`;

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

// /api/users/:id/messages/:housing_id
exports.deleteHousing = function(req, res, next){
    let deleteHousing = "DELETE FROM Housing WHERE housing_id=\""+req.params.housing_id+"\";";
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

// /api/users/:id/messages/:housing_id
exports.updateHousing = function(req, res, next){
    let updateHousing = `UPDATE Housing SET address='${req.body.address}' WHERE housing_id=${req.params.housing_id}`;
    let findUser = `select * from User where user_id=${req.params.id}`;

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

    db.query(updateHousing, function(err){
        if (err) {
            return next(err);
        } else {
            return next({
                status: 200,
                message: "Successfully updated a house!"
            })
        }
    })

};