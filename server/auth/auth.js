
// var Seqelize = require('sequelize');
// var pg = require('pg').native;
// var PassportLocalStrategy = require('passport-local').Strategy;
// var models = require('../models/index');
// var sequelize = new Sequelize(models);


// var auth = {};

// auth.localStrategy = new PassportLocalStrategy({
//   email: 'email',
//   password: 'password'
// },
//   function(email, password, done) {
//     var User = require('../models/userinfo').userInfo;
//     User.find({ email: email }).success(function(user) {
//       if (!user) {
//         return done(null, false, { message: 'Nobody here by that name'} );
//       }
//       if (user.password !== password) {
//         return done(null, false, { message: 'Wrong password' } );
//       }
//       return done(null, { email: user.email });
//     });
//   }
// );

// auth.validPassword = function(password) {
//   return this.password === password;
// };

// auth.serializeUser = function(user, done) {
//   done(null, user);
// };

// auth.deserializeUser = function(obj, done) {
//   done(null, obj);
// };


// module.exports = auth;