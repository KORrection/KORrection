import { Comment } from './commentModel.mjs';
import { User } from '../user/userModel.mjs';

class commentService {
  static async createComment({ userId, parentPostId, parentPostObjId, commentBody }) {
    if (!commentBody) {
      throw new Error('댓글 내용을 입력하세요.');
    }
    const user = await User.findById({ userId });
    const authorObjId = user._id;
    const comment = await Comment.createComment({ authorObjId, parentPostId, parentPostObjId, commentBody });
    const refinedComment = {
      _id: comment.id,
      author: user.nickname,
      authorPic: user.profilePicture,
      commentId: comment.commentId,
      commentBody: comment.commentBody,
      isAuthor: true,
      createdAt: comment.createdAt,
    };
    return refinedComment;
  }

  static async getComments({ condition }) {
    if (condition.parentPostId && condition.parentPostObjId) {
      const { parentPostId, userId } = condition;
      const comments = await Comment.getCommentsByPostId({ parentPostId });
      const refinedComments = comments.map((comment) => {
        return {
          _id: comment._id,
          author: comment.authorObjId.nickname,
          authorPic: comment.authorObjId.profilePicture,
          commentId: comment.commentId,
          commentBody: comment.commentBody,
          createdAt: comment.createdAt,
          isAuthor: comment.authorObjId._id == userId ? true : false,
        };
      });
      return refinedComments;
    }

    const userObjId = condition.userObjId;
    const userBelongings = await User.getCommentsByUser({ userObjId });
    const comments = userBelongings.comments.length == 0 ? '작성한 내역이 없습니다' : userBelongings.comments;
    const refinedComments = comments.map((comment) => {
      return {
        _id: comment._id,
        author: comment.authorObjId.nickname,
        authorPic: comment.authorObjId.profilePicture,
        commentId: comment.commentId,
        commentBody: comment.commentBody,
        createdAt: comment.createdAt,
      };
    });
    return refinedComments;
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
      console.log('Delete successfully');
      return { isDeleted: true, message: '댓글이 삭제되었습니다.' };
    } else {
      console.log("Comment doesn't exist or already deleted");
      throw new Error('없는 댓글입니다.');
    }
  }
}

export { commentService };
