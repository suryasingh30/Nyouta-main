import Order from '../models/Order.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Cart from '../models/Cart.js';
import nodemailer from 'nodemailer';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const formatAddress = (address) => {
    return `${address.firstName} ${address.lastName}
${address.streetName}
${address.apartment ? address.apartment + '\n' : ''}${address.city}, ${address.state} - ${address.pincode}
Contact: ${address.contactNo}
Email: ${address.email}`;
};

const generateOrderEmail = async (order, address) => {
    const productsList = order.products.map(item => {
        let productDetails = `- ${item.product.name} (Quantity: ${item.quantity}, Price: ₹${item.price})`;
        if (item.customText) {
            productDetails += `\n  Custom Text: "${item.customText}"`;
        }
        if (item.images && item.images.length > 0) {
            productDetails += `\n  Custom Images:`;
            item.images.forEach((image, index) => {
                productDetails += `\n    ${index + 1}. ${image}`;
            });
        }
        return productDetails;
    }).join('\n');

    return {
        from: process.env.EMAIL_USER,
        to: 'info@nyouta.com',
        subject: `New Paid Order - Order ID: ${order.orderId}`,
        html: `
            <h2>New Order Details</h2>
            <p><strong>Order ID:</strong> ${order.orderId}</p>
            <p><strong>Payment ID:</strong> ${order.paymentId}</p>
            <p><strong>Total Amount:</strong> ₹${order.totalPrice}</p>
            
            <h3>Products Ordered:</h3>
            <pre>${productsList}</pre>
            
            <h3>Delivery Address:</h3>
            <pre>${formatAddress(address)}</pre>
            
            <p><strong>Order Status:</strong> ${order.status}</p>
            <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
            
            <p>This order has been paid successfully and is ready for processing.</p>
            
            <p>Best regards,<br>Nyouta Order System</p>
        `
    };
};

export const placeOrder = async (req, res) => {
    try {
        const { products, totalPrice, address } = req.body;
        const order = new Order({ user: req.user.userId, products, totalPrice, address });
        await order.save();
        const options = {
            amount: totalPrice * 100,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };
        razorpay.orders.create(options, async (error, payment) => {
            if (error) {
                console.error("Error creating order:", error);
                return res.status(500).send({ message: "Something went wrong" });
            }
            // console.log("Payment:", payment);
            order.orderId = payment.id;
            await order.save();
            res.status(201).json({
                message: 'Order created successfully! Complete payment to confirm.',
                payment,
                order,
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex');

        if (razorpay_signature === expectedSignature) {
            const order = await Order.findOne({ orderId: razorpay_order_id });
            order.paymentStatus = 'paid';
            order.paymentId = razorpay_payment_id;
            await order.save();

            // Clear the cart
            const cart = await Cart.findOne({ user: order.user });
            cart.products = [];
            cart.totalPrice = 0;
            await cart.save();

            // Populate necessary data for email
            await order.populate([
                { path: 'products.product' },
                { path: 'address' }
            ]);

            // Send email notification
            const emailOptions = await generateOrderEmail(order, order.address);
            transporter.sendMail(emailOptions, (err, info) => {
                if (err) {
                    console.error('Error sending email:', err);
                } else {
                    console.log('Order confirmation email sent successfully');
                }
            });

            res.status(200).json({ message: 'Payment verified successfully!', order });
        } else {
            res.status(400).json({ message: 'Payment verification failed!' });
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
        res.status(200).json({ message: 'Order updated successfully!', order });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.orderId);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};