import { Router } from 'express';
import { commentRouter } from './comment.router';
import { postRouter } from './post.router';
import { userRouter } from './user.router';

const apiRouter = Router();

apiRouter.use('/comments', commentRouter);
apiRouter.use('/posts', postRouter);
apiRouter.use('/users', userRouter);

export { apiRouter };
