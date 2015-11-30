var express = require('express');
var router = express.Router();
var models = require('../models/index');

// GET all friends
router.get('/friends', function(req, res, next) {
  console.log(req.user)
  models.friends.findAll({
  }).then(function(friends) {
    res.json(friends);
  }).catch(function(err) {
    console.log(err);
  });
});


// GET single friend
router.get('/friend/:id', function(req, res, next) {
  models.friends.find({
    where: {
      id: req.params.id
    }
  }).then(function(friends) {
    res.json(friends);
  }).catch(function(err) {
    console.log(err);
  });
});


// ADD new friends
router.post('/friends', function(req, res, next) {
  models.friends.create({
    status: req.body.status
  }).then(function(friends) {
    res.json(friends);
  }).catch(function(err) {
    console.log(err);
  });
});


// UPDATE single friend
router.put('/friend/:id', function(req, res, next) {
  models.friends.find({
    where: {
      id: req.params.id
    }
  }).then(function(friends) {
    if (friends) {
      friends.updateAttributes({
        status: req.body.status
      }).then(function(friends) {
        res.send(friends);
      });
    }
  }).catch(function(err) {
    console.log(err);
  });
});


// DELETE single friend
router.delete('/friend/:id', function(req, res, next) {
  models.friends.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(friends) {
    res.json(friends);
  }).catch(function(err) {
    console.log(err);
  });
});


module.exports = router;