$(document).on('ready', function() {
  $('.full-chat').hide();
  $('#all-info').hide();
  $('.personal-page').hide();
  $('.activity-form').hide();
  $('.partner-form').hide();
  $('.signin-page').hide();


  //////////////////
  // Google Maps //
  /////////////////

  var map = new google.maps.Map(document.getElementById("map-div"),{
    center: {lat:39.393981, lng:-106.016311},
    zoom: 7
  });

  var placeInput = document.getElementById('place-input');

  var autocomplete = new google.maps.places.Autocomplete(placeInput);
  autocomplete.bindTo('bounds', map);

  var place;

  autocomplete.addListener('place_changed', function() {
    place = autocomplete.getPlace();
  });

  $(document).on("click",'#add-location', function(e){
    e.preventDefault();

    if (! place.geometry) {
      return;
    }
    else if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    }
    else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    var marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map
    });

    var infowindow = new google.maps.InfoWindow({
      content: "<div><h4>"+place.name+"</h4><p>"+place.formatted_address+"</p></div>"
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  });


});


/////////////////////
// Navbar Control //
////////////////////

$('#nav-home').on('click', function() {
  $('.full-chat').hide();
  $('#all-info').hide();
  $('.personal-page').hide();
  $('.signin-page').hide();
  $('.home-page').show();
});

$('#nav-signup').on('click', function() {
  $('.full-chat').hide();
  $('.home-page').hide();
  $('.personal-page').hide();
  $('.signin-page').hide();
  $('#all-info').show();
});

/// THIS WILL BE DIFFERENT...WILL HAVE LOGIN AND ON THAT SUBMIT, IT WILL DO THESE THINGS
$('#signin-page').on('click', function() {
  $('#all-info').hide();
  $('.home-page').hide();
  $('.signin-page').show();
});


///////////////////////////////////
// Personal Page Sidebar Control //
///////////////////////////////////

$('#activity-form').on('click', function() {
  $('.partner-form').hide();
  $('.overview').hide();
  $('.full-chat').hide();
  $('.activity-form').show();
});

$('#partner-form').on('click', function() {
  $('.overview').hide();
  $('.activity-form').hide();
  $('.full-chat').hide();
  $('.partner-form').show();
});

$('#overview').on('click', function() {
  $('.partner-form').hide();
  $('.activity-form').hide();
  $('.full-chat').hide();
  $('.overview').show();
});

$('#chat-room').on('click', function() {
  $('.overview').hide();
  $('.activity-form').hide();
  $('.partner').hide();
  $('.full-chat').show();
});


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



////////////////////
// user info form //
////////////////////

$('#user-signup').submit(function(e) {
  e.preventDefault();
  if ($('#password').val() === $('#password2').val()) {
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
  } else {
    ////DON'T LET THE PAGE CHANGE VIEWS...NEED AUTHENTICATION REQUIREMENT BEFORE SHOWING NEXT VIEW
    console.log('Password is not the same');
  }
  $('#all-info').hide();
  $('.personal-page').show();
});


///////////////////
// User Sign-In //
//////////////////

$('#signin-form').submit(function(e) {
  e.preventDefault();
  console.log('before client post');
  $.post('/auth/login', {
    email: $('#email-signin').val(),
    password: $('#password-signin').val()
  },
  function(data, status) {
    console.log('data from signin ' +data);
  });
  console.log($('#email-signin').val());
  $('#signin-form').hide();
  $('#all-info').hide();
  // $('#nav-signup').hide();
  $('.signin-page').hide();
  $('.personal-page').show();
  $('#email-signin').val('');
  $('#password-signin').val('');
});


//////////////////
// User Logout //
/////////////////

$('#logout').on('click', function() {
  $.get('/auth/logout', {
   ///what goes here!!!
  }, function(data, status) {
    console.log(status);
  });
  // $('#all-info').hide();
  // $('.personal-page').hide();
  // $('#nav-signup').hide();
  // $('#signin-form').show();
  // $('.home-page').show();
});



////////////////////
// User Activity //
///////////////////

$('#user-activity').submit(function(e) {
  e.preventDefault();
  console.log($('#activity-option option:selected').text());
  $.post('/api/userActivities', {
    userActivity: $('#activity-option option:selected').text()
  },
  function(data, status) {
    console.log('status ' + status);
  });
});


////////////////////////
// Activity Property //
///////////////////////

$('#activity-property').submit(function(e) {
  e.preventDefault();
  $.post('/api/activityProperties', {
    propertyName: $('.activity-name').val(),
    propertyValue: $('.activity-value').val()
  },
  function(data, status) {
    console.log('status ' + status);
  });
  console.log($('.activity-name').val());
  console.log($('.activity-value').val());
});



