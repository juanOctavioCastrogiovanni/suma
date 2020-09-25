'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('numeros', {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
      },
      numero: {
          type: Sequelize.INTEGER,
          allowNull: false
      }
  });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('numeros');
  }
};
