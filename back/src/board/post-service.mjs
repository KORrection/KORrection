// * (2)  service layer
import { Post } from './post-model.mjs';
// import { nanoid } from 'nanoid';

class postService {
  static async createPost({ category, author, title, content }) {
    // const shortId = nanoid();
    // const likes = 0;
    // const post = await Post.createPost({ shortId, category, author, title, content, likes });
    const post = await Post.createPost({ category, author, title, content });
    post.errorMessage = null;
    return post;
  }
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
