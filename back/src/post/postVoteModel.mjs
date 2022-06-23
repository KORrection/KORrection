import { PVoteModel } from './postVoteSchema.mjs';

class PostVote {
  static async findPostVote({ userObjId, postObjId }) {
    return await PVoteModel.findOne({ userObjId, postObjId });
  }
  static async createPostVote({ userObjId, postObjId }) {
    return await PVoteModel.create({ userObjId, postObjId }).populate('postObjId');
  }

  static async deletePostVote({ userObjId, postObjId }) {
    return await PVoteModel.deleteOne({ userObjId, postObjId });
  }
}

export { PostVote };
