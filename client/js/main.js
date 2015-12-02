$(document).on('ready', function() {
  
  $('.full-chat').hide();
  $('#all-info').hide();
  $('.personal-page').hide();
  $('.activity-form').hide();
  $('.partner-form').hide();
  $('.signin-page').hide();

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





