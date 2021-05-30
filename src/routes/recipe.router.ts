import express from 'express';
import { recipeController } from '../controllers';
import { isAuthenticated, isAuthorized } from '../middlewares';

// Create and export a router.
export const recipeRouter = express.Router();

// Define all routes and methods, add middlewares and route handlers.
recipeRouter
  .route('/')
  .get(isAuthenticated, recipeController.getRecipes)
  .post(isAuthenticated, recipeController.createRecipe);
recipeRouter
  .route('/:id')
  .get(isAuthenticated, recipeController.getRecipe)
  .patch(isAuthorized, recipeController.updateRecipe)
  .delete(isAuthorized, recipeController.deleteRecipe);
