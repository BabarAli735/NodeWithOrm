const express = require("express");
const { oneToone, createPost, oneBelongTo, oneToMany } = require("../controller/userController");
const router = express.Router();
//3 ROUTS
//router.route('/MyOrder').get(getMyOrder)
router.get('/oneTone',oneToone)
router.get('/oneToMany',oneToMany)
router.get('/oneBlongsTo',oneBelongTo)
router.post('/createPost',createPost)
module.exports = router;
