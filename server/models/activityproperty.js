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
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return activityProperty;
};