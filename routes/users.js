'use strict'
var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
//middleware
const authLogin = require('../middleware/userAuth')

var csrfProtect = csrf();
router.use(csrfProtect);

/*
  REST User, try to make this function with promise,
  that make this code more readable
*/
//Log Out
router.get('/logout', (req, res)=>{
  req.logout()
  res.redirect('/')
})
/* GET users listing. */
router.route('/signup')
  .get(authLogin,(req,res)=>{
    const messages = req.flash('error')
    console.log("index signup")
    res.render('signup',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 })
  })
  .post(passport.authenticate('local.signup', {
    failureRedirect: '/users/signup',
    failureFlash: true
  }),(req, res)=>{
    console.log("postiando ps")
    if (req.session.oldUrl) {
      const Url = req.session.oldUrl;
      req.session.oldUrl = null;
      res.redirect(Url);
    }else {
      res.redirect('/');
    }
  })

  router.route('/signin')
    .get(authLogin,(req,res)=>{
      const messages = req.flash('error')
      console.log("index signin")
      res.render('signin',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 })
    })
    .post(passport.authenticate('local.signin', {
      failureRedirect: '/users/signin',
      failureFlash: true
    }),(req, res)=>{
      console.log("entrando ps")
      if (req.session.oldUrl) {
        const Url = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(Url);
      }else {
        res.redirect('/');
      }
    })



module.exports = router;
