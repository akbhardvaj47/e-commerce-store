import express from 'express'
import { requireSignIn } from '../middleware/authMiddleware.js'
import checkIsAdmin from '../middleware/adminMiddleware.js';
import { createCategory, deleteCategory, getAllCategory, updateCategory } from '../controllers/categoryController.js';

const categoryRoute=express.Router()

categoryRoute.post('/create-category', requireSignIn, checkIsAdmin ,createCategory );
categoryRoute.put('/update-category/:id', requireSignIn, checkIsAdmin ,updateCategory );
categoryRoute.delete('/delete-category/:id', requireSignIn, checkIsAdmin ,deleteCategory );

categoryRoute.get('/categories', getAllCategory );

export default categoryRoute