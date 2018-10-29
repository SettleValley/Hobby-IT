import express from 'express';
import path  from 'path';
import favicon from 'serve-favicon';
import logger  from 'morgan';
import cookieParser  from 'cookie-parser';
import bodyParser  from 'body-parser';
import sassMiddleware  from 'node-sass-middleware';

import index from './routes/index';
import users from './routes/users';

//view engine
import hbs from 'express-handlebars';
import hbsMinify from './helpers/handlebars';
import { helpers } from './public/javascripts/helpers';
//session user
import session from 'express-session';
//session conect
//import {session} from 'connect-mongo';
//passport
import passport from 'passport';
import flash from 'connect-flash';
import validator from 'express-validator';

//db
import mongoose from 'mongoose';

const app = express();

import './config/passport';
//helpers execute handlebars
// view engine setup
// view engine setup
app.engine('.hbs', hbs({
    extname: '.hbs',
    defaultLayout: 'base',
    partialsDir:__dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts',
    helpers: helpers
 }));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
//app.set('view options', { layout: 'base' });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
//session init
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,

  cookie: {
    maxAge: 180 * 60 * 1000
  }
}));
//flash init
app.use(flash());
//passport init
app.use(passport.initialize());
app.use(passport.session());

app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

/* global variable to use in routes or from the views*/
app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  console.log(res.session);
  console.log(req.isAuthenticated());
  res.locals.session = req.session;
  next();
});

app.use('/users', users);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
