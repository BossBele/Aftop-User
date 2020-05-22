var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
    res.render('index.ejs');
});
router.get('/downloads', (req, res) => {
    res.render('downloads.ejs');
});
router.get('/category', (req, res) => {
    res.render('category.ejs');
});
router.get('/view', (req, res) => {
    res.render('view.ejs');
});

module.exports = router;