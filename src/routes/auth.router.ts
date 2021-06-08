import express from 'express';
import { config } from '../config';
import { authController } from '../controllers';
import { validate } from '../middlewares';

// Create and export a router.
export const authRouter = express.Router();

// Define all routes and methods, add middlewares and route handlers.
authRouter
  .route('/register')
  .post(validate(config.userValidationSchema), authController.registerUser);
authRouter
  .route('/login')
  .post(validate(config.userValidationSchema), authController.loginUser);
authRouter.route('/currentuser').get(authController.getCurrentUser);
