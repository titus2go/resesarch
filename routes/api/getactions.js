var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var database = require('./sqlserver.js');


var connection = mysql.createConnection({
    host: database.hostname(),
    user: database.username(),
    password: database.password(),
    database: database.dbname(),
});
connection.connect(function(err){
    if(!err) {
        console.log("Successfully connected to the database");
    } else {
        console.log("Error connected to the database");
    }
});

/* GET home page. */
router.post('/', function(req, res, next) {
    var surveyinfo = req.body;
    var sqlstmt = "select ActionID, ActionName from Actions;";
    console.log(sqlstmt);
    var result = {};
    connection.query(sqlstmt, function(err, rows, fields) {
        if(!err){
            result.status = true;
            result.message = "Successfully retrieve actions";
            result.actions = rows;
            res.send(result); 
        } else {
            result.status = false;
            result.message = "Failure to retreive actions " + err;
            res.send(result); 
        }
    });
    
});

router.get('/', function(req, res, next) {
    res.send("Hi, how are you");
});

module.exports = router;