import { CommentModel } from './commentSchema.mjs';

class Comment {
  static async createComment({ author, parentPostId, commentBody }) {
    const newComment = await CommentModel.create({ author, parentPostId, commentBody });
    return newComment;
  }

  static async getComments({ parentPostId }) {
    return await CommentModel.find({ parentPostId });
  }
}

export { Comment };
