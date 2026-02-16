import Admin from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from 'validator'
import activityModel from "../models/activityModel.js";

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRES = '24h'

const createToken = (adminId) => 
        jwt.sign({ id: adminId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES })

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

      if(!validator.isEmail(email)) {
        return res.status(400).json({success: false, message: 'Invalid email'})
      }
    
      if (
          !validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0
          })
        ) {
          return res.status(400).json({
            message:
              "Password must be at least 8 characters and include uppercase, lowercase, and a number."
          });
        }

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });
    
    const token = createToken(admin._id)

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });

  } catch (error) {
    console.error("Register Admin Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Admin account disabled",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = createToken(admin._id)

    res.json({
      success: true,
      message: "Admin logged in successfully",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });

  } catch (error) {
    console.error("Login Admin Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getActivity = async (req, res) => {
  try {
    const activities = await activityModel.find().sort({ date: -1 }).limit(100); 
    res.json({ success: true, data: activities });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}