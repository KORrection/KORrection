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

  static async findPost({ postId }) {
    const post = await Post.findPost({ postId });
    if (!post) {
      throw new Error('게시물이 없습니다');
    }
    return post;
  }

  static async updatePost({ postId, category, title, content }) {
    if (!title || !content) {
      throw new Error('제목과 내용을 입력해주세요');
    }
    const post = await Post.updatePost({ postId, category, title, content });
    return post;
  }

  static async deletePost({ postId }) {
    const doc = await Post.deletePost({ postId });
    if (doc.acknowledged && doc.deletedCount == 1) {
      // console.log('Delete successfully');
      return { isDeleted: true, message: '게시물이 삭제되었습니다.' };
    } else {
      // console.log("Post doesn't exist or already deleted");
      throw new Error('없는 게시물입니다.');
    }
  }

  static async likePost({ postId }) {
    const post = await Post.likePost({ postId });
    return post;
  }

  static async undoLikePost({ postId }) {
    const post = await Post.undoLikePost({ postId });
    if (post.likeCount < 0) {
      throw new Error('잘못된 요청입니다.');
    }
    return post;
  }
}

export { postService };
