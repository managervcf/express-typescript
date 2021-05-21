import { Request, Response } from 'express';
import { CommentService, commentService } from '../services';

class CommentController {
  constructor(private commentService: CommentService) {}

  public getComments = async (
    _req: Request,
    res: Response
  ): Promise<Response<Comment[]>> => {
    const comments = await this.commentService.getComments();
    return res.send(comments);
  };

  public createComment = async (
    req: Request,
    res: Response
  ): Promise<Response<Comment>> => {
    const newComment = await this.commentService.createComment(req.body);
    return res.send(newComment);
  };

  public getComment = async (
    req: Request,
    res: Response
  ): Promise<Response<Comment | null>> => {
    const comment = await this.commentService.getComment(req.params.id);

    if (!comment) {
      return res.status(404).send({ message: 'No comment found' });
    }

    return res.send(comment);
  };
}

export const commentController = new CommentController(commentService);
