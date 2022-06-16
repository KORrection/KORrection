import { Comment } from './commentModel.mjs';
// import { Post } from '../post/postModel.mjs';

class commentService {
  static async createComment({ userId, parentPostId, commentBody }) {
    // const post = await Post.findPost({ parentPostId });
    // if (!post) {
    //   throw new Error('잘못된 요청입니다.');
    // }
    if (!commentBody) {
      throw new Error('댓글 내용을 입력하세요.');
    }
    const author = userId.substring(0, userId.indexOf('@')); // ! assume that userId = email
    const comment = await Comment.createComment({ author, parentPostId, commentBody });
    return comment;
  }

  static async getComments({ parentPostId }) {
    const comments = await Comment.getComments({ parentPostId });
    return comments;
  }
}

export { commentService };
