var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'titus2go1986',
    database: 'research',
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
    var sqlstmt = "select SurveyID from WeeklySymptomSurvey where UserID='" + surveyinfo.userid + "';";
    console.log(sqlstmt);
    var result = {};
    connection.query(sqlstmt, function(err, rows, fields) {
        if(!err){
            result.status = true;
            result.message = "Successfully retrieve survey ids";
            result.ids = rows;
            res.send(result); 
        } else {
            result.status = false;
            result.message = "Failure to retreive surveyids " + err;
            res.send(result); 
        }
    });
    
});

router.get('/', function(req, res, next) {
    res.send("Hi, how are you");
});

module.exports = router;