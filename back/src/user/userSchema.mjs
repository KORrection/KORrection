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
  }
);

const UserModel = model('User', UserSchema);

export { UserModel };
