const db = require("../models");

// /api/user/:username/housing
exports.showHousing = function (req, res, next) {
    let findAllHousing = `select * from Housing where username=${req.params.username};`;
    let findUser = `select * from User where username="${req.params.username}";`;

    db.query(findUser, function (err, results) {
        if (err) {
            return next(err);
        } else {
            if (results.length === 0) {
                return next({
                    status: 404,
                    message: "No user record available!"
                })
            } else {
                db.query(findAllHousing, function (hErr, hResults) {
                    if (hErr) {
                        return next(hErr);
                    } else {
                        return res.status(200).json(hResults)
                    }
                })
            }
        }
    });
};

// /api/user/:username/housing
exports.createHousing = function (req, res, next) {
    let housing = {
        address: req.body.address,
        city: req.body.city,
        housing_username: req.params.username,
        housing_name: req.body.housing_name,
        description: req.body.description,
        img_url: req.body.img_url,
        housing_type: req.body.housing_type
    };

    db.query('insert into Housing set ?', housing, function (err, qResult) {
        if (err) {
            return next({
                status: 400,
                message: err.message
            });
        } else {
            return res.status(200).json(qResult);
        }
    });
};

// /api/user/:username/housing/:housing_id
exports.getHousing = function (req, res, next) {
    let findUser = `select * from User where username="${req.params.username}";`;
    let findSingleHouse =
        `(select * 
        from Housing 
        where housing_id=${req.params.housing_id}) as singleHouse`;
    let commentWithUsername =
        `(select * 
        from Comment join User 
        on Comment.comment_user_id=User.user_id 
        where comment_housing_id=${req.params.housing_id}) as commentUser`;
    let findHousingComment = `select *
    from ${findSingleHouse} 
    left join ${commentWithUsername}
    on singleHouse.housing_id=commentUser.comment_housing_id;`;

    db.query(findUser, function (err, results) {
        if (err) {
            return next(err);
        } else {
            if (results.length === 0) {
                return next({
                    status: 400,
                    message: "No user record available!"
                })
            } else {
                db.query(findHousingComment, function (hErr, hResults) {
                    if (hErr) {
                        return next(hErr);
                    } else {
                        if (hResults.length === 0) {
                            return next({
                                status: 400,
                                message: "No housing record available!"
                            })
                        } else {
                            return res.status(200).json(hResults)
                        }
                    }
                });
            }
        }
    });
};

// /api/user/:username/housing/:housing_id
exports.deleteHousing = function (req, res, next) {
    let deleteHousing = `DELETE FROM Housing WHERE housing_id=${req.params.housing_id};`;

    db.query(deleteHousing, function (error) {
        if (error) {
            return next(error);
        } else {
            return next({
                status: 200,
                message: "Successfully deleted a house!"
            })
        }
    });

};

// /api/user/:username/housing/:housing_id
exports.updateHousing = function (req, res, next) {
    let housing = {
        address: req.body.address,
        city: req.body.city,
        housing_username: req.params.username,
        housing_name: req.body.housing_name,
        description: req.body.description,
        img_url: req.body.img_url,
        housing_type: req.body.housing_type
    };

    let putHousing = `UPDATE Housing SET ? WHERE housing_id=${req.params.housing_id}`;
    let findUser = `SELECT * FROM User WHERE username="${req.params.username}"`;

    db.query(findUser, function (err, results) {
        if (err) {
            return next(err);
        } else {
            if (results.length === 0) {
                return next({
                    status: 400,
                    message: "No user record available!"
                })
            } else {
                db.query(putHousing, housing, function (hErr) {
                    if (hErr) {
                        return next(hErr);
                    } else {

                        return next({
                            status: 200,
                            message: "Successfully modify a coordinate!"
                        })
                    }
                })
            }
        }
    });
};