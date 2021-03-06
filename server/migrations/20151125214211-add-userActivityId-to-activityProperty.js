'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'activityProperties',
      'userActivityId', {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('activityProperties', 'userActivityId');
  }
};
