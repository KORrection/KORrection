import { User } from '../user/userModel.mjs';

class postVoteService {
  static async findUpvotesByUser({ userObjId }) {
    const userBelongings = await User.getUpvotesByUser({ userObjId });
    const upvotes = userBelongings.upvotes;
    if (!upvotes) {
      return {};
    }
    const refinedUpvotes = upvotes.map((upvote) => {
      return {
        postId: upvote.postObjId.postId,
        category: upvote.postObjId.category,
        authorName: upvote.postObjId.authorObjId.nickname,
        title: upvote.postObjId.title,
        content: upvote.postObjId.content,
        likeCount: upvote.postObjId.likeCount,
        createdAt: upvote.postObjId.createdAt,
      };
    });
    return refinedUpvotes;
  }
}

export { postVoteService };
