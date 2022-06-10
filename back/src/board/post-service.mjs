// * (2)  service layer
import { Post } from './post-model.mjs';

class postService {
  static async findAll() {
    const posts = await Post.findAll();
    return posts;
  }

  static async findById({ shortId }) {
    const post = await Post.findById({ shortId });
    return post;
  }
}

export { postService };
