var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var sqlconnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'titus2go1986',
    database: 'research',
});

module.exports = sqlconnection;

