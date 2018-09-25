'use strict'
var express = require('express');
var router = express.Router();

module.exports = function(req, res, next){
  if (req.isAuthenticated()) {
    next();
  }else {
    req.session.oldUrl = req.url;
    res.redirect('/users/signin');
  }
}
