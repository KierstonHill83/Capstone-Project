module.exports = function(io) {
    // io.on('connection', function(socket) {
    //     console.log('omg sockets!');
    // });


  // change all name to invitee and invitee to name...then room name will be the invitee name

  // add socket stuff here!
  // var io = require('socket.io')(server);
  // console.log('before connection');
  var rooms = [];

  // Set the socket to the name that is entered. This is the userInfoId (unique to each user).
  io.on('connection', function(socket) {
    // console.log('inside first connection');
    socket.on('setName', function(id) {
      socket.name = id;
      // console.log('socket.name ', socket.name);
    });

    // Create a room that is named the name of the user. Push that into the rooms array so it can be saved and accessed easily. Join that room. Loop through the sockets that are connected and if the name equals the name of the invitee, invite them to the private room.
    socket.on('createRoom', function(name, invitee) {
      socket.room = name;
      rooms.push(name);
      socket.join(name);
      // console.log('should be 41', name);
      // console.log('originalUser ', name);
      // console.log('invitee ' +invitee);
      // console.log('connected sockets ',io.sockets.connected);
      var userName = name;
      // var friendName = invitee;
      for (a in io.sockets.connected) {
        // console.log('createRoom: io.sockets.connected[a].name=', io.sockets.connected[a].name);
        // console.log('createRoom: friendName inside loop: ', invitee);
        if (io.sockets.connected[a].name == invitee) {
          // console.log('found the other user ', io.sockets.connected[a].name);
          // userName = io.sockets.connected[a].name;
          // console.log('TRUE');
          // console.log('userName ',userName);
          // console.log('friendName ', friendName);

          // In the second input, put the name of the person you want the link sent to. It will  send as long as they are connected.
          io.sockets.connected[a].emit('privateChat', '<a onclick="socket.emit(\'joinRoom\', \''+userName+'\')">Join '+ userName +'\'s private chat</a>' );
          // console.log('GOT HERE');
          return;
        }

      }
      //submit chat message to database, this will save who is writing message
    });
    // Join that private room.
    socket.on('joinRoom', function(name) {
      socket.room = name;
      // console.log('should be 40 ',name);
      socket.join(name);
    });
    // Send the messages between the 2 users.
    socket.on('chat message', function(msg) {
      // console.log(socket.room);
      //// CHANGE COLOR OF TEXT IN HERE??
      io.sockets.in(socket.room).emit('chat message', msg);
      // check if 1 socket it room, save to database
    });
  });

};
