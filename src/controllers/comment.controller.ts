import { Get, Route, Tags, Post, Body, Path } from 'tsoa';
import { CommentRepository, commentRepository } from '../repositories/';
import { Comment } from '../models';
import { CreateCommentDto } from '../types/interfaces';

@Route('comments')
@Tags('Comment')
class CommentController {
  constructor(private commentRepository: CommentRepository) {}

  @Get('/')
  public async getComments(): Promise<Comment[]> {
    return this.commentRepository.getComments();
  }

  @Post('/')
  public async createComment(
    @Body() createCommentDto: CreateCommentDto
  ): Promise<Comment> {
    return this.commentRepository.createComment(createCommentDto);
  }

  @Get('/:id')
  public async getComment(@Path() id: string): Promise<Comment | null> {
    return this.commentRepository.getComment(Number(id));
  }
}

export const commentController = new CommentController(commentRepository);
