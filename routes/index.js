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
    var survey = req.body;
    var sqlstmt = "insert into WeeklyQ1 (id, starttime, endtime, userid, fever, runnynose, coughing, sorethroat, nausea, other, nosymptom) values ('" + survey.id + "', '" + survey.starttime + "', '" + survey.endtime + "', '" + survey.userid + "', " + survey.fever + ", " + survey.runnynose + ", " + survey.coughing + ", " + survey.sorethroat + ", " +  survey.nausea + ", " + survey.other + ", " + survey.nosymptom + ");";
    console.log(sqlstmt);
    var result = {};
    connection.query(sqlstmt, function(err, rows, fields) {
        if(!err){
            result.status = true;
            result.message = "Successfully updated the database";
            res.send(result); 
        } else {
            result.status = false;
            result.message = "Error inserting row " + err;
            res.send(result); 
        }
    });
    
});

router.get('/', function(req, res, next) {
    res.send("Hi, how are you");
});

module.exports = router;
