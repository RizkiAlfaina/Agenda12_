import express from "express";
import {
    getAgendas,
    getAgendaById,
    createAgenda,
    updateAgenda,
    deleteAgenda,
    countAgendas // Import the new function
} from "../controllers/agendaController.js"; // Adjust the path as necessary

const router = express.Router();

router.get('/agendas', getAgendas);
router.get('/agendas/:id', getAgendaById);
router.post('/agendas', createAgenda);
router.patch('/agendas/:id', updateAgenda);
router.delete('/agendas/:id', deleteAgenda);
router.get('/count', countAgendas); // Add the new route

export default router;
