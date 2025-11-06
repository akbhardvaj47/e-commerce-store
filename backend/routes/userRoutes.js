import express from 'express';
import { register, loginController, forgetPasswordController } from '../controllers/authController.js';
import { requireSignIn } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/signup', register);
userRouter.post('/login', loginController);
userRouter.post('/forget-password', forgetPasswordController);
userRouter.get('/auth-user',requireSignIn,(req,res)=>{
  res.status(201).send({
    message:"access granted",
    status:true,
    user:req.user
  })
})
export default userRouter;
