import express from 'express';
import { userController } from '../controllers';

const userRouter = express.Router();

userRouter
  .route('/')
  .get(userController.getUsers)
  .post(userController.createUser);

userRouter.route('/:id').get(userController.getUser);

export { userRouter };
