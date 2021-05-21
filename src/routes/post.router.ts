import express from 'express';
import { postController } from '../controllers';

const postRouter = express.Router();

postRouter
  .route('/')
  .get(postController.getPosts)
  .post(postController.createPost);

postRouter.route('/:id').get(postController.getPost);

export { postRouter };
