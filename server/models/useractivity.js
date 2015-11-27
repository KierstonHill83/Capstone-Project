'use strict';
module.exports = function(sequelize, DataTypes) {
  var userActivity = sequelize.define('userActivity', {
    userActivity: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      defaultValue: false
    }
    // userInfoId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "userInfos",
    //     key: "id"
    //   }
    // }
  }, {
    classMethods: {
      associate: function(models) {
        userActivity.belongsTo(models.userInfo);
        userActivity.hasMany(models.activityProperty);
      }
    }
  });
  return userActivity;
};