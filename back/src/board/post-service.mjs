// * (2)  service layer
import { Post } from './post-model.mjs';

class postService {
  static async findAll() {
    const posts = await Post.findAll();
    return posts;
  }
}

export { postService };
