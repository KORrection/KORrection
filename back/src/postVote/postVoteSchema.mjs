import pkg from 'mongoose';

const { Schema, model } = pkg;

const PostVoteSchema = new Schema(
  {
    postObjId: {
      type: Schema.Types.ObjectId,
      ref: 'post',
      required: true,
    },
    userObjId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const PVoteModel = model('postVote', PostVoteSchema);
export { PVoteModel };
