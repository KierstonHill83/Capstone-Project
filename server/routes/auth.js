var flash = require('connect-flash');
var express = require('express');
var router = express.Router();
var passport = require('passport');

var local = require('../auth/local.js');


router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.status(500).json({err: err});
    }
    if (!user) {
      return res.status(401).json({err: info});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      console.log('req.user.id ' + req.user.id);
      console.log('req.user ' +req.user.email);
      res.status(200).json({status: 'Login successful!', data: req.user});
    });
  })(req, res, next);
});


router.get('/user_data', function(req, res, next) {
  if (req.user === undefined) {
    res.json({});
  } else {
    res.json({
      id: req.user
    });
  }
});


// router.get('/getuser', function(req, res, next) {
//   if (err) {
//     console.log(err);
//     return next(err);
//   }
//   if (!req.user) {
//     console.log('No one is logged in');
//   }
//   console.log(req.user.email, "req.user.email");
//   return res.status(200).json({ message: req.user.email });
// });


router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});



module.exports = router;





// var flash = require('connect-flash');
// var express = require('express');
// var router = express.Router();

// var passport = require('../auth/github.js');

// router.get('/github',
//   passport.authenticate('github', {
//     scope: [ 'user:email' ]
//   })
// );


// router.get('/github/callback',
//   passport.authenticate('github', {
//     failureRedirect: '/',
//     successFlash: 'Welcome!',
//     failureFlash: 'Something went wrong!'
//   }),
//   function(req, res, next) {
//     res.redirect('/');
//   }
// );


// router.get('/logout', function(req, res) {
//   req.logout();
//   req.flash('info', 'Goodbye!');
//   res.redirect('/');
// });


// module.exports = router;