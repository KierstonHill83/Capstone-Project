'use strict';
module.exports = function(sequelize, DataTypes) {
  var userChatRooms = sequelize.define('userChatRooms', {
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
    // userInfoId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "userInfo",
    //     key: "id"
    //   }
    // }
  }, {
    classMethods: {
      associate: function(models) {
        userChatRooms.belongsTo(models.userInfo);
      }
    }
  });
  return userChatRooms;
};