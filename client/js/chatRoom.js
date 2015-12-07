////////////////
// Chat Room //
///////////////

var socket = io();


$('.confirm-chat').on('click', function(e) {
  e.preventDefault();
  if (e.currentTarget.id === 'confirm1') {
    friendId = $('#p-id1').text();
    fUsername= $('#p-name1').text();
    $('#friend-username').html($('#p-name1').html());
    $('#friend-age').html($('#p-age1').html());
    $('#friend-gender').html($('#p-gender1').html());
    $('#friend-location').html($('#p-location1').html());
    $('#friend-activity').html($('#p-activity1').html());
    $('#friend-img').html($('#p-img1').html());
    console.log(friendId);
    console.log(fUsername);
  }
  else if(e.currentTarget.id === 'confirm2') {
    friendId = $('#p-id2').text();
    fUsername= $('#p-name2').text();
    $('#friend-username').html($('#p-name2').html());
    $('#friend-age').html($('#p-age2').html());
    $('#friend-gender').html($('#p-gender2').html());
    $('#friend-location').html($('#p-location2').html());
    $('#friend-activity').html($('#p-activity2').html());
    $('#friend-img').html($('#p-img2').html());
    console.log(friendId);
  }
  else if(e.currentTarget.id === 'confirm3') {
    friendId = $('#p-id3').text();
    fUsername= $('#p-name3').text();
    $('#friend-username').html($('#p-name3').html());
    $('#friend-age').html($('#p-age3').html());
    $('#friend-gender').html($('#p-gender3').html());
    $('#friend-location').html($('#p-location3').html());
    $('#friend-activity').html($('#p-activity3').html());
    $('#friend-img').html($('#p-img3').html());
    console.log(friendId);
  }
  socket.emit('createRoom', userId, friendId, username);
  console.log('userId ', userId);
  console.log('friendId ', friendId);
  
  ///SEND ALERT THAT A CHAT REQUEST HAS BEEN SENT
});

// Grab the value of the message that is being sent.
$('#chatForm').submit(function(e) {
  e.preventDefault();
  // send the date and name
    socket.emit('chat message', $('#t').val());
    $('#t').val('');
    return false;
});

socket.on('privateChat', function(msg) {
    console.log('message', msg);
    // msg.msg
    $('#message').append($('<li id="chat-link">').html(msg));
    openChat();
});

// Console log the messsage
socket.on('private', function(msg) {
    console.log(msg);
});

// Apped the message to the screen.
socket.on('chat message', function(msg) {
  $('#message').append($('<li>').text(msg));
});

///////////////////////
// Helper Functions //
//////////////////////

function startSocket(userId) {
  console.log(userId);
  socket.emit('setName', userId);
  return false;
}

function openChat() {
  $('#chat-link').on('click', function() {
    console.log('Private chat opened!');
  });
}




