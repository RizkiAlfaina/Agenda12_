import Disposisi from "../models/Disposisi.js";
import { Op } from "sequelize";

// Utility function to format dates to ISO format
const formatDateToISO = (date) => {
  if (!date) return null;
  const formattedDate = new Date(date);
  return formattedDate.toISOString().split('T')[0];
};

// Get all disposisi with search and pagination
export const getDisposisi = async (req, res) => {
  try {
    const { search = '', page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { rows, count } = await Disposisi.findAndCountAll({
      where: {
        [Op.or]: [
          { jabatan: { [Op.like]: `%${search}%` } }
        ]
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      data: rows,
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / limit),
      totalItems: count,
    });
  } catch (error) {
    console.error('Error fetching disposisi:', error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get disposisi by ID
export const getDisposisiById = async (req, res) => {
  try {
    const disposisi = await Disposisi.findOne({
      where: { id: req.params.id }
    });
    if (!disposisi) {
      return res.status(404).json({ message: "Disposisi not found" });
    }
    res.status(200).json(disposisi);
  } catch (error) {
    console.error(`Error fetching disposisi with ID ${req.params.id}:`, error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create new disposisi
export const createDisposisi = async (req, res) => {
  try {
    await Disposisi.create(req.body);
    res.status(201).json({ message: "Disposisi Created" });
  } catch (error) {
    console.error('Error creating disposisi:', error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update disposisi
export const updateDisposisi = async (req, res) => {
  try {
    const response = await Disposisi.update(req.body, {
      where: { id: req.params.id }
    });
    if (response[0] === 0) {
      return res.status(404).json({ message: "Disposisi not found" });
    }
    res.status(200).json({ message: "Disposisi Updated" });
  } catch (error) {
    console.error(`Error updating disposisi with ID ${req.params.id}:`, error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete disposisi
export const deleteDisposisi = async (req, res) => {
  try {
    const response = await Disposisi.destroy({
      where: { id: req.params.id }
    });
    if (response === 0) {
      return res.status(404).json({ message: "Disposisi not found" });
    }
    res.status(200).json({ message: "Disposisi Deleted" });
  } catch (error) {
    console.error(`Error deleting disposisi with ID ${req.params.id}:`, error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Count total disposisi
export const countDisposisi = async (req, res) => {
  try {
    console.log('Counting total Disposisi'); // Debug log
    const count = await Disposisi.count();
    res.status(200).json({ totalDisposisi: count });
  } catch (error) {
    console.error('Error counting Disposisi:', error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
