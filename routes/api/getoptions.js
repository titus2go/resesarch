var express = require('express');
var router = express.Router();
var mysql = require('mysql');
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
    var surveyinfo = req.body;
    session.verify(surveyinfo.sessionid, function(userid){
        var sqlstmt = "select s.OptionID, s.OptionStatus, op.OptionName from Surveys as s left join ((select ActionID as OptionID, ActionName as OptionName from Actions) union (select SymptomID as OptionID, SymptomName as OptionName from Symptoms)) as op on s.OptionID=op.OptionID where s.QuestionID='" + surveyinfo.questionid + "';";
        console.log(sqlstmt);
        var result = {};
        connection.query(sqlstmt, function(err, rows, fields) {
            if(!err){
                result.status = true;
                result.message = "Successfully retrieved questions";
                result.options = rows;
                console.log(JSON.stringify(rows));
                res.send(result); 
            } else {
                result.status = false;
                result.message = "Failure to retreived questions " + err;
                res.send(result); 
            }
        });
    });
    
});



router.get('/', function(req, res, next) {
    res.send("Hi, how are you");
});

module.exports = router;