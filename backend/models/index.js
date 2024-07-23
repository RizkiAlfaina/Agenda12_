import { Sequelize } from 'sequelize';
import config from '../config/config.json' assert { type: 'json' };
import User from './user.model.js';
import Role from './roleModel.js';
import UserRole from './user_roles.js';

const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];

let sequelize;
if (envConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[envConfig.use_env_variable], envConfig);
} else {
  sequelize = new Sequelize(envConfig.database, envConfig.username, envConfig.password, {
    host: envConfig.host,
    dialect: envConfig.dialect,
    pool: envConfig.pool,
  });
}

// Initialize models and set up associations
const db = {};

db.User = User(sequelize, Sequelize);
db.Role = Role(sequelize, Sequelize);
db.UserRole = UserRole(sequelize, Sequelize);

db.User.belongsToMany(db.Role, { through: db.UserRole, foreignKey: 'userId' });
db.Role.belongsToMany(db.User, { through: db.UserRole, foreignKey: 'roleId' });

db.ROLES = ['user', 'admin', 'moderator'];

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
