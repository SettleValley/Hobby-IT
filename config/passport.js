'use strict'
const passport = require('passport')
const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy

passport.serializeUser = (user, done) =>{
  done(null, user.id)
}

passport.deserializeUser = (id, done) =>{
  User.findBydId(id, (err, user)=>{
    done(err, user)
  });
}

passport.user('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done)=>{
  req.checkBody('email', 'Invalid Email').notEmpty().isEmail()
  req.checkBody('password', 'Invalid Password').notEmpty().isLength({min:4})

  let erros = req.validationErrors();
  if (errors) {
    let messages = [];
    errors.forEach((error)=>{
      messages.push(error.msg)
    })
    return done(null, false, req.flash('error', messages))
  }
}))
