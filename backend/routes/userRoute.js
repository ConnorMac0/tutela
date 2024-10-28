import express from 'express';
import { loginUser, registerUser, adminLogin, listUsers, removeUser, createGuest } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.get('/list', listUsers)
userRouter.post('/remove', removeUser)
userRouter.post('/guest', createGuest)

export default userRouter;