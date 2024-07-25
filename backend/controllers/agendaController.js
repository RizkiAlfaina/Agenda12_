import { Sequelize, Op } from "sequelize";
import Agenda from "../models/Agenda.js";
import Disposisi from "../models/Disposisi.js";
import AgendaDisposisi from "../models/agendaDisposisi.js";

// Utility function to format dates to ISO format
const formatDateToISO = (date) => {
  if (!date) return null;
  const formattedDate = new Date(date);
  return formattedDate.toISOString().split('T')[0];
};

// Utility function to get day of the week as a number (0-6)
const getDayOfWeekNumber = (dayName) => {
  const days = {
    Minggu: 0,
    Senin: 1,
    Selasa: 2,
    Rabu: 3,
    Kamis: 4,
    Jumat: 5,
    Sabtu: 6,
  };
  return days[dayName];
};

// Create new agenda with multiple disposisiIds
export const createAgenda = async (req, res) => {
  try {
    const { tanggal, time, agenda, UPS, loc, status, disposisiIds, estimatedTime } = req.body;

    // Create a new agenda
    const newAgenda = await Agenda.create({ tanggal, time, agenda, UPS, loc, status, estimatedTime });

    // Link the agenda with multiple disposisiIds
    if (disposisiIds && disposisiIds.length > 0) {
      await newAgenda.setDisposisis(disposisiIds);
    }

    res.status(201).json({ message: "Agenda Created" });
  } catch (error) {
    console.error('Error creating agenda:', error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all agendas with search and pagination
export const getAgendas = async (req, res) => {
  try {
    const { search = '', page = 1, limit = 10, sortColumn = 'tanggal', sortDirection = 'asc', dayFilter = '' } = req.query;
    const offset = (page - 1) * limit;

    let dayCondition = {};
    if (dayFilter) {
      const dayNumber = getDayOfWeekNumber(dayFilter);
      dayCondition = Sequelize.where(Sequelize.fn('DAYOFWEEK', Sequelize.col('tanggal')), dayNumber + 1);
    }

    const { rows, count } = await Agenda.findAndCountAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { time: { [Op.like]: `%${search}%` } },
              { tanggal: { [Op.like]: `%${search}%` } },
              { agenda: { [Op.like]: `%${search}%` } },
              { UPS: { [Op.like]: `%${search}%` } },
              { loc: { [Op.like]: `%${search}%` } },
              { status: { [Op.like]: `%${search}%` } },
            ]
          },
          dayCondition
        ]
      },
      order: [
        [sortColumn, sortDirection],
        ['time', sortDirection]
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: Disposisi,
          attributes: ['id', 'jabatan'],
          through: { attributes: [] },
          where: {
            jabatan: { [Op.like]: `%${search}%` }
          },
          required: false
        }
      ]
    });

    const formattedAgendas = rows.map(agenda => ({
      ...agenda.dataValues,
      tanggal: formatDateToISO(agenda.tanggal),
      disposisis: agenda.disposisis // Include the disposisi data
    }));

    res.status(200).json({
      data: formattedAgendas,
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / limit),
      totalItems: count
    });
  } catch (error) {
    console.error('Error fetching agendas:', error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get an agenda by ID
export const getAgendaById = async (req, res) => {
  try {
    console.log(`Fetching agenda with ID: ${req.params.id}`); // Debug log
    const agenda = await Agenda.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Disposisi,
          attributes: ['id', 'jabatan'],
          through: { attributes: [] } // Exclude join table attributes
        }
      ]
    });
    if (!agenda) {
      console.error(`Agenda with ID ${req.params.id} not found`); // Debug log
      return res.status(404).json({ message: "Agenda not found" });
    }
    const formattedAgenda = {
      ...agenda.dataValues,
      tanggal: formatDateToISO(agenda.tanggal),
      disposisis: agenda.disposisis // Include the disposisi data
    };
    res.status(200).json(formattedAgenda);
  } catch (error) {
    console.error(`Error fetching agenda with ID ${req.params.id}:`, error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update an agenda by ID
export const updateAgenda = async (req, res) => {
  const { id } = req.params;
  const { tanggal, time, agenda, UPS, loc, status, disposisiIds, estimatedTime } = req.body;

  try {
    // Validate disposisiIds if provided
    if (disposisiIds && disposisiIds.length > 0) {
      for (const disposisiId of disposisiIds) {
        const disposisi = await Disposisi.findByPk(disposisiId);
        if (!disposisi) {
          return res.status(400).json({ message: `Disposisi with ID ${disposisiId} not found` });
        }
      }
    }

    // Update agenda details
    await Agenda.update({ tanggal, time, agenda, UPS, loc, status, estimatedTime }, { where: { id } });

    // Handle disposisi association
    const agendaInstance = await Agenda.findByPk(id);
    if (agendaInstance && disposisiIds) {
      // Clear existing associations and add new ones in a single step
      await agendaInstance.setDisposisis(disposisiIds);
    }

    // Fetch the updated agenda including disposisi data
    const updatedAgenda = await Agenda.findByPk(id, {
      include: [
        {
          model: Disposisi,
          attributes: ['id', 'jabatan'],
          through: { attributes: [] } // Exclude join table attributes
        }
      ]
    });

    res.status(200).json(updatedAgenda);
  } catch (error) {
    console.error(`Error updating agenda with ID ${id}:`, error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete an agenda by ID
export const deleteAgenda = async (req, res) => {
  try {
    console.log(`Deleting agenda with ID: ${req.params.id}`); // Debug log
    const response = await Agenda.destroy({
      where: { id: req.params.id }
    });
    if (response === 0) {
      console.error(`Agenda with ID ${req.params.id} not found`); // Debug log
      return res.status(404).json({ message: "Agenda not found" });
    }
    res.status(200).json({ message: "Agenda Deleted" });
  } catch (error) {
    console.error(`Error deleting agenda with ID ${req.params.id}:`, error.message);
    res.status (500).json({ message: "Internal Server Error" });
  }
};

// Count total agendas
export const countAgendas = async (req, res) => {
  try {
    console.log('Counting total agendas'); // Debug log
    const count = await Agenda.count();
    res.status(200).json({ totalAgendas: count });
  } catch (error) {
    console.error('Error counting agendas:', error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
