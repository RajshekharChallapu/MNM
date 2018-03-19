var express = require('express');
var router = express.Router();
var firebase = require('firebase');
firebase.initializeApp = {
    
    databaseURL: "https://mnma-a92a5.firebaseio.com",

  };

// Home page
router.get('/', function(req,res,next){
  res.render('genres/index');

});

router.get('/add', function(req,res,next){
  res.render('genres/add');

});

router.post('/add', function(req,res,next){
  var genre ={
    name: req.body.name
  }

var genreRef = firebase.child('genres');
genreRef.push().set(genre);

req.flash('success_msg', 'Genre Saved');
res.redirect('/genres');


});

module.exports = router;
