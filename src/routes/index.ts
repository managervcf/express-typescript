import { Router } from 'express';
import { authRouter } from './auth.router';
import { recipeRouter } from './recipe.router';
import { uploadRouter } from './upload.router';
import { userRouter } from './user.router';

// Create and export a router.
export const apiRouter = Router();

// Assign all routers to specific routes.
apiRouter.use('/auth', authRouter);
apiRouter.use('/recipes', recipeRouter);
apiRouter.use('/upload', uploadRouter);
apiRouter.use('/users', userRouter);
