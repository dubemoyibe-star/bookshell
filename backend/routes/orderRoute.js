import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { confirmPayment, createOrder, deleteOrder, getOrderById, getOrders, getUserOrders, updateOrder } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js';

const orderRouter = express.Router()

//protected route
orderRouter.post('/', authMiddleware, createOrder);
orderRouter.get('/confirm', authMiddleware, confirmPayment);

//public route
orderRouter.get('/', adminAuth, getOrders);
orderRouter.get('/user', authMiddleware, getUserOrders)
orderRouter.get('/:id', getOrderById)
orderRouter.put('/:id', adminAuth , updateOrder)

orderRouter.delete('/:id', deleteOrder)

export default orderRouter