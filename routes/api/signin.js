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
        console.log("Error connected to the database - signin.js");
    }
});

/* GET home page. */
router.post('/', function(req, res, next) {
    var userinfo = req.body;
    //User has not signed in
    if(userinfo.sessionid == null || userinfo.sessionid == "")
    {
        //check if username and password match
        if(userinfo.username != "" && userinfo.password != "") 
        {
            var signinstmt = "select UserID from Users where UserName like " + userinfo.username + " and UserPassword like '" + userinfo.password + "';"
            console.log("Sign in statement: " +  signinstmt)
            connection.query(signinstmt, function(err, rows, fields) {
                if(!err) {
                    console.log("result: " + JSON.stringify(rows));
                    var result = {};
                    if(rows.length  == 0) {
                        result.status = false
                        result.message = "Username and/or password is invalid";
                        res.send(result);
                    } else {
                        result.status = true
                        result.message = "Found user"
                        result.id = rows[0]["UserID"];
                        res.send(result);
                    }
                } else {
                    console.log("Error: " + err);
                }
            });
        }
    }
    
});


module.exports = router;
