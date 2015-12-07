var express = require('express');
var router = express.Router();
var models = require('../models/index.js');

module.exports = function(io) {


  var rooms = [];
  var currFriend;
  var initUser;

  // Set the socket to the name that is entered. This is the userInfoId (unique to each user).
  io.on('connection', function(socket) {
    socket.on('setName', function(id) {
      socket.name = id;
    });

    // Create a room that is named the name of the user. Push that into the rooms array so it can be saved and accessed easily. Join that room. Loop through the sockets that are connected and if the name equals the name of the invitee, invite them to the private room.
    socket.on('createRoom', function(name, invitee, username) {
      initUser = username;
      currFriend = invitee;
      socket.room = name;
      rooms.push(name);
      socket.join(name);
      var userName = name;
      for (a in io.sockets.connected) {
        if (io.sockets.connected[a].name == invitee) {

          // In the second input, put the name of the person you want the link sent to. It will send as long as they are connected.
          io.sockets.connected[a].emit('privateChat', '<a onclick="socket.emit(\'joinRoom\', \''+userName+'\')">Join '+ initUser +'\'s private chat</a>' );
          break;
        }

      }
      /// CREATE NEW ROW IN USERCHATROOMS OR IF EXISTING UPDATE
      //submit chat message to database, this will save who is writing message
      console.log('invitee ', invitee);
      models.userChatRooms.find({
        where: {
          name: invitee
        }
      }).then(function(userChatRooms) {
        console.log('user chat rooms in create: ', userChatRooms);
        if (!userChatRooms) {
          models.userChatRooms.create({
            name: invitee,
            conversation: '',
            userInfoId: userName
          });
        }
      }).catch(function(err) {
        // res.json(err);
        console.log('err from create: ',err);
      });
      console.log('end of create function');
    });
    // Join that private room.
    socket.on('joinRoom', function(name) {
      socket.room = name;
      socket.join(name);
    });
    // Send the messages between the 2 users.
    socket.on('chat message', function(msg) {
      io.sockets.in(socket.room).emit('chat message', msg);
      //submit chat message to database, this will save who is writing message
      models.userChatRooms.find({
        where: {
          name: currFriend
        }
      }).then(function(userChatRooms) {
        if (userChatRooms) {
          console.log('userChatrooms: ', userChatRooms);
          userChatRooms.updateAttributes({
            conversation: userChatRooms.dataValues.conversation + msg + '\n'
          // }).then(function(userChatRooms) {
            // res.send(userChatRooms);
          });
        }
      }).catch(function(err) {
        // res.json(err);
        console.log(err);
      });
    });
  });

};
