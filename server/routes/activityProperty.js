var express = require('express');
var router = express.Router();
var models = require('../models/index');

// GET all activityProperties
router.get('/activityProperties', function(req, res, next) {
  models.activityProperty.findAll({
  }).then(function(activityProperty) {
    res.json(activityProperty);
  }).catch(function(err) {
    res.json(err);
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
    res.json(err);
    console.log(err);
  });
});


// ADD new activityProperties
router.post('/activityProperties', function(req, res, next) {
  console.log('req ',req.body);
  console.log('req.id ', req.user.id);
  models.activityProperty.create({
    propertyName: req.body['properties[0][propertyName]'],
    propertyValue: req.body['properties[0][propertyValue]'],
    userInfoId: req.user.id,
    userActivityId: req.body['properties[0][userActivityId]'] 
  }).catch(function(err) {
    res.json(err);
    console.log(err);
  });
  models.activityProperty.create({
    propertyName: req.body['properties[1][propertyName]'],
    propertyValue: req.body['properties[1][propertyValue]'],
    userInfoId: req.user.id,
    userActivityId: req.body['properties[1][userActivityId]']
  }).then(function(activityProperty) {
    console.log('HERE');
    res.json(activityProperty);
  }).catch(function(err) {
    res.json(err);
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
    res.json(err);
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
    res.json(err);
    console.log(err);
  });
});


module.exports = router;