const express = require("express");
const router = express.Router({ mergeParams: true});
const {deleteHousing, getHousing, createHousing} = require("../handlers/housing");

router.route("/").post(createHousing);
router.route("/:housing_id")
    .get(getHousing)
    .delete(deleteHousing);
module.exports = router;