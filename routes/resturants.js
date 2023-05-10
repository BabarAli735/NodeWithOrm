const express = require("express");
const { getAllResturants } = require("../controller/resturants");
const router = express.Router();
//3 ROUTS
//router.route('/MyOrder').get(getMyOrder)
router.route("/").get(getAllResturants);
module.exports = router;
