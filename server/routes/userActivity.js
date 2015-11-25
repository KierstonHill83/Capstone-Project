var express = require('express');
var router = express.Router();
var models = require('../models/index');


// GET all userActivities
router.get('/userActivities', function(req, res, next) {
  models.userActivity.findAll({
  }).then(function(userActivity) {
    res.json(userActivity);
  }).catch(function(err) {
    console.log(err);
  });
});


// GET single userActivity
router.get('/userActivity/:id', function(req, res, next) {
  models.userActivity.find({
    where: {
      id: req.params.id
    }
  }).then(function(userActivity) {
    res.json(userActivity);
  }).catch(function(err) {
    console.log(err);
  });
});


// ADD new userActivity
router.post('/userActivities', function(req, res, next) {
  models.userActivity.create({
    userActivity: req.body.userActivity
  }).then(function(userActivity) {
    res.json(userActivity);
  }).catch(function(err) {
    console.log(err);
  });
});


// UPDATE single userActivity
router.put('/userActivity/:id', function(req, res, next) {
  models.userActivity.find({
    where: {
      id: req.params.id
    }
  }).then(function(userActivity) {
    if (userActivity) {
      userActivity.updateAttributes({
        userActivity: req.body.userActivity
      }).then(function(userActivity) {
        res.send(userActivity);
      });
    }
  }).catch(function(err) {
    console.log(err);
  });
});


// DELETE single userActivity
router.delete('/userActivity/:id', function(req, res, next) {
  models.userActivity.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(userActivity) {
    res.json(userActivity);
  }).catch(function(err) {
    console.log(err);
  });
});


module.exports = router;