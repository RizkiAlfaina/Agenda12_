import express from "express";
import {
    getAgendas,
    getAgendaById,
    createAgenda,
    updateAgenda,
    deleteAgenda
} from "../controllers/agendaController.js"; // Adjust the path as necessary

const router = express.Router();

router.get('/agendas', getAgendas);
router.get('/agendas/:id', getAgendaById);
router.post('/agendas', createAgenda);
router.patch('/agendas/:id', updateAgenda);
router.delete('/agendas/:id', deleteAgenda);

export default router;
