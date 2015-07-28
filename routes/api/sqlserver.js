var express = require('express');
var router = express.Router();
var mysql = require('mysql');

module.exports = {
    hostname: function(){
        return 'localhost'
    },
    username: function(){
        return 'root'
    },
    password: function(){
        return 'titus2go1986'
    },
    dbname: function(){
        return 'research'
    }
};


