var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var uuid = require('node-uuid');
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
    session.verify(req.body.sessionid, function(userid) {
        var surveyinfo = req.body;
        console.log(req.body);
        var survey = surveyinfo.survey;
        var surveyid = uuid.v4();
        console.log(surveyid.toString())
        var sqlstmt1 = "insert into WeeklySymptomSurvey (SurveyID, StartTime, EndTime, UserID) values ('" + surveyid + "', '" + surveyinfo.starttime + "', '" + surveyinfo.endtime + "', '" + userid + "');";
        console.log(sqlstmt1);
        var result = {};
        connection.query(sqlstmt1, function(err, rows, fields) {
            if(!err){
                var survey_array = [];
                for(var i = 0; i < survey.length; i++) {
                    var symptom = survey[i];
                    console.log("Symptom: " + symptom.symptom + " Status: " + symptom.status);
                    survey_array.push([surveyid, userid, symptom.symptom, symptom.status]);
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
    
});

router.get('/', function(req, res, next) {
    res.send("Hi, how are you");
});

module.exports = router;