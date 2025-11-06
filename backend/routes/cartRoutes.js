import express from 'express'
import { requireSignIn } from '../middleware/authMiddleware.js'
import { addToCart, getCart, removeFromCart, updateCartQuantity } from '../controllers/cartController.js'



const cartRoutes=express.Router()


// Add or update cart item
cartRoutes.post('/add',requireSignIn,addToCart)

// get user's cart items
cartRoutes.get('/', requireSignIn, getCart)


cartRoutes.delete("/remove/:productId", requireSignIn, removeFromCart);
cartRoutes.put("/update", requireSignIn, updateCartQuantity);


export default cartRoutes