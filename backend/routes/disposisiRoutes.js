import express from "express";
import {
    getDisposisi,
    getDisposisiById,
    createDisposisi,
    updateDisposisi,
    deleteDisposisi,
    countDisposisi
} from "../controllers/disposisiController.js"; // Adjust the path as necessary

const router = express.Router();

router.get('/disposisi', getDisposisi);
router.get('/disposisi/:id', getDisposisiById);
router.get('/count/disposisi', countDisposisi);
router.post('/disposisi', createDisposisi);
router.patch('/disposisi/:id', updateDisposisi);
router.delete('/disposisi/:id', deleteDisposisi);

export default router;
