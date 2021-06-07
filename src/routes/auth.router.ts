import express from 'express';
import { authController } from '../controllers';
import { validate } from '../middlewares';
import { userValidationSchema } from '../types';

// Create and export a router.
export const authRouter = express.Router();

// Define all routes and methods, add middlewares and route handlers.
authRouter
  .route('/register')
  .post(validate(userValidationSchema), authController.registerUser);
authRouter
  .route('/login')
  .post(validate(userValidationSchema), authController.loginUser);
authRouter.route('/currentuser').get(authController.getCurrentUser);
