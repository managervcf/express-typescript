import express from 'express';
import { userController } from '../controllers';
import { isAuthorized } from '../middlewares';

// Create and export a router.
export const userRouter = express.Router();

// Define all routes and methods, add middlewares and route handlers.
userRouter.route('/').get(isAuthorized, userController.getUsers);
userRouter.route('/:id').get(isAuthorized, userController.getUser);
