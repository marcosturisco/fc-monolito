'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      purchasePrice: {
        type: Sequelize.FLOAT,
        allowNull: true, // ProductAdm
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: true, // ProductAdm
      },
      salesPrice: {
        type: Sequelize.FLOAT,
        allowNull: true, // StoreCatalog
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  },
};