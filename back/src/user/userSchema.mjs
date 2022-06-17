import pkg from 'mongoose';
const { Schema, model } = pkg;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      default: null,
    },
    profile: {
      type: String,
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
