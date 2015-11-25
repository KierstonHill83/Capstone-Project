'use strict';
module.exports = function(sequelize, DataTypes) {
  var userActivity = sequelize.define('userActivity', {
    userActivity: {
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
  return userActivity;
};