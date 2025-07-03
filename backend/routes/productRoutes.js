import express from 'express';
import Product from '../models/Product.js';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getAllProductsCategoryWise } from '../controllers/productController.js';
import cloudUplaod from '../middlewares/cloudinaryUpload.js';
const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/category', getAllProductsCategoryWise);
router.get('/products/:id', getProductById);
router.post('/create', cloudUplaod.array('images'), createProduct);
router.put('/update/:id', cloudUplaod.array('images'), updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
