import { User } from '../user/userModel.mjs';

class postVoteService {
  static async findUpvotesByUser({ userObjId }) {
    const userBelongings = await User.getUpvotesByUser({ userObjId });
    const upvotes = userBelongings.upvotes;
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
    const result = refinedUpvotes.length == 0 ? '좋아요 한 내역이 없습니다' : refinedUpvotes;
    return result;
  }
}

export { postVoteService };
