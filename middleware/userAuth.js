'use strict'
const express = require('express')
const router = express.Router()

const userAuth = {
  isLoggedIn: function(req, res, next){
    if (req.isAuthenticated()) {

      console.log("logeado");
      next()
    }else {
      req.session.oldUrl = req.url
      res.redirect('/users/signin')
    }
  },
  notLoggedIn: function(req, res, next){

    console.log("no logeado");
    if (!req.isAuthenticated()) {
        return next()
      }
      req.session.oldUrl = req.url
      res.redirect('/')
  }
};


module.exports = userAuth;
