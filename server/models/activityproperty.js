  'use strict';
module.exports = function(sequelize, DataTypes) {
  var activityProperty = sequelize.define('activityProperty', {
    propertyName: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      defaultValue: false
    },
    propertyValue: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      defaultValue: false
    }
    // userInfoId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "userInfo",
    //     key: "id"
    //   }
    // },
    // userActivityId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "userActivity",
    //     key: "id"
    //   }
    // }
  }, {
    classMethods: {
      associate: function(models) {
        activityProperty.belongsTo(models.userInfo);
        activityProperty.belongsTo(models.userActivity);
      }
    }
  });
  return activityProperty;
};