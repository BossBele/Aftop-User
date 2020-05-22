var express = require('express');
var router = express.Router();

var home = require('../controller/home');

router.get('/', home.index);
router.get('/downloads', home.download);
router.get('/category', home.category);
router.get('/view', home.view);

module.exports = router;