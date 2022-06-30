import { PVoteModel } from './postVoteSchema.mjs';

class PostVote {
  static async findPostVote({ userObjId, postObjId }) {
    return await PVoteModel.findOne({ userObjId, postObjId });
  }

  static async createPostVote({ userObjId, postObjId }, session) {
    return await PVoteModel.create({ userObjId, postObjId }).session(session);
  }

  static async deletePostVote({ postVoteId }, session) {
    return await PVoteModel.deleteOne({ _id: postVoteId }).session(session);
  }
}

export { PostVote };
