import express from 'express';
const router = express.Router();
import {authenticateToken} from '../middlewares/authMiddleware.js';
import { getWeddingWebsite,createWeddingWebsite,updateWeddingWebsite,getWeddingWebsitePreview,updateWeddingWebsitedata,getweddingWebsitedata,verifyWeddingWebsite } from '../controllers/weddingWebsiteController.js';

/* wedding website routes */
router.get('/getWeddingWebsite/:slug', getWeddingWebsite);
router.get('/getweddingWebsitedata',authenticateToken,getweddingWebsitedata);
router.get('/getWeddingWebsite/:templateId', authenticateToken, getWeddingWebsitePreview);
router.post('/createWeddingWebsite/:templateId', authenticateToken, createWeddingWebsite);
router.put('/updateWeddingWebsite/:templateId', authenticateToken, updateWeddingWebsite);
router.put('/updateWeddingWebsitedata/:id', authenticateToken, updateWeddingWebsitedata);
router.post('/verify-wedding-website',verifyWeddingWebsite);
// router.delete('/deleteWeddingWebsite/:id', deleteWeddingWebsite);

export default router;