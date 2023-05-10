const express = require("express");
const { signUp, getUser, updateUser, deleteUser } = require("../controller/authcontroller");
const router = express.Router();
//3 ROUTS
//router.route('/MyOrder').get(getMyOrder)
router.route("/").post(signUp).get(getUser).patch(updateUser).delete(deleteUser);
module.exports = router;
