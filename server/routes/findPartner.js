var express = require('express');
var router = express.Router();
var models = require('../models/index');

var query = 'SELECT distinct f.username, f.age, f.gender, f.location, f.image, fa."userActivity", p2."propertyName", p2."propertyValue" FROM "userInfos" u, "userInfos" f, "userActivities" ua, "userActivities" fa, "activityProperties" p1, "activityProperties" p2 WHERE u.id = 2 AND u.id != f.id AND f.age between u.age - 3 AND u.age + 3 AND f.gender = \'male\' AND f.location = \'denver\' AND u.id = ua."userInfoId" AND ua."userActivity" = \'Running\' AND ua."userActivity" = fa."userActivity" AND ua."userInfoId" = p1."userInfoId" AND ua."userActivityId" = p1."userActivityId" AND f.id = p2."userInfoId" AND p1."userActivityId" = p2."userActivityId" AND p1."propertyName" = p2."propertyName" ;';


// GET all matching partners
router.get('/partners', function(req, res, next) {
  models.sequelize.query(query).spread(function(results, metadata) {
    console.log(results);
    console.log(results);
    res.send(results);
  });
});



module.exports = router;





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