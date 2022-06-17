import { CommentModel } from './commentSchema.mjs';

class Comment {
  static async createComment({ author, parentPostId, commentBody }) {
    const newComment = await CommentModel.create({ author, parentPostId, commentBody });
    return newComment;
  }

  static async getComments({ parentPostId }) {
    return await CommentModel.find({ parentPostId });
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

  static async pretendToDelCom({ commentId }) {
    return await CommentModel.findOneAndUpdate({ commentId }, { $set: { isDeleted: true } }, { new: true });
  }
}

export { Comment };
