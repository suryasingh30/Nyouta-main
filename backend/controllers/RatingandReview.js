import mongoose from "mongoose";
import Product from "../models/Product.js";
import RatingAndReview from "../models/RatingandReview.js";

// Create Rating and Review for Product
exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating, review, productId } = req.body;

    // Check if user has purchased the product (adjust logic as needed)
    const productDetails = await Product.findOne({
      _id: productId,
      buyers: { $elemMatch: { $eq: userId } }, 
    });

    if (!productDetails) {
      return res.status(404).json({
        success: false,
        message: "User has not purchased this product",
      });
    }

    // Check if already reviewed
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      product: productId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Product is already reviewed by the user",
      });
    }

    // Create rating and review
    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      product: productId,
      user: userId,
    });

    // Update product with this rating/review
    await Product.findByIdAndUpdate(
      { _id: productId },
      {
        $push: {
          ratingAndReviews: ratingReview._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Rating and Review created Successfully",
      ratingReview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Average Rating for Product
exports.getAverageRating = async (req, res) => {
  try {
    const productId = req.body.productId;

    const result = await RatingAndReview.aggregate([
      {
        $match: {
          product: mongoose.Types.ObjectId(productId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    return res.status(200).json({
      success: true,
      message: "No ratings given till now",
      averageRating: 0,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Ratings and Reviews for Products
exports.getAllRating = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "product",
        select: "productName",
      })
      .exec();
    return res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      data: allReviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};