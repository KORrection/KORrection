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
    return await CommentModel.findOneAndUpdate({ commentId }, { commentBody }, { returnDocument: 'after' });
  }
}

export { Comment };
