import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Agenda from "./Agenda.js"; // Import the Agenda model
import Disposisi from "./Disposisi.js"; // Import the Disposisi model

const { DataTypes } = Sequelize;

const AgendaDisposisi = db.define('agendaDisposisi', {
    agendaId: {
        type: DataTypes.INTEGER,
        references: {
            model: Agenda,
            key: 'id'
        }
    },
    disposisiId: {
        type: DataTypes.INTEGER,
        references: {
            model: Disposisi,
            key: 'id'
        }
    }
}, {
    freezeTableName: true
});

// Define the many-to-many relationships
Agenda.belongsToMany(Disposisi, { through: AgendaDisposisi, foreignKey: 'agendaId' });
Disposisi.belongsToMany(Agenda, { through: AgendaDisposisi, foreignKey: 'disposisiId' });

export default AgendaDisposisi;

(async () => {
    await db.sync();
})();
