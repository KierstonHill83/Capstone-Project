'use strict';
module.exports = function(sequelize, DataTypes) {
  var friends = sequelize.define('friends', {
    status: {
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
  return friends;
};