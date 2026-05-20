import express from 'express';
import { registerUser,loginUser } from '../controllers/user.controller.js';

const userrouter = express.Router();

userrouter.post('/register',registerUser);
userrouter.post('/login',loginUser);

export default userrouter;