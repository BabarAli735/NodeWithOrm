const express = require("express");
const { oneToone, createPost, oneBelongTo } = require("../controller/userController");
const router = express.Router();
//3 ROUTS
//router.route('/MyOrder').get(getMyOrder)
router.get('/oneTone',oneToone)
router.get('/oneBlongsTo',oneBelongTo)
router.post('/createPost',createPost)
module.exports = router;
