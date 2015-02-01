'use strict';
var express = require('express');
var router = express.Router();
var Zone = require('../models/zone');
var ff = require('ff');

router.get('/', function(req, res) {
  console.log('#### Getting current environment');
  var data = {
    environment: globalEnv,
    port: globalPort
  }
  res.send(data);
});

module.exports = router;
