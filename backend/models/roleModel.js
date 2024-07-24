import { DataTypes } from 'sequelize';

export default (sequelize, Sequelize) => {
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  }, {
    freezeTableName: true,
  });

  return Role;
};
