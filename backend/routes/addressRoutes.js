import express from 'express';
import {authenticateToken} from '../middlewares/authMiddleware.js';
import { addAddress, getAddress, updateAddress, deleteAddress } from '../controllers/addressController.js';
const router = express.Router();

router.post('/add-address',authenticateToken, addAddress);
router.get('/get-addresses',authenticateToken, getAddress);
router.put('/update-address/:addressId',authenticateToken, updateAddress);
router.delete('/delete-address/:addressId', authenticateToken,deleteAddress);

export default router;