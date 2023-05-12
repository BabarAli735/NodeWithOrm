const express = require("express");
const {
  oneToone,
  createPost,
  oneBelongTo,
  oneToMany,
  manyToMany,
  CheckActiveUserScope,
  Polymorphic,
  DeleteParanoidTableData,
  PolymorphicMany,
  loading,
  Transaction,
} = require("../controller/userController");
const router = express.Router();
//3 ROUTS
//router.route('/MyOrder').get(getMyOrder)
router.get("/oneTone", oneToone);
router.get("/oneToMany", oneToMany);
router.get("/oneBlongsTo", oneBelongTo);
router.get("/manyToMany", manyToMany);
router.post("/createPost", createPost);
router.get("/checkStatus", CheckActiveUserScope);
router.get("/polymorphic", Polymorphic);
router.get("/PolymorphicMany", PolymorphicMany);
router.get("/loading", loading);
router.get("/Transaction", Transaction);
router.delete("/DeleteParanoidTableData", DeleteParanoidTableData);
module.exports = router;
