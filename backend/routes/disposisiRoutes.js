import express from "express";
import {
    getDisposisi,
    getDisposisiById,
    createDisposisi,
    updateDisposisi,
    deleteDisposisi,
    countDisposisi,
    getDisposisiPagination
} from "../controllers/disposisiController.js"; // Adjust the path as necessary

const router = express.Router();

router.get('/disposisi', getDisposisi);
router.get('/disposisiPagination', getDisposisiPagination);
router.get('/disposisi/:id', getDisposisiById);
router.get('/count/disposisi', countDisposisi);
router.post('/disposisi', createDisposisi);
router.patch('/disposisi/:id', updateDisposisi);
router.delete('/disposisi/:id', deleteDisposisi);

export default router;
