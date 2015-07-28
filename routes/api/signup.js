var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var shortid = require('shortid');
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
        console.log("Error connected to the database - signup.js");
    }
});

/* GET home page. */
router.post('/', function(req, res, next) {
    var userinfo = req.body;
    //User has not signed in
    var result = {};
    //check if username and password match
    console.log("password: " + userinfo.password);
    if(userinfo.username != null || userinfo.password != null) 
    {
        var signinstmt = "select UserID from Users where UserName like '" + userinfo.username + "' and UserPassword like '" + userinfo.password + "';"
        console.log("Sign in statement: " +  signinstmt)
        connection.query(signinstmt, function(err, rows, fields) {
            if(!err) {
                console.log("result: " + JSON.stringify(rows));
                var result = {};
                //Cannot find duplicate
                if(rows.length  == 0) {
                    var adduserstmt = "insert into Users (UserID, Username, UserPassword) values ('" + shortid.generate() + "', '" + userinfo.username + "', '" + userinfo.password + "');";
                    console.log("Add user statement: " + adduserstmt);
                    connection.query(adduserstmt, function(err, rows, fields) {
                        if(!err) {
                            result.status = true;
                            result.message = "Sucessfully signed up user";
                            res.send(result);
                        } else {
                            result.stats = false;
                            result.message = "Error in signing up user: " + err;
                            res.send(result);
                        }
                    });
                } else {
                    result.status = false;
                    result.message = "Username has been taken";
                    res.send(result);
                }
            } else {
                console.log("Error: " + err);
            }
        });
    } else {
        result.status = false;
        result.message = "You have not supplied username and/or password";
        res.send(result);
    }
    
});


module.exports = router;
