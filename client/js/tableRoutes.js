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
    password: $('#password').val().toLowerCase(),
    image: $('#image').val()
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


///////////////////
// Show Profile //
//////////////////

// $('#overview').on('click', function(e) {
//   e.preventDefault();
//   $.get('/api/user/' +userId, function(data) {
//     $('#personal-username').val(data.username.toProperCase());
//     $('#personal-location').val(data.location.toProperCase());
//     $('#personal-gender').val(data.gender.toProperCase());
//     $('#personal-age').val(data.age);
//     $('#personal-img').val(data.image);
//   });
// });



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
      password: $('#edit-password').val().toLowerCase(),
      image: $('#edit-photo').val()
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
      propertyName: $('.activity-name1').text().toLowerCase(),
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
      propertyName: $('.activity-name3').text().toLowerCase(),
      propertyValue: $('.activity-value').val().toLowerCase()
    },
    {
      userActivityId: $('input:checked').val().toLowerCase(),
      propertyName: $('.activity-name4').text().toLowerCase(),
      propertyValue: $('.activity-value2').val().toLowerCase()
    }]},
    function(data, status) {
      console.log('status ', status);
    });
  } else if ($('input[name=activity]:checked').attr('data-value') === 'Swimming') {
    $.post('/api/activityProperties', { properties: [{
      userActivityId: $('input:checked').val().toLowerCase(),
      propertyName: $('.activity-name5').text().toLowerCase(),
      propertyValue: $('.activity-value').val().toLowerCase()
    },
    {
      userActivityId: $('input:checked').val().toLowerCase(),
      propertyName: $('.activity-name6').text().toLowerCase(),
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
    showPartners1(data);
    showPartners2(data);
    showPartners3(data);
    console.log('status ' + status);
    console.log('data ', data);
  });
  $('.partner-form').hide();
  $('.show-partners').show();
});


$('.partner-search').on('click', function() {
  $('#partner-message').text('Form submission was successful.').show();
});


///////////////////////
// Helper Functions //
//////////////////////

function showPartners1(data) {
  $('#p-id1').html(data[0].id).hide();
  $('#p-img1').attr('src', data[0].image);
  $('#p-name1').html(data[0].username.toProperCase());
  $('#p-age1').html(data[0].age);
  $('#p-gender1').html(data[0].gender.toProperCase());
  $('#p-location1').html(data[0].location.toProperCase());
  $('#p-activity1').html(data[0].userActivity.toProperCase());
  $('#p-property-name1').html(data[0].prop[0].propertyName.toProperCase());
  $('#p-property-value1').html(data[0].prop[0].propertyValue);
  $('#p-property-name2').html(data[0].prop[1].propertyName.toProperCase());
  $('#p-property-value2').html(data[0].prop[1].propertyValue);
}


function showPartners2(data) {
  $('#p-id2').html(data[1].id).hide();
  $('#p-img2').attr('src', data[1].image);
  $('#p-name2').html(data[1].username.toProperCase());
  $('#p-age2').html(data[1].age);
  $('#p-gender2').html(data[1].gender.toProperCase());
  $('#p-location2').html(data[1].location.toProperCase());
  $('#p-activity2').html(data[1].userActivity.toProperCase());
  $('#p-property-name3').html(data[1].prop[0].propertyName.toProperCase());
  $('#p-property-value3').html(data[1].prop[0].propertyValue);
  $('#p-property-name4').html(data[1].prop[1].propertyName.toProperCase());
  $('#p-property-value4').html(data[1].prop[1].propertyValue);
}


function showPartners3(data) {
  $('#p-id3').html(data[2].id).hide();
  $('#p-img3').attr('src', data[2].image);
  $('#p-name3').html(data[2].username.toProperCase());
  $('#p-age3').html(data[2].age);
  $('#p-gender3').html(data[2].gender.toProperCase());
  $('#p-location3').html(data[2].location.toProperCase());
  $('#p-activity3').html(data[2].userActivity.toProperCase());
  $('#p-property-name5').html(data[2].prop[0].propertyName.toProperCase());
  $('#p-property-value5').html(data[2].prop[0].propertyValue);
  $('#p-property-name6').html(data[2].prop[1].propertyName.toProperCase());
  $('#p-property-value6').html(data[2].prop[1].propertyValue);
}


$('input[type="radio"]#running').on('click', function() {
  $('#biking-prop').hide();
  $('#swimming-prop').hide();
  $('#golf-prop1').hide();
  $('#golf-prop2').hide();
  $('#skiing-prop1').hide();
  $('#skiing-prop2').hide();
  $('#snowboarding-prop1').hide();
  $('#snowboarding-prop2').hide();
  $('#running-prop').show();
});
$('input[type="radio"]#biking').on('click', function() {
  $('#running-prop').hide();
  $('#swimming-prop').hide();
  $('#golf-prop1').hide();
  $('#golf-prop2').hide();
  $('#skiing-prop1').hide();
  $('#skiing-prop2').hide();
  $('#snowboarding-prop1').hide();
  $('#snowboarding-prop2').hide();
  $('#biking-prop').show();
});
$('input[type="radio"]#swimming').on('click', function() {
  $('#running-prop').hide();
  $('#biking-prop').hide();
  $('#golf-prop1').hide();
  $('#golf-prop2').hide();
  $('#skiing-prop1').hide();
  $('#skiing-prop2').hide();
  $('#snowboarding-prop1').hide();
  $('#snowboarding-prop2').hide();
  $('#swimming-prop').show();
});
$('input[type="radio"]#golfing').on('click', function() {
  $('#running-prop').hide();
  $('#biking-prop').hide();
  $('#swimming-prop').hide();
  $('#skiing-prop1').hide();
  $('#skiing-prop2').hide();
  $('#snowboarding-prop1').hide();
  $('#snowboarding-prop2').hide();
  $('#golf-prop1').show();
  $('#golf-prop2').show();
});
$('input[type="radio"]#skiing').on('click', function() {
  $('#running-prop').hide();
  $('#biking-prop').hide();
  $('#swimming-prop').hide();
  $('#golf-prop1').hide();
  $('#golf-prop2').hide();
  $('#snowboarding-prop1').hide();
  $('#snowboarding-prop2').hide();
  $('#skiing-prop1').show();
  $('#skiing-prop2').show();
});
$('input[type="radio"]#snowboarding').on('click', function() {
  $('#running-prop').hide();
  $('#biking-prop').hide();
  $('#swimming-prop').hide();
  $('#golf-prop1').hide();
  $('#golf-prop2').hide();
  $('#skiing-prop1').hide();
  $('#skiing-prop2').hide();
  $('#snowboarding-prop1').show();
  $('#snowboarding-prop2').show();
});

String.prototype.toProperCase = function() {
  return this.toLowerCase().replace( /\b((m)(a?c))?(\w)/g, function($1, $2, $3, $4, $5) { 
    if($2) {
      return $3.toUpperCase()+$4+$5.toUpperCase();
    } return $1.toUpperCase(); 
  });
};
