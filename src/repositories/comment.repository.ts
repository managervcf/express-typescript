import { getRepository, Repository } from 'typeorm';
import { Comment } from '../models';
import { CreateCommentDto } from '../types/interfaces';

export class CommentRepository {
  private get commentRepository(): Repository<Comment> {
    return getRepository(Comment);
  }

  public async getComments(): Promise<Comment[]> {
    return await this.commentRepository.find();
  }

  public async createComment(
    createCommentDto: CreateCommentDto
  ): Promise<Comment> {
    const comment = new Comment();
    return this.commentRepository.save({
      ...comment,
      ...createCommentDto,
    });
  }

  public async getComment(id: number): Promise<Comment | null> {
    const comment = await this.commentRepository.findOne({ id });

    if (!comment) {
      return null;
    }

    return comment;
  }
}

export const commentRepository = new CommentRepository();
