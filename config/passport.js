'use strict'
const passport = require('passport');
const User = require('../models/user');
const LocalStrategy  = require('passport-local').Strategy;
// Passport serializer controller callback function be called
passport.serializeUser((user, done)=>{
  done(null, user.id)
})
passport.deserializeUser((id, done)=>{
  User.findById(id, (err, user)=>{
    done(err, user)
  })
})
// User Sign up strategy
passport.use('local.signup', new LocalStrategy ({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done)=>{
  req.checkBody('email', 'Invalid Email').notEmpty().isEmail()
  req.checkBody('password', 'Invalid password').notEmpty().isLength({min:4})
  let errors = req.validationErrors()
  if (errors) {
    const messages = []
    errors.forEach( (error)=>{
          messages.push(error.msg)
    })
    return done(null, false, req.flash('error', messages))
  }
  User.findOne({'email': email},(err, user)=>{
    if (err) {
        return done(err)
    }
    if (user){
        return done(null, false, {message: 'El correo ya esta utilizado'})
    }
    let newUser = new User()
    newUser.email = email
    newUser.password = newUser.encryptPassword(password)
    newUser.save((err, result)=>{
      if(err){
          return done(err);
      }
      console.log("paso bien");

      return done(null, newUser)
    })
  })
}))

// User Sign in strategy
passport.use('local.signin', new LocalStrategy ({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done)=>{
  req.checkBody('email', 'Invalid Email').notEmpty().isEmail()
  req.checkBody('password', 'Invalid password').notEmpty()
  let errors = req.validationErrors()
  console.log("drops")
      if (errors) {
        const messages = []
        errors.forEach( (error)=>{
              messages.push(error.msg)
        })
        return done(null, false, req.flash('error', messages))
      }
      User.findOne({'email': email},(err, user)=>{
        if (err) {
            return done(err)
        }
        if (!user) {
            return done(null, false, { message: 'Not found user' })
        }
        if(!user.validPassword(password)){
            return done(null, false, { message: 'Wrong password' })
        }
        return done(null, user)
      })
}))
