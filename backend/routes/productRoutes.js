import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getSingleProductBySlug, updateProduct } from '../controllers/productController.js'
import { requireSignIn } from '../middleware/authMiddleware.js'
import checkIsAdmin from '../middleware/adminMiddleware.js'

const productRoute=express.Router()

productRoute.get('/',getAllProducts)
productRoute.post('/create-product',requireSignIn, checkIsAdmin,createProduct)
productRoute.delete('/delete-product/:id',requireSignIn, checkIsAdmin,deleteProduct)
productRoute.put('/update-product/:id',requireSignIn, checkIsAdmin,updateProduct)
productRoute.get('/product/:slug' ,getSingleProductBySlug);

export default productRoute