import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/User.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: process.env.BREVO_EMAIL,
    pass: process.env.BREVO_SMTP_KEY,
  },
});
console.log(process.env.BREVO_EMAIL);

// Verify connection on startup
transporter.verify((error) => {
  if (error) {
    console.error('Brevo SMTP Connection Failed:', error);
  } else {
    console.log('Brevo SMTP is ready');
  }
});

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Improved email sending function
const sendVerificationEmail = async (email, name, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"Nyouta App" <${process.env.BREVO_EMAIL}>`,
      to: email,
      subject: 'Verify Your Email',
      html: `<p>Your OTP: <strong>${otp}</strong></p>`,
    });
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Brevo Email Error:', error.response || error);
    return false;
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validations
    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    let existingUser = await User.findOne({ email });
    const otp = generateOTP();

    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({ message: 'User already exists. Please login.' });
      }

      const now = Date.now();
      if (existingUser.otpGeneratedAt && now - existingUser.otpGeneratedAt < 60000) {
        return res.status(429).json({ message: 'Please wait 1 minute before new OTP' });
      }

      existingUser.otp = otp;
      existingUser.otpGeneratedAt = now;
      await existingUser.save();

      await sendVerificationEmail(email, name, otp);

      return res.status(200).json({ 
        message: 'OTP re-sent',
        requiresOtp: true 
      });
    }

    const newUser = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      otp,
      otpGeneratedAt: Date.now(),
      isVerified: false,
    });

    await newUser.save();
    await sendVerificationEmail(email, name, otp);

    res.status(201).json({
      message: 'Registration successful. Verify your email.',
      requiresOtp: true,
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      const now = Date.now();
      if (!user.otpGeneratedAt || now - user.otpGeneratedAt > 60000) {
        const otp = generateOTP();
        user.otp = otp;
        user.otpGeneratedAt = now;
        await user.save();
        await sendVerificationEmail(email, user.name, otp);
      }
      return res.status(403).json({ 
        message: 'Email not verified. OTP sent again.', 
        requiresOtp: true 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Omit sensitive data from response
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isWebsiteCreated: user.isWebsiteCreated
    };

    res.status(200).json({ token, user: userResponse });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};

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

    const otpExpirationTime = 10 * 60 * 1000;
    if (!user.otpGeneratedAt || Date.now() - user.otpGeneratedAt > otpExpirationTime) {
      return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpGeneratedAt = null;
    await user.save();

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isWebsiteCreated: user.isWebsiteCreated
    };

    res.status(200).json({
      message: 'Email verified successfully.',
      token,
      user: userResponse
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