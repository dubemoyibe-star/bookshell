import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: false
  },
  firebaseUid: {
    type: String,
    required: false
  }
},
 {
  timestamps: true
})

const userModel = mongoose.models.user || mongoose.model('User', userSchema)
export default userModel