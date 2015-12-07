var userId;
var friendId;
var username;

////////////////////////////////
// User Info Form - Register //
///////////////////////////////

$('#user-signup').submit(function(e) {
  e.preventDefault();
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
      username = data.username;
      startSocket();
      $('#nav-signup').hide();
      $('#signin-page').hide();
      $('#nav-welcome').show();
      $('#welcome-name').html(username).show();
    } else {
      userId = null;
    }
  });
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

$('#edit-profile').on('click', function(e) {
  e.preventDefault();
  $.get('/api/user/' +userId, function(data) {
    $('#edit-full').val(data.name);
    $('#edit-username').val(data.username);
    $('#edit-email').val(data.email);
    $('#edit-location').val(data.location);
    $('#edit-gender').val(data.gender);
    $('#edit-age').val(data.age);
    $('#edit-photo').val(data.image);
    $('#edit-password').val(data.password);
    console.log('data from edit ',data);
  });
});

$('#edit-submit').on('click', function(e) {
  e.preventDefault();
  $.ajax ({
    method: 'PUT',
    url: '/api/user/' +userId,
    data: {
      name: $('#edit-full').val().toLowerCase(),
      username: $('#edit-username').val().toLowerCase(),
      email: $('#edit-email').val().toLowerCase(),
      location: $('#edit-location').val().toLowerCase(),
      gender: $('#edit-gender').val().toLowerCase(),
      age: $('#edit-age').val().toLowerCase(),
      password: $('#edit-password').val().toLowerCase()
      // image: $('#edit-photo').val()
    }
  }).done(function(data, status) {
    if (status == 'success') {
      $('.success-message').html('Update was successful!').show();
    } else {
      $('.error-message').html('Update was not successful.').show();
    }
    console.log(data);
    console.log(status);
  });
});


/////////////////////////
//    User Activity    //
//         and         //
// Activity Properties //
/////////////////////////

$('#user-activity').submit(function(e) {
  e.preventDefault();
  $.post('/api/userActivities', {
    userActivity: $('input[name=activity]:checked').attr('data-value').toLowerCase(),
    userActivityId: $('input:checked').val().toLowerCase()
  },
  function(data, status) {
    console.log('status ', status);
  });
  if ($('input[name=activity]:checked').attr('data-value') === 'Running') {
    $.post('/api/activityProperties', { properties: [{
      userActivityId: $('input:checked').val().toLowerCase(),
      propertyName: $('.activity-name').text().toLowerCase(),
      propertyValue: $('.activity-value').val().toLowerCase()
    },
    {
      userActivityId: $('input:checked').val().toLowerCase(),
      propertyName: $('.activity-name2').text().toLowerCase(),
      propertyValue: $('.activity-value2').val().toLowerCase()
    }]},
    function(data, status) {
      console.log('status ', status);
    });
  } else if ($('input[name=activity]:checked').attr('data-value') === 'Biking') {
    $.post('/api/activityProperties', { properties: [{
      userActivityId: $('input:checked').val().toLowerCase(),
      propertyName: $('.activity-name').text().toLowerCase(),
      propertyValue: $('.activity-value').val().toLowerCase()
    },
    {
      userActivityId: $('input:checked').val().toLowerCase(),
      propertyName: $('.activity-name2').text().toLowerCase(),
      propertyValue: $('.activity-value2').val().toLowerCase()
    }]},
    function(data, status) {
      console.log('status ', status);
    });
  } else if ($('input[name=activity]:checked').attr('data-value') === 'Swimming') {
    $.post('/api/activityProperties', { properties: [{
      userActivityId: $('input:checked').val().toLowerCase(),
      propertyName: $('.activity-name').text().toLowerCase(),
      propertyValue: $('.activity-value').val().toLowerCase()
    },
    {
      userActivityId: $('input:checked').val().toLowerCase(),
      propertyName: $('.activity-name2').text().toLowerCase(),
      propertyValue: $('.activity-value2').val().toLowerCase()
    }]},
    function(data, status) {
      console.log('status ', status);
    });
  } else if ($('input[name=activity]:checked').attr('data-value') === 'Golfing') {
    $.post('/api/activityProperties', { properties: [{
      userActivityId: $('input:checked').val().toLowerCase(),
      propertyName: $('#property-level').text().toLowerCase(),
      propertyValue: $('input[name=level]:checked').attr('data-value').toLowerCase()
    },
    {
      userActivityId: $('input:checked').val().toLowerCase(),
      propertyName: $('.activity-holes').text().toLowerCase(),
      propertyValue: $('.activity-holes').val()
    }]},
    function(data, status) {
      console.log('status ', status);
    });
  } else if ($('input[name=activity]:checked').attr('data-value') === 'Skiing') {
    $.post('/api/activityProperties', { properties: [{
      userActivityId: $('input:checked').val().toLowerCase(),
      propertyName: $('#property-level').text().toLowerCase(),
      propertyValue: $('input[name=level]:checked').attr('data-value').toLowerCase()
    },
    {
      userActivityId: $('input:checked').val().toLowerCase(),
      propertyName: $('#property-runs').text().toLowerCase(),
      propertyValue: $('input[name=runs]:checked').attr('data-value').toLowerCase()
    }]},
    function(data, status) {
      console.log('status ', status);
    });
  } else if ($('input[name=activity]:checked').attr('data-value') === 'Snowboarding') {
    $.post('/api/activityProperties', { properties: [{
      userActivityId: $('input:checked').val().toLowerCase(),
      propertyName: $('#property-level').text().toLowerCase(),
      propertyValue: $('input[name=level]:checked').attr('data-value').toLowerCase()
    },
    {
      userActivityId: $('input:checked').val().toLowerCase(),
      propertyName: $('#property-runs').text().toLowerCase(),
      propertyValue: $('input[name=runs]:checked').attr('data-value').toLowerCase()
    }]},
    function(data, status) {
      console.log('status ', status);
    });
  }
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
    // GRABBING ONLY THE ID FROM THE FIRST PERSON...MAKE THIS DYNAMIC TO WHOEVER IS CHOSEN
    // friendId = data[0].id;
    showPartners1(data);
    showPartners2(data);
    showPartners3(data);
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
  $('#p-id1').html(data[0].id).hide();
  $('#p-img1').html(data[0].image);
  $('#p-name1').html(data[0].username);
  $('#p-age1').html(data[0].age);
  $('#p-gender1').html(data[0].gender);
  $('#p-location1').html(data[0].location);
  $('#p-activity1').html(data[0].userActivity);
  $('#p-property-name1').html(data[0].prop[0].propertyName);
  $('#p-property-value1').html(data[0].prop[0].propertyValue);
  $('#p-property-name2').html(data[0].prop[1].propertyName);
  $('#p-property-value2').html(data[0].prop[1].propertyValue);
}


function showPartners2(data) {
  $('#p-id2').html(data[1].id).hide();
  $('#p-img2').html(data[1].image);
  $('#p-name2').html(data[1].username);
  $('#p-age2').html(data[1].age);
  $('#p-gender2').html(data[1].gender);
  $('#p-location2').html(data[1].location);
  $('#p-activity2').html(data[1].userActivity);
  $('#p-property-name3').html(data[1].prop[0].propertyName);
  $('#p-property-value3').html(data[1].prop[0].propertyValue);
  $('#p-property-name4').html(data[1].prop[1].propertyName);
  $('#p-property-value4').html(data[1].prop[1].propertyValue);
}


function showPartners3(data) {
  $('#p-id3').html(data[2].id).hide();
  $('#p-img3').html(data[2].image);
  $('#p-name3').html(data[2].username);
  $('#p-age3').html(data[2].age);
  $('#p-gender3').html(data[2].gender);
  $('#p-location3').html(data[2].location);
  $('#p-activity3').html(data[2].userActivity);
  $('#p-property-name5').html(data[2].prop[0].propertyName);
  $('#p-property-value5').html(data[2].prop[0].propertyValue);
  $('#p-property-name6').html(data[2].prop[1].propertyName);
  $('#p-property-value6').html(data[2].prop[1].propertyValue);
}


$('input[type="radio"]#running').on('click', function() {
  $('.properties2').hide();
  $('.properties3').hide();
  $('.properties4').hide();
  $('.properties1').show();
});
$('input[type="radio"]#biking').on('click', function() {
  $('.properties2').hide();
  $('.properties3').hide();
  $('.properties4').hide();
  $('.properties1').show();
});
$('input[type="radio"]#swimming').on('click', function() {
  $('.properties2').hide();
  $('.properties3').hide();
  $('.properties4').hide();
  $('.properties1').show();
});
$('input[type="radio"]#golfing').on('click', function() {
  $('.properties1').hide();
  $('.properties3').hide();
  $('.properties2').show();
  $('.properties4').show();
});
$('input[type="radio"]#skiing').on('click', function() {
  $('.properties1').hide();
  $('.properties4').hide();
  $('.properties2').show();
  $('.properties3').show();
});
$('input[type="radio"]#snowboarding').on('click', function() {
  $('.properties1').hide();
  $('.properties4').hide();
  $('.properties2').show();
  $('.properties3').show();
});


