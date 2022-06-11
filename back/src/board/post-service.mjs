// * (2)  service layer
import { Post } from './post-model.mjs';
// import { nanoid } from 'nanoid';

class postService {
  static async createPost({ category, author, title, content }) {
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
    if (!post) {
      const errorMessage = '게시물이 없습니다';
      return { errorMessage };
    }
    return post;
  }
}

export { postService };
