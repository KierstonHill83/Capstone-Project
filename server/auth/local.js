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