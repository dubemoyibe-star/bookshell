import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import admin from '../config/firebaseAdmin.js'
import dotenv from 'dotenv'


const JWT_SECRET = process.env.JWT_SECRET
const TOKEN_EXPIRES = '24h'

const createToken = (userId) => 
        jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES })

export async function registerUser(req, res) {
  const { username, email, password } = req.body;

  if(!username || !email || !password) {
    return res.status(400).json({success: false, message: 'All fields are required'})
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

  try {
    const userExists = await userModel.findOne({ email })
    if(userExists) {
      return res.status(409).json({success: false, message: 'User already exists'})
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
      name: username,
      email,
      password: hashedPassword
    })
    const token = createToken(user._id)
    res.status(201).json({
      success: true, 
      message: 'Account created successfully', 
      token, 
      user: {
        id: user._id,
        username: user.name,
        email:user.email
      }
    })

  } catch (error) {
    console.error('Registration error', error)
    res.status(500).json({success: false , message: 'Server error'})
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body 

  if(!email || ! password) {
    return res.status(400).json({success: false, message: 'All fields are required'})
  }

  try {
    const user = await userModel.findOne({ email })
    if(!user) {
      return res.status(401).json({success: false, message: 'Invalid email or password'})
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
      return res.status(401).json({success: false, message: 'Invalid email or password'})
    }

    const token = createToken(user._id)
    res.status(200).json({
      success: true, 
      message: 'Login successful', 
      token, 
      user: {
        id: user._id,
        username: user.name,
        email:user.email
      }
    })
  } catch (error) {
    console.error('Login error', error)
    res.status(500).json({success: false , message: 'Server error'})
  }
}

export async function googleLogin(req, res) {
  const { token } = req.body

  try {
    const decodedToken = await admin.auth().verifyIdToken(token)
    const { email, name, uid } = decodedToken

    let user = await userModel.findOne({ email })

    if (!user) {
      user = await userModel.create({
        name,
        email,
        firebaseUid: uid,
      })
    }

    const jwtToken = createToken(user._id)

    res.status(200).json({
      success: true, 
      message: 'Login successful', 
      token: jwtToken,
      user: {
        id: user._id,
        username: user.name,
        email:user.email
      }
    })
  } catch (error) {
    console.error(error)
    res.status(401).json({ message: "Invalid or expired token" })
  }
}