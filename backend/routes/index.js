import express from "express";
import agendaRoutes from "./agendaRoutes.js"; // Adjust the path as necessary
import disposisiRoutes from "./disposisiRoutes.js"; // Adjust the path as necessary
import authRoutes from "./auth.routes.js"
import userRoutes from "./user.routes.js"

const router = express.Router();

router.use(agendaRoutes);
router.use(disposisiRoutes);
router.use(authRoutes);
router.use(userRoutes);

export default router;
