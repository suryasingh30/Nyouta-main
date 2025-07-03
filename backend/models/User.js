import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  clientId: {
    type: String,
  },
  avatar: {
    type: String,
    default: "https://www.gravatar.com/avatar/"
  },
  gender:{
    type: String,
    enum: ['Male', 'Female', 'Other', 'Prefer not to say'],
    default: 'Prefer not to say',
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String, // Store OTP as a string
    required: false,
  },
  otpGeneratedAt: {
    type: Date, // Store the time when OTP was generated
    required: false,
  },
  weddingWebsite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WeddingWebsite',
    required: false,
  },
  templateId: {
    type: String,
    required: false,
  },
  slug: {
    type: String,
    required: false,
    unique: false,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: false,
  },
  address: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: false,
  }],
  isWebsiteCreated: {
    type: Boolean,
    default: false,
  },
  websitePassword:{
    type:String,
    required:false
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.index({ slug: 1 }, { unique: true, partialFilterExpression: { slug: { $type: "string" } } });

// Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare input password with hashed password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
