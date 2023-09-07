import express from 'express';
import { validationUserLogin, validationUserRegistarion } from '../validations/Users.js';
import { getUserProfile, loginUser, registerUser, userLogout } from '../controllers/userControler.js';
import { authenticate } from '../middleWares/authMiddleWare.js';
const userRouter = express.Router();
userRouter.post('/register-user',validationUserRegistarion ,registerUser);
userRouter.post('/login-user', validationUserLogin, loginUser);
userRouter.get('/getUserProfile', authenticate, getUserProfile)
userRouter.get('/logout', userLogout)

export default userRouter;