var app = require('./app2.js');


// Set the server to 3000
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

// add socket stuff here!
var io = require('socket.io')(server);
console.log('before connection');
var rooms = [];

// Set the socket to the name that is entered. This is the username.
io.on('connection', function(socket) {
  console.log('inside first connection');
  socket.on('setName', function(name) {
    socket.name = name;
    console.log(socket.name);
  });

  // Create a room that is named the name of the user. Push that into the rooms array so it can be
  // saved and accessed easily. Join that room. Loop through the sockets that are connected and if 
  // the name equals the name of the invitee, invite them to the private room.
  socket.on('createRoom', function(name, invitee) {
    socket.room = name;
    rooms.push(name);
    socket.join(name);
    console.log('invitee ' +invitee);

      for (a in io.sockets.connected) {
        if (io.sockets.connected[a].name === invitee) {
          // In the second input, put the name of the person you want the
          // link sent to. It will  send as long as they are connected.
          io.sockets.connected[a].emit('privateChat', '<a onclick="socket.emit(\'joinRoom\', \''+name+'\')">Join '+ socket.name +'\'s private chat</a>' );
          break;
        }
      }
  });
  // Join that private room.
  socket.on('joinRoom', function(name) {
    socket.room = name;
    socket.join(name);
  });
  // Send the messages between the 2 users.
  socket.on('chat message', function(msg) {
    // console.log(socket.room);
    io.sockets.in(socket.room).emit('chat message', msg);
  });
});

module.exports = app;
