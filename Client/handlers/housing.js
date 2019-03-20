const axios = require("axios");

// "/api/user/:id/housing"
exports.showHousing = function(req, res){
    axios.get(`http://localhost:81/api/user/${req.params.id}/housing`)
        .then(function(response){
            res.render("house", {houseData: response.data, uid: req.params.id})
        })
        .catch(function(error){
            res.render("error", {error: error.response.data.error.message})
        });
};

// "/api/user/:id/housing"
exports.createHousing = function(req, res){
    axios.post(`http://localhost:81/api/user/${req.params.id}/housing`, req.body)
        .then(function(response){
            req.flash("success", response.data.error.message);
            res.redirect(`/user/${req.params.id}/housing`)
        })
        .catch(function(error){
            req.flash("error", error.response.data.error.message);
            res.redirect(`/user/${req.params.id}/housing`)
        })
};

// /api/user/:id/housing/:housing_id
exports.getHousing = function(req, res) {
    axios.get(`http://localhost:81/api/user/${req.params.id}/housing/${req.params.housing_id}`)
        .then(function(response){
            res.render("singleHouse", {houseData: response.data});
        })
        .catch(function(error){
            res.render("error", {error: error.response.data.error.message})
        })
};

// /api/user/:id/housing/:housing_id
exports.deleteHousing = function(req, res){
    axios.delete(`http://localhost:81/api/user/${req.params.id}/housing/${req.params.housing_id}`)
        .then(function(response){
            req.flash("success", response.data.error.message);
            res.redirect(`/user/${req.params.id}/housing/`);
        })
        .catch(function(error){
            console.log(error);
            res.render("error", error)
        })
};

// /api/user/:id/housing/:housing_id
exports.updateHousing = function(req, res){
    axios.put(`http://localhost:81/api/user/${req.params.id}/housing/${req.params.housing_id}`, req.body)
        .then(function(response){
            req.flash("success", response.data.error.message);
            res.redirect(`/user/${req.params.id}/housing/`);
        })
        .catch(function(error){
            console.log(error);
            res.render("error", error)
        })
};