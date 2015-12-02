'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'userActivities',
      'userActivityId', {
        type: Sequelize.INTEGER
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('userActivities', 'userActivityId');
  }
};
