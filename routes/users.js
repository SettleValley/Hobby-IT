'use strict'
var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var csrfProtect = csrf();
router.use(csrfProtect);

/*
  REST User, try to make this function with promise,
  that make this code more readable
*/

/* GET users listing. */
router.route('/signup')
  .get((req,res)=>{
    const messages = req.flash('error')
    console.log("index signup")
    res.render('signup',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 })
  })
  .post(passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
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

// Post to signup
// router.post('/signup', passport.authenticate('local.signup', {
//
// }), function (req, res, next) {
//   if (req.session.oldUrl) {
//     var Url = req.session.oldUrl;
//     req.session.oldUrl = null;
//     res.redirect(Url);
//   } else {
//     res.redirect('/user/profile');
//   }
// });

module.exports = router;
