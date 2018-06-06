var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
////////////////////////////////////////////////////////
var session = require('express-session');

//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var board =require('./routes/board');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//////////////////////////////////////////////////////
app.use(session({
  secret: 'sdgesdfsadfasfd',
  resave: false,
  saveUninitialized: true
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('views'));

//app.use('/index.html', indexRouter);
app.use('/users', usersRouter);
app.use('/board', board);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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


///////////////////////////////////////////////////////
app.get('/count', function(req,res){
    req.session.count=1;
    res.send('hi session');
});

app.get('/tmp', function(req,res){
  res.send('result: '+ req.session.count);
});



module.exports = app;
