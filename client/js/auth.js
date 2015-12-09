///////////////////
// User Sign-In //
//////////////////

$('#signin-form').submit(function(e) {
  e.preventDefault();
  $.post('/auth/login', {
    email: $('#email-signin').val().toLowerCase(),
    password: $('#password-signin').val().toLowerCase()
  },
  function(data, status) {
    if (status === 'success') {
      userId = data.data.id;
      username = data.data.username;
      $('#nav-signup').hide();
      $('#signin-page').hide();
      $('#nav-welcome').show();
      $('#welcome-name').html(username.toProperCase()).show();
    } else {
      userId = null;
      console.log('error', data.data);
    }
    startSocket(userId);
  });
  console.log($('#email-signin').val());
  $('#signin-form').hide();
  $('#all-info').hide();
  $('.signin-page').hide();
  $('.personal-page').show();
  $('#heart1').show();
  $('#email-signin').html('');
  $('#password-signin').html('');
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
});

$('.return-home').on('click', function() {
  $('#all-info').hide();
  $('.personal-page').hide();
  $('#nav-welcome').hide();
  $('#welcome-name').hide();
  $('#nav-signup').show();
  $('#signin-page').show();
  $('.home-page').show();
});
