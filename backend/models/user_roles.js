import { DataTypes } from 'sequelize';
import User from './user.model.js';
import Role from './roleModel.js';

export default (sequelize, Sequelize) => {
  const UserRole = sequelize.define('UserRole', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: Role,
        key: 'id'
      }
    }
  }, {
    freezeTableName: true,
  });

  return UserRole;
};
