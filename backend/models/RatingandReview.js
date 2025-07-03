const mongoose = require('mongoose');

const ratingAndReviewSchema = new mongoose.Schema({
  review: {
    type: String,
    trim: true,
    required: true,
    
  },
  rating: {
    type: Number,
    min: [1, 'Please give a rating between 1 and 5'],
    max: [5, 'Please give a rating between 1 and 5'],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    index: true,
  },
  // Additional fields for better product reviews
  verified: {
    type: Boolean,
    default: false, // Can be set to true if user purchased the product
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true // Automatically manages createdAt and updatedAt
});


module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);