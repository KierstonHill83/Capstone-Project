var express = require('express');
var router = express.Router();
var models = require('../models/index');

// GET all activityProperties
router.get('/activityProperties', function(req, res, next) {
  models.activityProperty.findAll({
  }).then(function(activityProperty) {
    res.json(activityProperty);
  }).catch(function(err) {
    console.log(err);
  });
});


// GET single activityProperty
router.get('/activityProperty/:id', function(req, res, next) {
  models.activityProperty.find({
    where: {
      id: req.params.id
    }
  }).then(function(activityProperty) {
    res.json(activityProperty);
  }).catch(function(err) {
    console.log(err);
  });
});


// ADD new activityProperties
router.post('/activityProperties', function(req, res, next) {
  models.activityProperty.create({
    propertyName: req.body.propertyName,
    propertyValue: req.body.propertyValue
  }).then(function(activityProperty) {
    res.json(activityProperty);
  }).catch(function(err) {
    console.log(err);
  });
});


// UPDATE single activityProperty
router.put('/activityProperty/:id', function(req, res, next) {
  models.activityProperty.find({
    where: {
      id: req.params.id
    }
  }).then(function(activityProperty) {
    if (activityProperty) {
      activityProperty.updateAttributes({
        propertyName: req.body.propertyName,
        propertyValue: req.body.propertyValue
      }).then(function(activityProperty) {
        res.send(activityProperty);
      });
    }
  }).catch(function(err) {
    console.log(err);
  });
});


// DELETE single activityProperty
router.delete('/activityProperty/:id', function(req, res, next) {
  models.activityProperty.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(activityProperty) {
    res.json(activityProperty);
  }).catch(function(err) {
    console.log(err);
  });
});


module.exports = router;