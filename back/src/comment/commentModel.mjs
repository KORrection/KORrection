import { CommentModel } from './commentSchema.mjs';

class Comment {
  static async createComment({ authorObjId, parentPostId, parentPostObjId, commentBody }) {
    const newComment = await CommentModel.create({ authorObjId, parentPostId, parentPostObjId, commentBody });
    return newComment;
  }

  static async getCommentsByPostId({ parentPostId }) {
    return await CommentModel.find({ parentPostId }).populate({
      path: 'authorObjId',
      select: ['nickname', 'profilePicture'],
    });
  }

  static async findCommentById({ commentId }) {
    return await CommentModel.findOne({ commentId });
  }

  static async updateComment({ commentId, commentBody }) {
    return await CommentModel.findOneAndUpdate({ commentId }, { $set: { commentBody } }, { new: true });
  }

  static async deleteComment({ commentId }) {
    return await CommentModel.deleteOne({ commentId });
  }

  static async deleteCommentsByPostId({ postId }, { session }) {
    if (session !== undefined) {
      return await CommentModel.deleteMany({ parentPostId: postId }).session(session);
    }
    return await CommentModel.deleteMany({ parentPostId: postId });
  }

  static async pretendToDelCom({ commentId }) {
    return await CommentModel.findOneAndUpdate({ commentId }, { $set: { isDeleted: true } }, { new: true });
  }
}

export { Comment };
