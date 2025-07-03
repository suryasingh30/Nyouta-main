import express from 'express';
const router = express.Router();
import { getAllTemplates, getTemplateById } from '../controllers/templateController.js';

/* template routes */
router.get('/getAllTemplates', getAllTemplates);
router.get('/getTemplateById/:id', getTemplateById);

export default router; 