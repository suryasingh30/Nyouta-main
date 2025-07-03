import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/User.js';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields (email, password, name) are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    let existingUser = await User.findOne({ email });

    const otp = generateOTP();

    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({ message: 'User already registered. Please log in.' });
      }

      const now = Date.now();
      if (existingUser.otpGeneratedAt && now - existingUser.otpGeneratedAt < 60 * 1000) {
        return res.status(429).json({ message: 'Please wait 1 minute before requesting a new OTP.' });
      }

      existingUser.otp = otp;
      existingUser.otpGeneratedAt = now;
      await existingUser.save();

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: existingUser.email,
        subject: 'Verify Your Email Address',
        html: `
          <p>Hello ${existingUser.name},</p>
          <p>Please verify your email by entering the OTP below:</p>
          <h2>${otp}</h2>
          <p>This OTP is valid for 10 minutes.</p>
        `,
      });

      return res.status(201).json({
        message: 'OTP re-sent. Please verify your email.',
        requiresOtp: true,
      });
    }

    const newUser = new User({
      name,
      email,
      password,
      otp,
      otpGeneratedAt: Date.now(),
      isVerified: false,
    });

    await newUser.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email Address',
      html: `
        <p>Hello ${name},</p>
        <p>Thank you for registering. Please verify your email by entering the OTP below:</p>
        <h2>${otp}</h2>
        <p>This OTP is valid for 10 minutes.</p>
      `,
    });

    res.status(201).json({
      message: 'User registered successfully. Please verify your email.',
      requiresOtp: true,
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};

// Login user
export const login = async (req, res) => {
  console.log("you are here");
  try {
    const { email, password } = req.body;

    // Basic validations
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // If user is not verified, re-send OTP
    if (!user.isVerified) {
      const now = Date.now();

      // Optional: throttle OTP re-sending
      if (!user.otpGeneratedAt || now - user.otpGeneratedAt > 60 * 1000) {
        const otp = generateOTP();
        user.otp = otp;
        user.otpGeneratedAt = now;
        await user.save();

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: 'Verify Your Email Address',
          html: `
            <p>Hello ${user.name},</p>
            <p>Please verify your email by entering the OTP below:</p>
            <h2>${otp}</h2>
            <p>This OTP is valid for 10 minutes.</p>
          `,
        });
      }

      return res.status(403).json({ message: 'Email not verified. OTP sent again.', requiresOtp: true });
    }

    // Validate password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Extract user fields to return
    const { _id, name, email: userEmail, role, isWebsiteCreated, websitePassword } = user;

    res.status(200).json({
      token,
      user: {
        _id,
        name,
        email: userEmail,
        role,
        isWebsiteCreated,
        websitePassword,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};


// Verify OTP 
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required.' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: 'Email is already verified.' });
    }

    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP.' });
    }

    const otpExpirationTime = 10 * 60 * 1000; // 10 minutes
    if (!user.otpGeneratedAt || Date.now() - user.otpGeneratedAt > otpExpirationTime) {
      return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
    }

    // Mark as verified
    user.isVerified = true;
    user.otp = null;
    user.otpGeneratedAt = null;
    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return token & user data
    res.status(200).json({
      message: 'Email verified successfully.',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isWebsiteCreated: user.isWebsiteCreated,
        websitePassword: user.websitePassword,
      },
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('address');
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Google Signup
export const googleSignup = async (req, res) => {
  try {
    const response = req.body;
    const clientId = response.clientId;
    const clientCredentials = response.credential;
    const jwtDecode = jwt.decode(clientCredentials);
    // console.log(jwtDecode);
    const user = await User.findOne({ email: jwtDecode.email });
    // console.log(user);
    if (user) {
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({
        success: true,
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          role: user.role,
          isWebsiteCreated: user.isWebsiteCreated,
          websitePassword: user.websitePassword,
        },
        message: "Signed in successfully",
      });
    }

    const newUser = new User({
      email: jwtDecode.email,
      name: jwtDecode.name,
      partnerName: jwtDecode.name,
      clientId: clientId,
      isVerified: true,
      avatar: jwtDecode.picture,
    });
    // console.log(newUser)
    try {
      await newUser.save();
    } catch (error) {
      console.error("Error saving user:", error.message);
      return res.status(400).json({ success: false, message: error.message });
    }    
    // console.log("hiii");
    jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        // console.log(err);
        return res.status(500).json({
          success: false,
          message: 'Error generating token',
        });
      }
      // console.log(token);
      return res.status(201).json({
        success: true,
        token,
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          avatar: newUser.avatar,
          role: newUser.role,
          isWebsiteCreated: newUser.isWebsiteCreated,
          websitePassword: newUser.websitePassword,
        },
        message: "Signed up successfully",
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};


// Get user by ID
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { _id, name, email, role, isWebsiteCreated } = user;
    res.status(200).json({ user });
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
}