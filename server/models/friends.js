'use strict';
module.exports = function(sequelize, DataTypes) {
  var friends = sequelize.define('friends', {
    status: {
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
    // }
  }, {
    classMethods: {
      associate: function(models) {
        friends.belongsTo(models.userInfo);
      }
    }
  });
  return friends;
};