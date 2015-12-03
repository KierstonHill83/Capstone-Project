////////////////
// Chat Room //
///////////////

var socket = io();


$('#chatForm').hide();


// Grab the value of the initial user name.

// $('#user-signup').submit(function(e) {
//   e.preventDefault();
  // socket.emit('setName',$('#m').val());
  // console.log('name ' +$('#m').val());
  function startSocket() {
    console.log(userId);
    socket.emit('setName', userId);
    $('#m').val('');
    $('#socketform').hide();
    return false;
  }
// });

// Grab the value of the person they want to invite.

// $('#privateForm').submit(function(e) {
//     e.preventDefault();
//     socket.emit('createRoom', $('#p').val(), $('#r').val());
//     console.log('name '+$('#p').val());
//     console.log('room ' +$('#r').val());
//     $('#p').val('');
//     $('#r').val('');
//     $('#chatForm').show();
//     $('#privateForm').hide();
//     return false;
// });

// DO THIS WHEN CONFIRM IS CLICKED ON THE RECOMMENDED PARTNER...ADD TO FRIENDS TABLE WITH PENDING AS THE STATUS
$('.confirm-chat').on('click', function(e) {
  e.preventDefault();
  socket.emit('createRoom', userId, friendId);
  console.log('userId ', userId);
  console.log('friendId ', friendId);
});

/// WHEN THE FRIEND CLICKS THE LINK THAT IS SENT WITH THEIR IMAGE, MAYBE ON A HOVER IT WILL GIVE THEIR INFO DETAILS...THEY WILL JOIN THE ROOM...CHANGE FRIEND STATUS TO FRIEND IN FRIENDS TABLE
// Append the join me message link to the screen.
socket.on('privateChat', function(msg) {
    $('#message').append($('<li>').html(msg));
});


// Grab the value of the message that is being sent.
$('#chatForm').submit(function(e) {
  e.preventDefault();
    socket.emit('chat message', $('#t').val());
    $('#t').val('');
    return false;
});


// Console log the messsage
socket.on('private', function(msg) {
    console.log(msg);
});

// Apped the message to the screen.
socket.on('chat message', function(msg) {
  $('#message').append($('<li>').text(msg));
});