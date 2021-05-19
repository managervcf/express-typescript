import { Router } from 'express';
import { commentRouter } from './comment.router';
import { postRouter } from './post.router';
import { userRouter } from './user.router';

const router = Router();

router.use('/users', commentRouter);
router.use('/users', postRouter);
router.use('/users', userRouter);

export { router };
