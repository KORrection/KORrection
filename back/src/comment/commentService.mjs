import { Comment } from './commentModel.mjs';
// import { Post } from '../post/postModel.mjs';

class commentService {
  static async createComment({ userId, parentPostId, commentBody }) {
    if (!commentBody) {
      throw new Error('댓글 내용을 입력하세요.');
    }
    const author = userId.substring(0, userId.indexOf('@')); // ! assume that userId = email
    const comment = await Comment.createComment({ author, parentPostId, commentBody });
    return comment;
  }

  static async getCommentsByPostId({ parentPostId }) {
    const comments = await Comment.getCommentsByPostId({ parentPostId });
    return comments;
  }

  static async updateComment({ commentId, commentBody }) {
    if (!commentBody) {
      throw new Error('댓글을 입력해주세요');
    }
    const comment = await Comment.updateComment({ commentId, commentBody });
    return comment;
  }

  static async deleteComment({ commentId }) {
    const doc = await Comment.deleteComment({ commentId });
    if (doc.acknowledged && doc.deletedCount == 1) {
      //console.log('Delete successfully');
      return { isDeleted: true, message: '댓글이 삭제되었습니다.' };
    } else {
      //console.log("Comment doesn't exist or already deleted");
      throw new Error('없는 댓글입니다.');
    }
  }

  static async pretendToDelCom({ commentId }) {
    const comment = await Comment.pretendToDelCom({ commentId });
    return comment;
  }
}

export { commentService };
