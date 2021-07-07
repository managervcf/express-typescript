import { Router } from 'express';
import { authRouter } from './auth.router';
import { recipeRouter } from './recipe.router';
import { uploadRouter } from './upload.router';
import { userRouter } from './user.router';
import { Route } from '../types';

// Create and export a router.
export const apiRouter = Router();

// Assign all routers to specific routes.
apiRouter.use(Route.Auth, authRouter);
apiRouter.use(Route.Recipes, recipeRouter);
apiRouter.use(Route.Upload, uploadRouter);
apiRouter.use(Route.Users, userRouter);
