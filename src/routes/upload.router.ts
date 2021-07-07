import express from 'express';
import { uploadController } from '../controllers';
import { isAuthenticated } from '../middlewares';
import { Route } from '../types';

// Create and export a router.
export const uploadRouter = express.Router();

// Define all routes and methods, add middlewares and route handlers.
uploadRouter
  .route(Route.Base)
  .post(isAuthenticated, uploadController.getPresignedUrl);
