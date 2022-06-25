import { PVoteModel } from './postVoteSchema.mjs';

class PostVote {
  static async findPostVote({ userObjId, postObjId }) {
    return await PVoteModel.findOne({ userObjId, postObjId });
  }
  static async createPostVote({ userObjId, postObjId }) {
    return await PVoteModel.create({ userObjId, postObjId });
  }

  static async deletePostVote({ postVoteId }, session) {
    return await PVoteModel.deleteOne({ _id: postVoteId }).session(session);
  }
}

export { PostVote };
