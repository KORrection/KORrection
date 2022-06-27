import pkg from 'mongoose';
const { Schema, model } = pkg;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    // Id: {
    //   type: String,
    // },
    nickname: {
      type: String,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    provider: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.virtual('posts', {
  ref: 'post',
  localField: '_id',
  foreignField: 'authorObjId',
});

UserSchema.virtual('comments', {
  ref: 'comment',
  localField: '_id',
  foreignField: 'authorObjId',
});

UserSchema.virtual('upvotes', {
  ref: 'postVote',
  localField: '_id',
  foreignField: 'userObjId',
});

const UserModel = model('User', UserSchema);

export { UserModel };
