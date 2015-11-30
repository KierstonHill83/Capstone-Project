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