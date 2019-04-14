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

    // first create the house
    db.query('insert into Housing set ?', housing, function (err, qResult) {
        if (err) {
            return next({
                status: 400,
                message: err.message
            });
        } else {
            let housing_feature = {
                housing_feature_housing_id: qResult.insertId,
                parking: req.body.parking,
                cooking: req.body.cooking,
                large_bed: req.body.cooking
            };
            // then create the housing_feature
            db.query('insert into HousingFeature set ?', housing_feature, function(hfErr, hfResult){
                if (hfErr){
                    return next(hfErr);
                }else{
                    return res.status(200).json(hfResult);
                }
            });
        }
    });
};

// /api/user/:username/housing/:housing_id
exports.getHousing = function (req, res, next) {
    let findUser = `select * from User where username="${req.params.username}";`;
    let findSingleHouseWithFeature =
        `(select * 
        from Housing 
        Join HousingFeature
        On housing_id=housing_feature_housing_id
        where housing_id=${req.params.housing_id}) as singleHouse`;
    let commentWithUsername =
        `(select * 
        from Comment join User 
        on Comment.comment_user_id=User.user_id 
        where comment_housing_id=${req.params.housing_id}) as commentUser`;
    let findHousingComment = `select *
    from ${findSingleHouseWithFeature} 
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
    let deleteHousingFeature = `DELETE FROM HousingFeature 
    WHERE housing_feature_housing_id=${req.params.housing_id};`;
    let deleteComment = `DELETE FROM Comment WHERE comment_housing_id=${req.params.housing_id};`;
    let deleteHousing = `DELETE FROM Housing WHERE housing_id=${req.params.housing_id};`;

    // delete housing features first
    db.query(deleteHousingFeature, function(hfError){
        if (hfError){
            return next(hfError)
        } else {
            // delete the relevant comment then
            db.query(deleteComment, function(cError){
                if (cError){
                    return next(cError)
                } else {
                    // lastly delete the house.
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
                }
            });
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

    let housing_feature = {
        housing_feature_housing_id: req.params.housing_id,
        parking: req.body.parking,
        cooking: req.body.cooking,
        large_bed: req.body.large_bed
    };

    let putHousing = `UPDATE Housing SET ? WHERE housing_id=${req.params.housing_id}`;
    let putHousingFeature = `UPDATE HousingFeature SET ? 
    WHERE housing_feature_housing_id=${req.params.housing_id}`;
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
                // first modify the house
                db.query(putHousing, housing, function (hErr) {
                    if (hErr) {
                        return next(hErr);
                    } else {
                        // then modify the housing feature
                        db.query(putHousingFeature, housing_feature, function(hfError){
                            if(hfError){
                                return next(hfError)
                            } else {
                                return next({
                                    status: 200,
                                    message: "Successfully modify a house!"
                                })
                            }
                        });
                    }
                })
            }
        }
    });
};