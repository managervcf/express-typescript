import express from 'express';
import { config } from '../config';
import { recipeController } from '../controllers';
import { isAuthenticated, isAuthorized, validate } from '../middlewares';

// Create and export a router.
export const recipeRouter = express.Router();

// Define all routes and methods, add middlewares and route handlers.
recipeRouter
  .route('/')
  .get(isAuthenticated, recipeController.getRecipes)
  .post(
    validate(config.recipeValidationSchema),
    isAuthenticated,
    recipeController.createRecipe
  );
recipeRouter
  .route('/:id')
  .get(isAuthenticated, recipeController.getRecipe)
  .patch(
    validate(config.recipeValidationSchema),
    isAuthorized,
    recipeController.updateRecipe
  )
  .delete(isAuthorized, recipeController.deleteRecipe);
