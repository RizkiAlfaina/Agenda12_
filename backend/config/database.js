import {Sequelize} from "sequelize";

const db = new Sequelize('crud_db2','root','',{
    host:'localhost',
    dialect: 'mysql'
});

export default db;