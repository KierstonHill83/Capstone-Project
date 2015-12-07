var express = require('express');
var router = express.Router();
var models = require('../models/index');

// GET all users
router.get('/users', function(req, res, next) {
  models.userInfo.findAll({
  }).then(function(userInfos) {
    res.json(userInfos);
  }).catch(function(err) {
    res.json(err);
    console.log(err);
  });
});


// GET single user
router.get('/user/:id', function(req, res, next) {
  models.userInfo.find({
    where: {
      id: req.params.id
    }
  }).then(function(userInfo) {
    res.json(userInfo);
  }).catch(function(err) {
    res.json(err);
    console.log(err);
  });
});


// ADD new user
router.post('/users', function(req, res, next) {
  models.userInfo.create({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender,
    location: req.body.location,
    image: req.body.image
  }).then(function(userInfo) {
    res.json(userInfo);
  }).catch(function(err) {
    res.json(err);
    console.log(err);
  });
});


// UPDATE single user
router.put('/user/:id', function(req, res, next) {
  models.userInfo.find({
    where: {
      id: req.params.id
    }
  }).then(function(userInfo) {
    if (userInfo) {
      userInfo.updateAttributes({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        location: req.body.location
      }).then(function(userInfo) {
        res.send(userInfo);
      });
    }
  }).catch(function(err) {
    res.json(err);
    console.log(err);
  });
});


// DELETE single user
router.delete('/user/:id', function(req, res, next) {
  models.userInfo.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(userInfo) {
    res.json(userInfo);
  }).catch(function(err) {
    res.json(err);
    console.log(err);
  });
});


module.exports = router;