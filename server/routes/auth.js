var flash = require('connect-flash');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var user = require('../auth/github.js');


router.post('/login', function(req, res, next) {
  console.log('req %j', req);
  console.log('res %j', res);
  console.log('login');
  passport.authenticate('local', function(err, user, info) {
    console.log('user ' +user);
    console.log('info ' +info);
    console.log('err ' +err);
    if (err) {
      console.log('first if');
      return res.status(500).json({err: err});
    }
    if (!user) {
      console.log('second if');
      return res.status(401).json({err: info});
    }
    req.logIn(user, function(err) {
      if (err) {
        console.log('third if');
        return res.status(500).json({err: 'Could not log in user'});
      }
      console.log('second success');
      res.status(200).json({status: 'Login successful!'});
    });
  })(req, res, next);

});



module.exports = router;



// var AuthController = {

//   login: passport.authenticate('local', {
//     successRedirect: '/auth/login/success',
//     failureRedirect: '/auth/login/failure'
//   }),

//   loginSuccess: function(req, res){
//     console.log('success req ' +req);
//     console.log('success res ' +res);
//     res.json({
//       success: true,
//       user: req.session.passport.user
//     });
//   },

//   loginFailure: function(req, res){
//     console.log('failure req ' +req);
//     console.log('failure res ' +res);
//     res.json({
//       success:false,
//       message: 'Invalid email or password.'
//     });
//   },

//   logout: function(req, res){
//     console.log('logout req ' +req);
//     console.log('logout res ' +res);
//     req.logout();
//     res.end();
//   },
// };





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