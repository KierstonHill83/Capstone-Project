////////////////////////////////
// User Info Form - Register //
///////////////////////////////

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
    ////DON'T LET THE PAGE CHANGE VIEWS...NEED AUTHENTICATION REQUIREMENT BEFORE SHOWING NEXT VIEW, DON'T ADD USER TO THE DATABASE
    console.log('Password is not the same');
  }
  $('#all-info').hide();
  $('.personal-page').show();
});


////////////////////
// User Activity //
///////////////////

$('#user-activity').submit(function(e) {
  e.preventDefault();
  console.log($('#activity-option option:selected').text());
  $.post('/api/userActivities', {
    userActivity: $('#activity-option option:selected').text(),
    userActivityId: $('#activity-option option:selected').val()
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
  $.post('/api/activityProperties', { properties: [{
    userActivityId: $('#activity-option option:selected').val(),
    propertyName: $('.activity-name').text(),
    propertyValue: $('.activity-value').val()
  },
  {
    userActivityId: $('#activity-option option:selected').val(),
    propertyName: $('.activity-name2').text(),
    propertyValue: $('.activity-value2').val()
  }]},
  function(data, status) {
    console.log('status ' + status);
  });
  console.log($('.activity-name').val());
  console.log($('.activity-value').val());
});


////////////////////////
// Find Partner Form //
///////////////////////

$('#partner-form').submit(function(e) {
  e.preventDefault();
  $.get('/api/partners', {
    gender: $('#gender-partner').val(),
    age: $('#age-option option:selected').val(),
    location: $('#location-partner').val(),
    activityName: $('.property-name').text(),
    activityProperty: $('#pace-option option:selected').val()
  });
  console.log($('#gender-partner').val());
  console.log($('#age-option option:selected').val());
  console.log($('#location-partner').val());
  console.log($('.property-name').text());
  console.log($('#pace-option option:selected').val());
});



