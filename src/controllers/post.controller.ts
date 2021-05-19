import { Get, Route, Tags, Post as PostMethod, Body, Path } from 'tsoa';
import { PostRepository, postRepository } from '../repositories';
import { Post } from '../models';
import { CreatePostDto } from '../types/interfaces';

@Route('posts')
@Tags('Post')
class PostController {
  constructor(private postRepository: PostRepository) {}

  @Get('/')
  public async getPosts(): Promise<Post[]> {
    return this.postRepository.getPosts();
  }

  @PostMethod('/')
  public async createPost(@Body() createPostDto: CreatePostDto): Promise<Post> {
    return this.postRepository.createPost(createPostDto);
  }

  @Get('/:id')
  public async getPost(@Path() id: string): Promise<Post | null> {
    return this.postRepository.getPost(Number(id));
  }
}

export const postController = new PostController(postRepository);
