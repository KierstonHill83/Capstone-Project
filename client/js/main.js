$(document).on('ready', function() {
  
  $('.full-chat').hide();
  $('#all-info').hide();
  $('.personal-page').hide();
  $('.activity-form').hide();
  $('.partner-form').hide();
  $('.signin-page').hide();
  $('.show-partners').hide();
  $('#edit-info').hide();
  $('#nav-welcome').hide();
  $('#welcome-name').hide();
  $('.success-message').hide();
  $('.error-message').hide();
  $('.properties').hide();
  $('#partner-message').hide();
  $('.map').hide();
  $('.heart').hide();

});


/////////////////////
// Navbar Control //
////////////////////

$('#nav-home').on('click', function() {
  $('.full-chat').hide();
  $('#all-info').hide();
  $('.personal-page').hide();
  $('.signin-page').hide();
  $('#edit-info').hide();
  $('.map').hide();
  $('.home-page').show();
});

$('#nav-signup').on('click', function() {
  $('.full-chat').hide();
  $('.home-page').hide();
  $('.personal-page').hide();
  $('.signin-page').hide();
  $('#edit-info').hide();
  $('.map').hide();
  $('#all-info').show();
});

/// THIS WILL BE DIFFERENT...WILL HAVE LOGIN AND ON THAT SUBMIT, IT WILL DO THESE THINGS
$('#signin-page').on('click', function() {
  $('#all-info').hide();
  $('.home-page').hide();
  $('.signin-page').show();
});

$('.nav-personal').on('click', function() {
  $('.full-chat').hide();
  $('.signin-page').hide();
  $('#edit-info').hide();
  $('.map').hide();
  $('#all-info').hide();
  $('.home-page').hide();
  $('.personal-page').show();
});

$('#user-submit').on('click', function() {
  $('#nav-signup').hide();
  $('#signin-page').hide();
  $('#nav-welcome').show();
  $('#welcome-name').html(username).show();
});


///////////////////////////////////
// Personal Page Sidebar Control //
///////////////////////////////////

$('#overview').on('click', function() {
  $('.partner-form').hide();
  $('.activity-form').hide();
  $('.full-chat').hide();
  $('#edit-info').hide();
  $('.map').hide();
  $('.overview').show();
  $('.heart').hide();
  $('#heart1').show();
});

$('#edit-profile').on('click', function() {
  $('.overview').hide();
  $('.partner-form').hide();
  $('.activity-form').hide();
  $('.full-chat').hide();
  $('.map').hide();
  $('.heart').hide();
  $('#heart2').show();
  $('#edit-info').show();
});

$('#activity-form').on('click', function() {
  $('.partner-form').hide();
  $('.overview').hide();
  $('.full-chat').hide();
  $('#edit-info').hide();
  $('.map').hide();
  $('.heart').hide();
  $('#heart3').show();
  $('.activity-form').show();
});

$('#partner-form').on('click', function() {
  $('.overview').hide();
  $('.activity-form').hide();
  $('.full-chat').hide();
  $('#edit-info').hide();
  $('.map').hide();
  $('.heart').hide();
  $('#heart4').show();
  $('.partner-form').show();
});

$('#chat-room').on('click', function() {
  $('.overview').hide();
  $('.activity-form').hide();
  $('.partner-form').hide();
  $('.show-partners').hide();
  $('#edit-info').hide();
  $('.map').hide();
  $('.heart').hide();
  $('#heart5').show();
  $('.full-chat').show();
});

$('#trails').on('click', function() {
  mapInit();
  $('.overview').hide();
  $('.activity-form').hide();
  $('.partner-form').hide();
  $('.show-partners').hide();
  $('#edit-info').hide();
  $('.full-chat').hide();
  $('.heart').hide();
  $('#heart6').show();
  $('.map').show();
});

$('#help').on('click', function() {
  $('.overview').hide();
  $('.activity-form').hide();
  $('.partner-form').hide();
  $('.show-partners').hide();
  $('#edit-info').hide();
  $('.full-chat').hide();
  $('.heart').hide();
  $('#heart7').show();
});


