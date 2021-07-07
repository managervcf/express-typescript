import express from 'express';
import { config } from '../config';
import { authController } from '../controllers';
import { validate } from '../middlewares';
import { Route } from '../types';

// Create and export a router.
export const authRouter = express.Router();

// Define all routes and methods, add middlewares and route handlers.
authRouter
  .route(Route.Register)
  .post(validate(config.userValidationSchema), authController.registerUser);
authRouter
  .route(Route.Login)
  .post(validate(config.userValidationSchema), authController.loginUser);
authRouter.route(Route.CurrentUser).get(authController.getCurrentUser);
