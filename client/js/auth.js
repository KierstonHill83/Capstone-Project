///////////////////
// User Sign-In //
//////////////////

$('#signin-form').submit(function(e) {
  e.preventDefault();
  // console.log('before client post');
  $.post('/auth/login', {
    email: $('#email-signin').val().toLowerCase(),
    password: $('#password-signin').val().toLowerCase()
  },
  function(data, status) {
    if (status === 'success') {
      userId = data.data.id;
    } else {
      userId = null;
      console.log('error', data.data);
    }
    startSocket(userId);
    // console.log('status auth ', status);
    // console.log('data from signin ', data.data);
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
  alert('Logout was successful');
  $('#all-info').hide();
  $('.personal-page').hide();
  $('#nav-signup').show();
  $('#signin-form').show();
  $('.home-page').show();
});