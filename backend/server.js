import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';  // Ensure to include the .js extension if it's an ES module
import authRoutes from './routes/authRoutes.js';  // Same as above
import productRoutes from './routes/productRoutes.js'; 
import templateRoutes from './routes/templateRoutes.js'; 
import weddingwebsiteRoutes from './routes/weddingwebsiteRoutes.js'; 
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import morgan from 'morgan'
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path from 'path';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load environment variables
dotenv.config();

// Initialize app
const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use(morgan("tiny"));
// Middleware

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://localhost:5173'
].filter(Boolean);

const corsOption = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed from this origin: ' + origin));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
  res.json({ success: true, message: "Pong!" });
});
 // Enable preflight for all routes

// Connect to the database
connectDB();

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/templates', templateRoutes);
app.use('/api/v1/weddingwebsite', weddingwebsiteRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/address', addressRoutes);
// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

// Test route
app.get('/', (req, res) => {
    res.send('API is working correctly.');
});
