import express from 'express';
import { config } from '../config';
import { recipeController } from '../controllers';
import { isAuthenticated, isAuthorized, validate } from '../middlewares';
import { Route } from '../types';

// Create and export a router.
export const recipeRouter = express.Router();

// Define all routes and methods, add middlewares and route handlers.
recipeRouter
  .route(Route.Base)
  .get(isAuthenticated, recipeController.getRecipes)
  .post(
    validate(config.recipeValidationSchema),
    isAuthenticated,
    recipeController.createRecipe
  );
recipeRouter
  .route(Route.Id)
  .get(isAuthenticated, recipeController.getRecipe)
  .patch(
    validate(config.recipeValidationSchema),
    isAuthorized,
    recipeController.updateRecipe
  )
  .delete(isAuthorized, recipeController.deleteRecipe);
