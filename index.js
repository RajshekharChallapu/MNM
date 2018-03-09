
// modules include
var express = require('express');
var path = require('path');
var logger= require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator= require('express-validator');
var flash = require('connect-flash');
var Firebase = require('firebase');
var fbRef = new Firebase('https://mnma-a92a5.firebaseio.com/');

//Route files
var routes = require('./routes/index');
var routes = require('./routes/albums');
var routes = require('./routes/geners');
var routes = require('./routes/users');

//Init App
  var app = express();

//middlewares
//logger
app.use(logger('dev'));

//body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());


//Handele sessions
app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave: true
}));

//Validators
app.use(exoressValidator({
  errorFormatter: function(param, msg, value){
    var namespace = param.split(',')
    var root = namespace.shift()
    var formParam = root;

    while (namespace.length) {
      formParam + = '[' +namespace.shift() +']';
    }
    return{
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

//static folder
app.use(express.static(path.join(__dirname, 'public')));


//connect flash middlewares
app.use(flash());

//global var
app.use(function(req,res,next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');

  next();

});

//routes middlewares
app.use('/', routes);
app.use('/albums', albums);
app.use('/geners', geners);
app.use('/users', users);

//set port

app.set('port',(process.env.PORT || 3000));

//Run server
app.listen(app.get('port'), function(){
  console.log('Server started on port: ' + app.get('port'));
});
