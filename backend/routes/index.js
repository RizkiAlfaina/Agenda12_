import express from "express";
import agendaRoutes from "./agendaRoutes.js"; // Adjust the path as necessary
import disposisiRoutes from "./disposisiRoutes.js"; // Adjust the path as necessary

const router = express.Router();

router.use(agendaRoutes);
router.use(disposisiRoutes);

export default router;
