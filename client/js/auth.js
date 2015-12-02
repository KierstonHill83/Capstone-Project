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
    console.log('status auth ', status);
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