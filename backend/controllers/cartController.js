import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity,customText,userUploadedImages } = req.body;
        const images=userUploadedImages;
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        let cart = await Cart.findOne({ user: userId });
        if (!cart||cart.length === 0||cart===null) {
            cart = new Cart({ user: userId, products: [], totalPrice: 0 });
        }
        else{
            const existingProduct = cart.products.find(
                (item) => item.productId.toString() === productId
            );
            if (existingProduct) {
                return res.status(400).json({ message: 'Product already added to the cart' });
            }
        }
        const q=Number(quantity);
        cart.products.push({ productId: productId, quantity:q,customText:customText,images:images });
        cart.totalPrice += product.price * quantity;
        await cart.save();
        user.cart = cart._id;
        await user.save();
        return res.json({message:"Product added to cart",cart});
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getCart = async (req, res) => {
    try {   
        const userId = req.user.userId;
        const cart = await Cart.findOne({ user: userId }).populate('products.productId');
        res.json({success:true,cart});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.userId;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const price = product.price;
        const cart = await Cart.findOne({ user: userId });
        // console.log(cart);
        const quantity=cart.products.find((item) => item.productId.toString() === productId).quantity;
        cart.products = cart.products.filter(
            (item) => item.productId.toString() !== productId
        )
        cart.totalPrice -= price*quantity;
        await cart.save();
        res.json({message:"Product removed from cart",cart});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateCart = async (req, res) => {
    try {
        const { productId, quantity , operation} = req.body;
        // console.log(productId);
        // console.log(quantity);
        const userId = req.user.userId;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // console.log(product.price);
        const cart = await Cart.findOne({ user: userId });
        const existingProduct = cart.products.find(
            (item) => item.productId.toString() === productId
        );
        if (!existingProduct) {
            return res.status(400).json({ message: 'Product not in the cart' });
        }
        existingProduct.quantity = quantity;
        if(operation===1){
            cart.totalPrice+=product.price;
        }
        else{
            cart.totalPrice-=product.price;
        }
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
