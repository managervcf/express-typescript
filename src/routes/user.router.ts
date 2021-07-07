import express from 'express';
import { userController } from '../controllers';
import { isAuthorized } from '../middlewares';
import { Route } from '../types';

// Create and export a router.
export const userRouter = express.Router();

// Define all routes and methods, add middlewares and route handlers.
userRouter.route(Route.Base).get(isAuthorized, userController.getUsers);
userRouter.route(Route.Id).get(isAuthorized, userController.getUser);
