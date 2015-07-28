var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var uuid = require('uuid');
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


module.exports = {
    test: function() {
        console.log("Session module should be working");
    },
    verify: function(sessionid, callback) {
        var checkstmt = "select LastLoginTime, UserID from Sessions where SessionID='" + sessionid + "';";
        console.log(checkstmt);
        connection.query(checkstmt, function(err, rows, fields){
            if(!err) {
                console.log("Found users " + rows[0]["UserID"]);
                callback(rows[0]["UserID"]);
            } else {
                console.log("Error processing session login");
            };
        });
    },
    login: function(username, password, res) {
        var signinstmt = "select UserID from Users where UserName like '" + username + "' and UserPassword like '" + password + "';"
        console.log("Sign in statement: " + signinstmt);
        connection.query(signinstmt, function(err, rows, fields) {
                if(!err) {
                    console.log("result: " + JSON.stringify(rows));
                    var result = {};

                    //User not found
                    if(rows.length  == 0) {
                        result.status = false
                        result.message = "Username and/or password is invalid";
                        res.send(result);
                    } 
                    //Found user
                    else {
                        var userid = rows[0]["UserID"];
                        var sessionidstmt = "select SessionID from Sessions where UserID='" + userid + "';";

                        //Check if sessionid exists
                        connection.query(sessionidstmt, function(err, rows, fields) {
                            if(!err) {
                                //SessionID not exist -> insert a new one
                                if(rows.length == 0) {
                                    var timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
                                    console.log("New session time for " + username + " " + timestamp);
                                    var tempUUID = uuid.v1();
                                    var insertstmt = "insert into Sessions(UserID, SessionID, LastLoginTime) values ('" + userid + "', '" + tempUUID + "', '" + timestamp + "');";
                                    connection.query(insertstmt, function(err, rows, fields) {
                                        if(!err) {
                                            result.status = true;
                                            result.message = "Found user";
                                            result.sessionid = tempUUID;
                                            res.send(result);
                                        } else {
                                            result.status = false;
                                            result.message = "Error inserting sessionid: " + err;
                                            res.send(result);
                                        }
                                    });       
                                } else {
                                    result.status = true;
                                    result.message = "Found user";
                                    result.sessionid = rows[0]["SessionID"];
                                    res.send(result);
                                }
                            }
                            else {
                                result.status = false;
                                result.message = "Found user, but error in inserting session id: " + err;
                                res.send(result);
                            }
                        });
                    }
                } else {
                    result.status = false;
                    result.message = "Unable to find user: " + err;
                    res.send(result);
                }
        });
    }
}
