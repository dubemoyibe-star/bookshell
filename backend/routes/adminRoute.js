import express from 'express'
import { registerAdmin, loginAdmin, getActivity } from '../controllers/adminController.js';
import adminAuth from '../middleware/adminAuth.js';

const adminRouter = express.Router();
//register route isnt supposed to be active until a new admin is to be added
// adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.get('/activity', adminAuth ,getActivity)

export default adminRouter