var express = require('express');
var router = express.Router();
var models = require('../models/index');

// GET all chat rooms
router.get('/userChatRooms', function(req, res, next) {
  models.userChatRooms.findAll({
  }).then(function(userChatRooms) {
    res.json(userChatRooms);
  }).catch(function(err) {
    console.log(err);
  });
});


// GET single chat room
router.get('/userChatRoom/:id', function(req, res, next) {
  models.userChatRooms.find({
    where: {
      id: req.params.id
    }
  }).then(function(userChatRooms) {
    res.json(userChatRooms);
  }).catch(function(err) {
    console.log(err);
  });
});


// ADD new chat room
router.post('/userChatRooms', function(req, res, next) {
  models.userChatRooms.create({
    name: req.body.name,
    conversation: req.body.conversation
  }).then(function(userChatRooms) {
    res.json(userChatRooms);
  }).catch(function(err) {
    console.log(err);
  });
});


// UPDATE single chat room
router.put('/userChatRoom/:id', function(req, res, next) {
  models.userChatRooms.find({
    where: {
      id: req.params.id
    }
  }).then(function(userChatRooms) {
    if (userChatRooms) {
      userChatRooms.updateAttributes({
        name: req.body.name,
        conversation: req.body.conversation
      }).then(function(userChatRooms) {
        res.send(userChatRooms);
      });
    }
  }).catch(function(err) {
    console.log(err);
  });
});


// DELETE single chat room
router.delete('/userChatRoom/:id', function(req, res, next) {
  models.userChatRooms.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(userChatRooms) {
    res.json(userChatRooms);
  }).catch(function(err) {
    console.log(err);
  });
});


module.exports = router;