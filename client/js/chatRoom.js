////////////////
// Chat Room //
///////////////

var socket = io();


$('#chatForm').hide();

// Grab the value of the initial user name.
$('#socketform').submit(function(e) {
  e.preventDefault();
  socket.emit('setName',$('#m').val());
  console.log('name ' +$('#m').val());
  $('#m').val('');
  $('#socketform').hide();
  return false;
});

// Grab the value of the person they want to invite.
$('#privateForm').submit(function(e) {
    e.preventDefault();
    socket.emit('createRoom', $('#p').val(), $('#r').val());
    console.log('name '+$('#p').val());
    console.log('room ' +$('#r').val());
    $('#p').val('');
    $('#r').val('');
    $('#chatForm').show();
    $('#privateForm').hide();
    return false;
});

// Grab the value of the message that is being sent.
$('#chatForm').submit(function(e) {
  e.preventDefault();
    socket.emit('chat message', $('#t').val());
    $('#t').val('');
    return false;
});

// Append the join me message link to the screen.
socket.on('privateChat', function(msg) {
    $('#message').append($('<li>').html(msg));
});

// Console log the messsage
socket.on('private', function(msg) {
    console.log(msg);
});

// Apped the message to the screen.
socket.on('chat message', function(msg) {
  $('#message').append($('<li>').text(msg));
});