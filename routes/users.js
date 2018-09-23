'use strict'
var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var csrfProtect = csrf();
router.use(csrfProtect);

/* GET users listing. */
router.get('/signup', function (req, res, next) {
  var messages = req.flash('error');
  res.render('signup', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
});


module.exports = router;
