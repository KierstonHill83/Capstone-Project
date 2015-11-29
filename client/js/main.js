$(document).on('ready', function() {
  $('.full-chat').hide();
  $('#all-info').hide();
});

$('#sign-up').on('click', function() {
  $('#all-info').show();
  $('.home-page').hide();
});



////////////////
// Chat Room //
///////////////

var socket = io();


$('#chatForm').hide();

// Grab the value of the initial user name.
$('#socketform').submit(function() {
  socket.emit('setName',$('#m').val());
  console.log('name ' +$('#m').val());
  $('#m').val('');
  $('#socketform').hide();
  return false;
});

// Grab the value of the person they want to invite.
$('#privateForm').submit(function() {
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
$('#chatForm').submit(function() {
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



////////////////////
// user info form //
////////////////////

$('#user-signup').submit(function() {
  $.post('/api/users', {
    name: $('#first-name').val(),
    username: $('#username').val(),
    email: $('#email').val(),
    location: $('#location').val(),
    gender: $('#gender').val(),
    age: $('#age').val(),
    password: $('#password').val()
  },
  function(data, status) {
    console.log('data from callback: ' + data);
    console.log('status from callback: ' + status);
  });
});



////////////////////////
// user activity form //
////////////////////////


$('#user-activity').submit(function() {
  console.log($('.activity-option').val());
console.log($('.activity-name').val());
console.log($('.activity-value').val());

  $.post('/api/userActivities', {
    userActivity: $('.activity-option').val(),
    propertyName: $('#activity-name').val(),
    propertyValue: $('#activity-value').val()
  },
  function(data, status) {
    // console.log('data ' + data);
    console.log('status ' + status);
  });
});