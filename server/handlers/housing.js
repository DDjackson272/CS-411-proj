const db = require("../models");
var NodeGeocoder = require('node-geocoder');
var options = {
    provider: 'google',
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyA0kklLIkCV5PYhDPAw8kTNb1K2iPkCm_8',
    formatter: null
};

var geocoder = NodeGeocoder(options);

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
        username: req.params.username,
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
            let address = `${req.body.address}, ${req.body.city}, Illinois`;
            geocoder.geocode(address, function (error, gResult) {
                if (error) {
                    return next({
                        status: 400,
                        message: error.message
                    })
                } else {
                    let coordinate = {
                        latitude: gResult[0].latitude,
                        longitude: gResult[0].longitude,
                        housing_id: qResult.insertId
                    };
                    db.query('insert into Coordinate set ?', coordinate, function (cErr, cRes) {
                        if (cErr) {
                            return next({
                                status: 400,
                                message: err.message
                            })
                        } else {
                            return res.status(200).json(cRes);
                        }
                    })
                }
            });
        }
    });
};

// /api/user/:username/housing/:housing_id
exports.getHousing = function (req, res, next) {
    let findUser = `select * from User where username="${req.params.username}";`;
    let findHousingComment = `select singleHouse.housing_id as housing_id, housing_name, username, address, city, 
    housing_type, description, img_url, comment_id, user_id, content
    from (select * from Housing where housing_id=${req.params.housing_id}) as singleHouse 
    left join Comment 
    on singleHouse.housing_id=Comment.housing_id`;

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
    let deleteCoordinate = `DELETE FROM Coordinate WHERE housing_id=${req.params.housing_id};`;
    let deleteHousing = `DELETE FROM Housing WHERE housing_id=${req.params.housing_id};`;

    db.query(deleteCoordinate, function (err) {
        if (err) {
            return next(err);
        } else {
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
};

// /api/user/:username/housing/:housing_id
exports.updateHousing = function (req, res, next) {
    let housing = {
        address: req.body.address,
        city: req.body.city,
        username: req.params.username,
        housing_name: req.body.housing_name,
        description: req.body.description,
        img_url: req.body.img_url,
        housing_type: req.body.housing_type
    };

    let putHousing = `UPDATE Housing SET ? WHERE housing_id=${req.params.housing_id}`;
    let putCoordinate = `UPDATE Coordinate SET ? WHERE housing_id=${req.params.housing_id}`;
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
                        let address = `${req.body.address}, ${req.body.city}, Illinois`;
                        geocoder.geocode(address, function (error, gResult) {
                            if (error) {
                                return next(error)
                            } else {
                                let coordinate = {
                                    latitude: gResult[0].latitude,
                                    longitude: gResult[0].longitude,
                                    housing_id: req.params.housing_id
                                };
                                db.query(putCoordinate, coordinate, function (cErr) {
                                    if (cErr) {
                                        return next(cErr);
                                    } else {
                                        return next({
                                            status: 200,
                                            message: "Successfully modify a coordinate!"
                                        })
                                    }
                                })
                            }
                        });
                    }
                })
            }
        }
    });
};