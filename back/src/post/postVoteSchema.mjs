import pkg from 'mongoose';
const { Schema, model } = pkg;

const PostVoteSchema = new Schema(
  {
    // postId: {
    //   type: String,
    //   required: true,
    // },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'post',
      required: true,
    },
    // author: {
    //   type: String,
    //   required: true,
    // },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamps: true }
);

const PVoteModel = model('postVote', PostVoteSchema);
export { PVoteModel };
