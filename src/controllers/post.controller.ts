import { Request, Response } from 'express';
import { Post } from '../models';
import { PostService, postService } from '../services';

class PostController {
  constructor(private postService: PostService) {}

  public getPosts = async (
    _req: Request,
    res: Response
  ): Promise<Response<Post[]>> => {
    const posts = await this.postService.getPosts();
    return res.send(posts);
  };

  public createPost = async (
    req: Request,
    res: Response
  ): Promise<Response<Post>> => {
    const newPost = await this.postService.createPost(req.body);
    return res.send(newPost);
  };

  public getPost = async (
    req: Request,
    res: Response
  ): Promise<Response<Post | null>> => {
    const post = await this.postService.getPost(req.params.id);

    if (!post) {
      return res.status(404).send({ message: 'No post found' });
    }

    return res.send(post);
  };
}

export const postController = new PostController(postService);
