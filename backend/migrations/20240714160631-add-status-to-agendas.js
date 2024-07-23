import { Sequelize, DataTypes } from 'sequelize';
import db from '../config/database.js';

const migration = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('agendas', 'status', {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Rapat Mendatang'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('agendas', 'status');
  }
};

export default migration;
