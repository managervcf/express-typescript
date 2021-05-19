import express from 'express';
import { commentController } from '../controllers';

const commentRouter = express.Router();

commentRouter.get('/', async (_req, res) => {
  const comments = await commentController.getComments();
  return res.send(comments);
});

commentRouter.post('/', async (req, res) => {
  const newComment = await commentController.createComment(req.body);
  return res.send(newComment);
});

commentRouter.get('/:id', async (req, res) => {
  const comment = await commentController.getComment(req.params.id);

  if (!comment) {
    res.status(404).send({ message: 'No comment found' });
  }

  return res.send(comment);
});

export { commentRouter };
