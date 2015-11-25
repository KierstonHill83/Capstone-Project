var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;

var models = require('../models/index');


passport.use(new GitHubStrategy({
  clientID: process.env.githubClientID || 'blah',
  clientSecret: process.env.githubClientSecret || 'blah',
  callbackURL: process.env.githubCallbackURL || 'blah'
},
function(accessToken, refreshToken, profile, done) {
  models.userInfo.findOne({
    where: { email: profile._json.email }
  }).then(function(userInfo) {
    if (userInfo) {
      return done(null, userInfo);
    } else {
      models.userInfo.create({
        email: profile.__json.email
      }).then(function(userInfo) {
        return done(null, userInfo);
      }).catch(function(err) {
        return done(err);
      });
    }
  }).catch(function(err) {
    return done(err);
  });
}));


// serialize and deserialize user (passport)
passport.serializeUser(function(user, done) {
  models.userInfo.findOne({
    where: { id: id }
  }).then(function(userInfo) {
    return done(null, userInfo);
  });
});


module.exports = passport;