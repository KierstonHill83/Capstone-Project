'use strict';
module.exports = function(sequelize, DataTypes) {
  var userChatRoom = sequelize.define('userChatRoom', {
    name: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      defaultValue: false
    },
    conversation: {
      type: DataTypes.TEXT,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return userChatRoom;
};