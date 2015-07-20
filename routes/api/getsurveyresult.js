var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var session = require('./sessions.js');

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: '1qaz!QAZ',
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
    session.verify(req.body.sessionid, function(userid){ 
        var surveyinfo = req.body;
        var sqlstmt = "select sym.SymptomName, s.SymptomStatus from WeeklySymptomSurvey as wss right join Surveys as s on wss.SurveyID=s.SurveyID left join Symptoms as sym on s.SymptomID=sym.SymptomID where s.SurveyId='" + surveyinfo.surveyid + "' and s.UserID='" + userid + "';";
        console.log(sqlstmt);
        var result = {};
        connection.query(sqlstmt, function(err, rows, fields) {
            if(!err){
                result.status = true;
                result.message = "Successfully retrieve survey";
                result.survey = rows;
                console.log(JSON.stringify(rows));
                res.send(result); 
            } else {
                result.status = false;
                result.message = "Failure to retreive row " + err;
                res.send(result); 
            }
        });
    });
    
});

router.get('/', function(req, res, next) {
    res.send("Hi, how are you");
});

module.exports = router;