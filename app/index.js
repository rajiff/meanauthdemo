var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'MEAN Auth Demo',
        isMember: req.isAuthenticated()
    });
});

module.exports = router;