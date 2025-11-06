import express from 'express'
import { deleteUser, getAllUsers, updateUser } from '../controllers/adminController.js';
import checkIsAdmin from '../middleware/adminMiddleware.js';
import { requireSignIn } from '../middleware/authMiddleware.js';


const adminRoute=express.Router()

adminRoute.get('/users',requireSignIn,checkIsAdmin, getAllUsers)
adminRoute.delete('/users/delete-user/:id',requireSignIn,checkIsAdmin, deleteUser)
adminRoute.put('/users/update-user/:id',requireSignIn,checkIsAdmin, updateUser)

export default adminRoute;