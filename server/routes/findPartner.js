var express = require('express');
var router = express.Router();
var models = require('../models/index');



// GET all matching partners
router.get('/partners/:age/:gender/:location/:userActivity/:activityName/:activityProperty', function(req, res, next) {
  console.log('INSIDE GET ROUTE');
  var id = req.user.id;
  var age = req.params.age;
  var gender = req.params.gender;
  var location = req.params.location;
  var userActivity = req.params.userActivity;
  var activityName = req.params.activityName;
  var activityProperty = req.params.activityProperty;
  var query = 'SELECT distinct f.username, f.age, f.gender, f.location, f.image, fa."userActivity", p2."propertyName", p2."propertyValue" FROM "userInfos" u, "userInfos" f, "userActivities" ua, "userActivities" fa, "activityProperties" p1, "activityProperties" p2 WHERE u.id = '+id+' AND u.id != f.id AND f.age between u.age - '+age+' AND u.age + '+age+' AND f.gender = '+'\''+gender+'\''+' AND f.location = '+'\''+location+'\''+' AND u.id = ua."userInfoId" AND ua."userActivity" = '+'\''+userActivity+'\''+' AND ua."userActivity" = fa."userActivity" AND ua."userInfoId" = p1."userInfoId" AND ua."userActivityId" = p1."userActivityId" AND f.id = p2."userInfoId" AND p1."userActivityId" = p2."userActivityId" AND p1."propertyName" = p2."propertyName" ;';
  models.sequelize.query(query, { type: models.sequelize.QueryTypes.SELECT}).then(function(results) {
    console.log('INSIDE THE QUERY');
    console.log('results', results);
  });
});


module.exports = router;


// models.sequelize.query(query).spread(function(results, metadata) {
//     console.log('INSIDE THE QUERY');
//     console.log('results ',results);
//     console.log('metadata ', metadata);
//     res.send(metadata);
//   });
// });


// select distinct f.username,
//        f.age,
//        f.gender,
//        f.location,
//        f.image,
//        fa."userActivity",
//        p2."propertyName",
//        p2."propertyValue"
//   from "userInfos" u,
//        "userInfos" f,
//        "userActivities" ua,
//        "userActivities" fa,
//        "activityProperties" p1,
//        "activityProperties" p2
//   where u.id = 2
//     and u.id != f.id
//     and f.age between u.age - 3 and u.age + 3
//     and f.gender = 'male'
//     and f.location = 'denver'
//     and u.id = ua."userInfoId"
//     and ua."userActivity" = 'Running'
//     and ua."userActivity" = fa."userActivity"
//     and ua."userInfoId" = p1."userInfoId"
//     and ua."userActivityId" = p1."userActivityId"
//     and f.id = p2."userInfoId"
//     and p1."userActivityId" = p2."userActivityId"
//     and p1."propertyName" = p2."propertyName"
//     ;