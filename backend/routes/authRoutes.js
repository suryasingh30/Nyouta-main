// server/routes/authRoutes.js

import express from 'express';
const router = express.Router();

import {
  register,
  googleSignup,
  login,
  verifyEmail,
  getAllUsers,
  getUser
} from '../controllers/authController.js';

import { authenticateToken } from '../middlewares/authMiddleware.js';

// Public routes
router.post('/register', register);
router.post('/google-signup', googleSignup);
router.post('/login', login);
router.post('/verify-email', verifyEmail);

// Protected routes
router.get('/getAllUsers', authenticateToken, getAllUsers);
router.get('/getUser/:id', authenticateToken, getUser);

export default router;
