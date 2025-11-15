import express from 'express'
import { requireSignIn } from '../middleware/authMiddleware.js'
import { createOrder, getMyOrders } from '../controllers/orderController.js'
import { getAllOrders } from "../controllers/orderController.js";
import checkIsAdmin from '../middleware/adminMiddleware.js';

const orderRoutes= express.Router()

orderRoutes.post('/create', requireSignIn, createOrder)
orderRoutes.get("/myorders", requireSignIn, getMyOrders);

orderRoutes.get("/all", requireSignIn, checkIsAdmin, getAllOrders);


export default orderRoutes