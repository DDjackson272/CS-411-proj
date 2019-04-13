const express = require("express");
const router = express.Router({ mergeParams: true});
const {showHousing, deleteHousing, getHousing, createHousing, updateHousing} = require("../handlers/housing");
const {loginRequired, ensureCorrectUser} = require("../middleware/auth");

router.route("/")
    .get(loginRequired, showHousing)
    .post(loginRequired, createHousing);
router.route("/:housing_id")
    .get(getHousing)
    .delete(loginRequired, ensureCorrectUser, deleteHousing)
    .put(loginRequired, ensureCorrectUser, updateHousing);

module.exports = router;