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
    const post = await Post.findPost({ shortId });
    if (!post) {
      const errorMessage = '게시물이 없습니다';
      return { errorMessage };
    }
    return post;
  }

  static async updatePost({ shortId, category, title, content }) {
    if (!title || !content) {
      throw new Error('제목과 내용을 입력해주세요');
    }
    await Post.updatePost({ shortId, category, title, content });
    const post = await Post.findById({ shortId });
    return post;
  }

  static async deletePost({ shortId }) {
    await Post.deletePost({ shortId });
  }
}

export { postService };
