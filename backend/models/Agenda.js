import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Agenda = db.define('agendas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tanggal: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    time: {
        type: DataTypes.TIME,
        allowNull: true
    },
    agenda: {
        type: DataTypes.STRING,
        allowNull: false
    },
    UPS: {
        type: DataTypes.STRING,
        allowNull: false
    },
    loc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});

export default Agenda;

(async () => {
    await db.sync();
})();
