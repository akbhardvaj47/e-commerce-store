import express from 'express'
import { requireSignIn } from '../middleware/authMiddleware.js'
import { createOrder, getMyOrders } from '../controllers/orderController.js'

const orderRoutes= express.Router()

orderRoutes.post('/create', requireSignIn, createOrder)
orderRoutes.get("/myorders", requireSignIn, getMyOrders);

export default orderRoutes