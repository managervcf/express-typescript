import express from 'express';
import { postController } from '../controllers';

const postRouter = express.Router();

postRouter.get('/', async (_req, res) => {
  const posts = await postController.getPosts();
  return res.send(posts);
});

postRouter.post('/', async (req, res) => {
  const newPost = await postController.createPost(req.body);
  return res.send(newPost);
});

postRouter.get('/:id', async (req, res) => {
  const post = await postController.getPost(req.params.id);

  if (!post) {
    res.status(404).send({ message: 'No post found' });
  }

  return res.send(post);
});

export { postRouter };
