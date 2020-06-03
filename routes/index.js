var express = require("express");
var router = express.Router();

var home = require("../controller/home");
var client_auth = require("../controller/client_authentication")
var video = require("../controller/videos")

router.get("/", home.index);
router.get("/category", home.category);
router.get("/view/:movie_id", home.view);
router.post("/signin", client_auth.signin);
router.get("/watch_movie/:movie_name", video.watch_movie);

module.exports = router;
