import express from 'express';
import { uploadController } from '../controllers';
import { isAuthenticated } from '../middleware';

// Create and export a router.
export const uploadRouter = express.Router();

// Define all routes and methods, add middlewares and route handlers.
uploadRouter.route('/').post(isAuthenticated, uploadController.getPresignedUrl);
