'use strict';
module.exports = function(sequelize, DataTypes) {
  var userInfo = sequelize.define('userInfo', {
    username: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      defaultValue: false
    },
    password: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      defaultValue: false
    },
    name: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      defaultValue: false
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      defaultValue: false
    },
    age: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: false,
      defaultValue: false
    },
    gender: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      defaultValue: false
    },
    location: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      defaultValue: false
    },
    image: {
      type: DataTypes.BLOB,
    }
  }, {
    classMethods: {
      associate: function(models) {
        userInfo.hasMany(models.userActivity);
        userInfo.hasMany(models.activityProperty);
        userInfo.hasMany(models.userChatRooms);
        userInfo.hasMany(models.friends);
      }
    }
  });
  return userInfo;
};