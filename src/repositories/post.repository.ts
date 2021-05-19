import { getRepository, Repository } from 'typeorm';
import { Post } from '../models';
import { CreatePostDto } from '../types/interfaces';

export class PostRepository {
  private get postRepository(): Repository<Post> {
    return getRepository(Post);
  }

  public async getPosts(): Promise<Post[]> {
    return this.postRepository.find();
  }

  public async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const post = new Post();
    return this.postRepository.save({
      ...post,
      ...createPostDto,
    });
  }

  public async getPost(id: number): Promise<Post | null> {
    const post = await this.postRepository.findOne({ id });

    if (!post) {
      return null;
    }

    return post;
  }
}

export const postRepository = new PostRepository();
