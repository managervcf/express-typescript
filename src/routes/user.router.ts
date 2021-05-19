import express from 'express';
import { userController } from '../controllers';

const userRouter = express.Router();

userRouter.get('/', async (_req, res) => {
  const users = await userController.getUsers();
  return res.send(users);
});

userRouter.post('/', async (req, res) => {
  const newUser = await userController.createUser(req.body);
  return res.send(newUser);
});

userRouter.get('/:id', async (req, res) => {
  const user = await userController.getUser(req.params.id);

  if (!user) {
    res.status(404).send({ message: 'No user found' });
  }

  return res.send(user);
});

export { userRouter };
