// * (2)  service layer
import { Post } from './postModel.mjs';

class postService {
  static async createPost({ userId, category, title, content }) {
    if (!category || !userId || !title || !content) {
      throw new Error('내용을 모두 입력해주세요');
    }
    const author = userId.substring(0, userId.indexOf('@')); // ! assume that userId = email
    const post = await Post.createPost({ category, author, title, content });
    post.errorMessage = null;
    return post;
  }

  static async findAll() {
    const posts = await Post.findAll();
    return posts;
  }

  static async findPost({ shortId }) {
    const post = await Post.findPost({ shortId });
    if (!post) {
      throw new Error('게시물이 없습니다');
    }
    return post;
  }

  static async updatePost({ shortId, category, title, content }) {
    if (!title || !content) {
      throw new Error('제목과 내용을 입력해주세요');
    }
    await Post.updatePost({ shortId, category, title, content });
    const post = await Post.findPost({ shortId });
    return post;
  }

  static async deletePost({ shortId }) {
    try {
      await Post.deletePost({ shortId });
    } catch (err) {
      throw new Error('게시물이 없습니다');
    }
  }
}

export { postService };
