'use strict'
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const sassMiddleware = require('node-sass-middleware')

const index = require('./routes/index')
const users = require('./routes/users')

//view engine
const hbs = require('express-handlebars')
//session user
const session = require('express-session')
//session conect
const MongoStore = require('connect-mongo')(session);
//passport
const passport = require('passport');
const flash = require('connect-flash');
const validator = require('express-validator')

//db
const mongoose = require('mongoose');

const app = express()

require('./config/passport')
//helpers execute handlebars
// app.engine('handlebars', hbsHelpers.engine);
// view engine setup
// view engine setup
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'base',
    helpers: require('./public/javascripts/helpers.js').helpers,
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts'
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view options', { layout: 'base' });

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
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
app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

app.use('/users', users);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
