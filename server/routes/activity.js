const express = require("express");
const router = express.Router({ mergeParams: true});
const {showActivity, deleteActivity, getActivity, createActivity, updateActivity} = require("../handlers/activity");
const {loginRequired, ensureCorrectUser} = require("../middleware/auth");

router.route("/")
    .get(loginRequired, showActivity)
    .post(loginRequired, createActivity);
router.route("/:activity_id")
    .get(loginRequired, getActivity)
    .delete(loginRequired, ensureCorrectUser, deleteActivity)
    .put(loginRequired, ensureCorrectUser, updateActivity);

module.exports = router;