const db = require("../models");

// "/api/users/:id/messages/"
exports.createHousing = async function(req, res, next){
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
            return res.status(200).json(housing);
        }
    });
};

// /api/users/:id/messages/:housing_id
exports.getHousing = async function(req, res, next) {
    let findHousing = "select * from Housing where housing_id=\""+req.params.housing_id+"\";";
    db.query(findHousing, function(err, results){
       if (err){
           return next(err);
       } else {
           if (results.length === 0){
               return next({
                   status: 400,
                   message: "No record available here!"
               })
           } else {
               return res.status(200).json(results[0])
           }
       }
    });
};

exports.deleteHousing = async function(req, res, next){
    let deleteHousing = "DELETE FROM Housing WHERE housing_id=\""+req.params.housing_id+"\";";
    db.query(deleteHousing, function(err){
        if (err){
            return next(err);
        } else {
            return next({
                status: 200,
                message: "Successfully deleted!"
            })
        }
    });
};