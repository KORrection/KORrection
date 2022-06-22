import { Comment } from './commentModel.mjs';
import { User } from '../user/userModel.mjs';

class commentService {
  static async createComment({ userId, parentPostId, parentPostObjId, commentBody }) {
    if (!commentBody) {
      throw new Error('댓글 내용을 입력하세요.');
    }
    const user = await User.findById({ userId });
    const authorObjId = user._id;
    const authorName = user.nickname;
    const comment = await Comment.createComment({ authorObjId, parentPostId, parentPostObjId, commentBody });
    return { comment, authorName };
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
