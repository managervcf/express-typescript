import express from 'express';
import { authController } from '../controllers';

// Create and export a router.
export const authRouter = express.Router();

// Define all routes and methods, add middlewares and route handlers.
authRouter.route('/register').post(authController.registerUser);
authRouter.route('/login').post(authController.loginUser);
authRouter.route('/currentuser').get(authController.getCurrentUser);
