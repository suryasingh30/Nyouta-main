import Product from "../models/Product.js";

import cloudinary from '../utils/cloudinary.js'; // adjust the path as needed
import getDatauri from "../utils/datauri.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.json({ products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllProductsCategoryWise = async (req, res) => {
    try {
        const { cat } = req.query;
        console.log("Received category:", cat);
        const products = await Product.find({ subSubCategory: cat });
        return res.json({ products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        return res.json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const {
            id,
            name,
            sku,
            price,
            marketPrice,
            tags,
            category,
            type,
            description,
            size,
            color,
            subCategory,
            subSubCategory
        } = req.body;

        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({ success: false, message: 'No images provided' });
        }

        // Upload all images to Cloudinary
        const imageUploadPromises = files.map(async (file) => {
            const fileContent = getDatauri(file); // Convert to data URI
            const uploadResult = await cloudinary.uploader.upload(fileContent, {
                folder: 'products', // optional folder
            });
            return uploadResult.secure_url; // Get the image URL
        });

        const imageUrls = await Promise.all(imageUploadPromises);

        const product = new Product({
            id,
            name,
            sku,
            image: imageUrls, // Save URLs in image array
            price,
            marketPrice,
            tags: tags ? tags.split(',') : [], // Optional: ensure array if sending as comma-separated
            category,
            type,
            description,
            size,
            color,
            subCategory,
            subSubCategory,
            buyers: [],
            productReview: []
        });

        await product.save();

        res.status(201).json({
            success: true,
            message: 'Product has been created',
            product
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            sku,
            existingImages, // This will contain the existing images to keep
            price,
            marketPrice,
            tags,
            category,
            type,
            description,
            size,
            color,
            subCategory,
            subSubCategory
        } = req.body;

        const files = req.files;

        // Parse existingImages if it's a string
        const existingImagesArray = typeof existingImages === 'string'
            ? JSON.parse(existingImages)
            : existingImages || [];

        // Upload new images if provided
        let newImageUrls = [];
        if (files && files.length > 0) {
            const uploadPromises = files.map(async (file) => {
                const fileContent = getDatauri(file);
                const uploadResult = await cloudinary.uploader.upload(fileContent, {
                    folder: 'products',
                });
                return uploadResult.secure_url;
            });
            newImageUrls = await Promise.all(uploadPromises);
        }

        // Combine existing and new images
        const updatedImages = [...existingImagesArray, ...newImageUrls];

        const updatedData = {
            name,
            sku,
            image: updatedImages,
            price,
            marketPrice,
            tags: Array.isArray(tags) ? tags : JSON.parse(tags || '[]'),
            category,
            type,
            description,
            size,
            color,
            subCategory,
            subSubCategory
        };

        const product = await Product.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.json({
            success: true,
            message: 'Updated Successfully',
            product
        });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Extract public_ids from image URLs
        const imageDeletionPromises = product.image.map((url) => {
            const publicId = extractPublicIdFromUrl(url);
            return cloudinary.uploader.destroy(publicId);
        });

        await Promise.all(imageDeletionPromises);

        await Product.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: 'Product has been deleted'
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Place this helper outside or in a utils file
const extractPublicIdFromUrl = (url) => {
    try {
        const parts = url.split('/');
        const fileName = parts.pop();
        parts.pop();
        const publicId = parts.slice(parts.indexOf('upload') + 1).join('/') + '/' + fileName.split('.')[0];
        return publicId;
    } catch (err) {
        return null;
    }
};