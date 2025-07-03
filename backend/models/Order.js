import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to Product
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        customText: {
          type: String
        },
        images: {
          type: [String]
        }
      },
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'completed', 'shipped', 'cancelled'] },
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    orderId: { type: String, required: false, default: null },
    paymentId: { type: String, required: false, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
);

export default mongoose.model('Order', OrderSchema);
