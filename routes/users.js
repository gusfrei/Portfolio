/*
File: users.js
Student: Gustavo Frei 
Student ID: 301290162 
Date: May 30, 2023 
*/ 
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
