import express from 'express';
import { updateStatus, placeOrderPaypal, allOrders, userOrders } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js'

const orderRouter = express.Router();

// Admin routes
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// Payment routes
orderRouter.post('/paypal', authUser, placeOrderPaypal)

// User routes
orderRouter.post('/userOrders', authUser, userOrders)

export default orderRouter;