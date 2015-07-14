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
    var survey = JSON.parse(surveyinfo.survey);
    var sqlstmt1 = "insert into WeeklySymptomSurvey (SurveyID, StartTime, EndTime, UserID) values (" + surveyinfo.surveyid + ", '" + surveyinfo.starttime + "', '" + surveyinfo.endtime + "', " + surveyinfo.userid + ");";
    console.log(sqlstmt1);
    var result = {};
    connection.query(sqlstmt1, function(err, rows, fields) {
        if(!err){
            var survey_array = [];
            for(var i = 0; i < survey.length; i++) {
                var symptom = survey[i];
                console.log("Symptom: " + symptom);
                survey_array.push([surveyinfo.surveyid, surveyinfo.userid, symptom.symptom, symptom.status]);
            }
            var sqlstmt2 = "insert into Surveys (SurveyID, UserID, SymptomID, SymptomStatus) values ?";
            connection.query(sqlstmt2, [survey_array], function(err, rows, fields) {
                if(!err) {
                    result.status = true;
                    result.message = "Successfully submitted survey";
                    res.send(result);
                } else {
                    result.status = false;
                    result.message = "Error submitting survey: " + err;
                    res.send(result);
                }
            });
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