var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var models = require('../models/index');


passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
  },
  function(email, password, done) {
    console.log('inside passport.use');
    models.userInfo.findOne({ 
      where: { email: email } 
    }).then(function (user, err) {
      console.log('err from passport.use ', err);
      console.log('user from passport.use ', user);
      console.log('inside next function');
      if (err) { 
        return done(err); 
      }
      if (!user) {
        console.log('not user');
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (user.dataValues.password !== password ) {
        console.log('not password');
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log('success');
      return done(null, user);
    });
  }
));

// passport.use(new LocalStrategy(
// function(username, password, done) {
//   console.log('inside passport.use');
//   models.userInfo.findOne({
//     where: { email: email }
//   }).then(function(userInfo) {
//     if (userInfo) {
//       return done(null, userInfo);
//     } else {
//       models.userInfo.create({
//         email: email
//       }).then(function(userInfo) {
//         return done(null, userInfo);
//       }).catch(function(err) {
//         return done(err);
//       });
//     }
//   }).catch(function(err) {
//     return done(err);
//   });
// }));


// serialize and deserialize user (passport)
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  models.userInfo.findOne({
    where: {id:id}
  }).then(function(user) {
    return done(null, user);
  });
});



module.exports = passport;



// var passport = require('passport');
// var GitHubStrategy = require('passport-github2').Strategy;

// var models = require('../models/index');


// passport.use(new GitHubStrategy({
//   clientID: process.env.githubClientID || 'blah',
//   clientSecret: process.env.githubClientSecret || 'blah',
//   callbackURL: process.env.githubCallbackURL || 'blah'
// },
// function(accessToken, refreshToken, profile, done) {
//   models.userInfo.findOne({
//     where: { email: profile._json.email }
//   }).then(function(userInfo) {
//     if (userInfo) {
//       return done(null, userInfo);
//     } else {
//       models.userInfo.create({
//         email: profile.__json.email
//       }).then(function(userInfo) {
//         return done(null, userInfo);
//       }).catch(function(err) {
//         return done(err);
//       });
//     }
//   }).catch(function(err) {
//     return done(err);
//   });
// }));


// // serialize and deserialize user (passport)
// passport.serializeUser(function(user, done) {
//   models.userInfo.findOne({
//     where: { id: id }
//   }).then(function(userInfo) {
//     return done(null, userInfo);
//   });
// });


// module.exports = passport;