import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { placeOrder, getOrders, getOrder, deleteOrder, updateOrderStatus,verifyPayment,getAllOrders } from '../controllers/orderController.js';

const router = express.Router();

router.post('/place-order', authenticateToken, placeOrder);
router.post('/verify-payment', authenticateToken,verifyPayment);
router.get('/get-orders', authenticateToken, getOrders);
router.get('/get-all-orders' , getAllOrders); 
router.get('/get-order/:orderId', authenticateToken, getOrder);
router.delete('/delete-order/:orderId', authenticateToken, deleteOrder);
router.put('/update-order-status/:id', authenticateToken, updateOrderStatus);

export default router;
