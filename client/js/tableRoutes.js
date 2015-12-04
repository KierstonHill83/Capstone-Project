var userId;
var friendId;

////////////////////////////////
// User Info Form - Register //
///////////////////////////////

$('#user-signup').submit(function(e) {
  e.preventDefault();
  if ($('#password').val() === $('#password2').val()) {
    $.post('/api/users', {
      name: $('#first-name').val().toLowerCase(),
      username: $('#username').val().toLowerCase(),
      email: $('#email').val().toLowerCase(),
      location: $('#location').val().toLowerCase(),
      gender: $('#gender').val().toLowerCase(),
      age: $('#age').val().toLowerCase(),
      password: $('#password').val().toLowerCase()
    },
    function(data, status) {
      if (status === 'success') {
        userId = data.id;
        startSocket();
        console.log('userId', userId);
      } else {
        userId = null;
      }
    });
  } else {
    ////DON'T LET THE PAGE CHANGE VIEWS...NEED AUTHENTICATION REQUIREMENT BEFORE SHOWING NEXT VIEW, DON'T ADD USER TO THE DATABASE
    console.log('Password is not the same');
  }
  setTimeout(signIn, 2000);
  $('#all-info').hide();
  $('.personal-page').show();
});

function signIn() {
  $.post('/auth/login', {
    email: $('#email').val().toLowerCase(),
    password: $('#password').val().toLowerCase() 
  }, function(data, status) {
    console.log('status ', status);
  });
}


/////////////////////
// Edit User Info //
////////////////////

$('#edit-profile').on('click', function() {
  $.get('/api/user/' +userId, function(data) {
    console.log('data from edit ',data);
  });
});

//RE-POPULATE THE FORM WITH DATA
// RUN UPDATE ON SUBMIT


////////////////////
// User Activity //
///////////////////

$('#user-activity').submit(function(e) {
  e.preventDefault();
  console.log($('#activity-option option:selected').text());
  $.post('/api/userActivities', {
    userActivity: $('#activity-option option:selected').text().toLowerCase(),
    userActivityId: $('#activity-option option:selected').val().toLowerCase()
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
    userActivityId: $('#activity-option option:selected').val().toLowerCase(),
    propertyName: $('.activity-name').text().toLowerCase(),
    propertyValue: $('.activity-value').val().toLowerCase()
  },
  {
    userActivityId: $('#activity-option option:selected').val().toLowerCase(),
    propertyName: $('.activity-name2').text().toLowerCase(),
    propertyValue: $('.activity-value2').val().toLowerCase()
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

$('.partner-form').submit(function(e) {
  e.preventDefault();
  var age = $('#age-option option:selected').val().toLowerCase();
  var gender = $('#gender-partner').val().toLowerCase();
  var location = $('#location-partner').val().toLowerCase();
  var userActivity = $('#activity-option option:selected').text().toLowerCase();
  var activityName = $('.property-name').text().toLowerCase();
  var activityProperty = $('#pace-option option:selected').val().toLowerCase();

  $.get('/api/partners/' +age+ '/' +gender+ '/' +location+ '/' +userActivity+ '/' +activityName+ '/' +activityProperty, {
    gender: gender,
    age: age,
    location: location,
    userActivity: userActivity,
    activityName: activityName,
    activityProperty: activityProperty
  },
  function(data, status) {
    friendId = data[0].id;
    showPartners1(data);
    console.log('status ' + status);
    console.log('data ', data);
  });
  $('.partner-form').hide();
  $('.show-partners').show();
});


///////////////////////
// Helper Functions //
//////////////////////

function showPartners1(data) {
  $('#p-img1').html(data[0].image);
  $('#p-name1').html(data[0].username);
  $('#p-age1').html(data[0].age);
  $('#p-gender1').html(data[0].gender);
  $('#p-location').html(data[0].location);
  $('#p-activity1').html(data[0].userActivity);
  $('#p-property-name1').html(data[0].prop[0].propertyName);
  $('#p-property-value1').html(data[0].prop[0].propertyValue);
  $('#p-property-name2').html(data[0].prop[1].propertyName);
  $('#p-property-value2').html(data[0].prop[1].propertyValue);
}


