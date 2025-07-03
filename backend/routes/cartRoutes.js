import express from 'express';
import {authenticateToken} from '../middlewares/authMiddleware.js';
import { addToCart, getCart, removeFromCart, updateCart } from '../controllers/cartController.js';
const router = express.Router();

router.post('/add-to-cart', authenticateToken, addToCart);
router.get('/get-cart', authenticateToken, getCart);
router.delete('/remove-from-cart/:productId', authenticateToken, removeFromCart);
router.put('/update-quantity', authenticateToken, updateCart);
export default router;