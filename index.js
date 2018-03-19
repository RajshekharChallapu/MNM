
// modules include
var express = require('express');
var path = require('path');
var logger= require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator= require('express-validator');
var flash = require('connect-flash');
var firebase = require('firebase');



//Firebase
firebase.initializeApp = {
    apiKey: "AIzaSyB7R3PhMVck6Q74_KhwL60WCA9fwMd70Mk",
    authDomain: "mnma-a92a5.firebaseapp.com",
    databaseURL: "https://mnma-a92a5.firebaseio.com",
    projectId: "mnma-a92a5",
    storageBucket: "mnma-a92a5.appspot.com",
    messagingSenderId: "67218275465"
  };


//Route files
var routes = require('./routes/index');
var albums = require('./routes/albums');
var genres = require('./routes/genres');
var users = require('./routes/users');

//Init App
  var app = express();

  //view engine
  app.set('views', path.join(__dirname,'views'));
  app.set('view engine', 'ejs');

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
app.use(expressValidator({
  errorFormatter: function(param, msg, value){
    var namespace = param.split(',')
    var root = namespace.shift()
    var formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() +']';
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
app.use('/genres',genres);
app.use('/users',users);

//set port

app.set('port',(process.env.PORT || 3000));

//Run server
app.listen(app.get('port'), function(){
  console.log('Server started on port: ' + app.get('port'));
});
