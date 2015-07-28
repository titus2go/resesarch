var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var uuid = require('node-uuid');
var session = require('./sessions.js');
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
    session.verify(req.body.sessionid, function(userid) {
        var surveyinfo = req.body;
        var level = surveyinfo.entrylevel
        
        var result = {};
        
        //Entry level 0, add entry to WeeklySymptomSurvey
        //param starttime, endtime
        //return surveyid
        if(level == 0)
        {
            var surveyid = uuid.v4();
            var sqlstmt1 = "insert into WeeklySymptomSurvey (SurveyID, StartTime, EndTime, UserID) values ('" + surveyid + "', '" + surveyinfo.starttime + "', '" + surveyinfo.endtime + "', '" + userid + "');";
            connection.query(sqlstmt1, function(err, rows, fields) {
                if(!err){
                    result.status = true;
                    result.message = "Successfully added data to WeeklySymptomSurvey";
                    result.surveyid = surveyid;
                    res.send(result);
                } else {
                    result.status = false;
                    result.message = "Failure to add Data to WeeklySymptomSurvey" + err;
                    result.surveyid = "";
                    res.send(result); 
                }
            });
        }
        
        //Entry level 1, add entry to SurveyQuestionBridge
        //param surveyid, questiontype
        //return questionid
        if(level == 1) 
        {
            var surveyid = surveyinfo.surveyid;
            var questionid = uuid.v4();
            var questiontype = surveyinfo.questiontype;
            var sqlstmt = "insert into SurveyQuestionBridge (SurveyID, QuestionID, QuestionType) values ('" + surveyid + "', '" + questionid + "', " + questiontype + ");";
            connection.query(sqlstmt, function(err, rows, fields) {
                if(!err) {
                    result.status = true;
                    result.message = "Successfully added data to SurveyQuestionBridge";
                    result.questionid = questionid;
                    res.send(result);
                } else {
                    result.status = false;
                    result.message = "Faure to add entry to SurveyQuesitonBridge";
                    result.questionid = "";
                    res.send(result);
                }
            });
        }
        
        //Entry level 2, add entries to Surveys
        //param questionid, options
        if(level == 2)
        {
            var questionid = surveyinfo.questionid;
            var options = surveyinfo.options;
            console.log(JSON.stringify(options));
            var options_array = [];
            for(var i = 0; i < options.length; i++) {
                    var option = options[i];
                    console.log("Options: " + option.type + " Status: " + option.status);
                    options_array.push([questionid, userid, option.type, option.status]);
            }
            console.log("My userid:" + userid);
            var sqlstmt2 = "insert into Surveys (QuestionID, UserID, OptionID, OptionStatus) values ?";
            connection.query(sqlstmt2, [options_array], function(err, rows, fields) {
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
        }
    });
    
});

router.get('/', function(req, res, next) {
    res.send("Hi, how are you");
});

module.exports = router;