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
    const { search = '', page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { rows, count } = await Agenda.findAndCountAll({
      where: {
        [Op.or]: [
          { time: { [Op.like]: `%${search}%` } },
          { tanggal: { [Op.like]: `%${search}%` } },
          { agenda: { [Op.like]: `%${search}%` } },
          { UPS: { [Op.like]: `%${search}%` } },
          { loc: { [Op.like]: `%${search}%` } },
          { status: { [Op.like]: `%${search}%` } }
        ]
      },
      order: [['tanggal', 'ASC'], ['time', 'ASC']],
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
    const response = await Agenda.destroy({
      where: { id: req.params.id }
    });
    if (response === 0) {
      return res.status(404).json({ message: "Agenda not found" });
    }
    res.status(200).json({ message: "Agenda Deleted" });
  } catch (error) {
    console.error(`Error deleting agenda with ID ${req.params.id}:`, error.message);
    res.status (500).json({ message: "Internal Server Error" });
  }
};
