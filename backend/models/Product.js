import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  sku: { type: String, required: true },
  image: { type: [String], required: true },
  price: { type: Number, required: true },
  marketPrice: { type: Number },
  tags: { type: [String], required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String},
  size: { type: String, required: true },
  color: { type: String, required: true },
  subCategory: { type: String, required: true },
  subSubCategory: { type: String, required: true },
  buyers: [{type: mongoose.Types.ObjectId, ref: 'User'}],


  // Product Reviews
  productReview: [{
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now }
  }],


  // Auto timestamps

  
}, { timestamps: true });

export default mongoose.model('Product', ProductSchema);
