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
    var sqlstmt = "select sym.SymptomName, s.SymptomStatus from WeeklySymptomSurvey as wss right join Surveys as s on wss.SurveyID=s.SurveyID left join Symptoms as sym on s.SymptomID=sym.SymptomID where s.SurveyId=" + surveyinfo.surveyid + " and s.UserID=" + surveyinfo.userid + ";";
    console.log(sqlstmt);
    var result = {};
    connection.query(sqlstmt, function(err, rows, fields) {
        if(!err){
            result.status = true;
            result.message = "Successfully retrieve survey";
            res.send(JSON.stringify(rows)); 
        } else {
            result.status = false;
            result.message = "Failure to retreive row " + err;
            res.send(result); 
        }
    });
    
});

router.get('/', function(req, res, next) {
    res.send("Hi, how are you");
});

module.exports = router;