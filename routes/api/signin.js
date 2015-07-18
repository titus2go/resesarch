var express = require('express');
var router = express.Router();
var session = require('./sessions.js');


/* GET home page. */
router.post('/', function(req, res, next) {
    var userinfo = req.body;
    session.login(userinfo.username, userinfo.password, res);
});


module.exports = router;
