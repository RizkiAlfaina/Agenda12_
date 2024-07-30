import { DataTypes } from 'sequelize';

export default (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    image: {
      type: DataTypes.STRING,

    },
    url: {
      type: DataTypes.STRING,
    }
    
  }, {
    freezeTableName: true,
  });

  return User;
};
