import express from 'express';
import { commentController } from '../controllers';

const commentRouter = express.Router();

commentRouter
  .route('/')
  .get(commentController.getComments)
  .post(commentController.createComment);

commentRouter.route('/:id').get(commentController.getComment);

export { commentRouter };
