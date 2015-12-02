var express = require('express');
var router = express.Router();
var models = require('../models/index');


// GET all matching partners
// router.get('/partners', function(req, res, next) {
//   models.userInfo.findAll({
//     include: [
//       {
//         model: userActivity,
//         include: [
//           activityProperty
//         ]
//       }
//     ]
//   }).then(function(userInfo) {
//     res.json(userInfo);
//   }).catch(function(err) {
//     res.json(err);
//     console.log(err);
//   });
// });


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