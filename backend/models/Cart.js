import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    productId:{
     type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    },
    quantity:{
      type:Number
    },
    customText:{
      type:String
    },
    images:{
      type:[String]
    }
   }],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Cart', CartSchema);