var express = require("express");
var router = express.Router();

var home = require("../controller/home");

router.get("/", home.index);
router.get("/category", home.category);
router.get("/view/:movie_id", home.view);

module.exports = router;
