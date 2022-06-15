import { UserModel } from './userSchema.mjs';

class User {
  static async create({ email, googleId, profilePicture, description }) {
    const createdNewUser = await UserModel.create({ email, googleId, profilePicture, description });
    return createdNewUser;
  }
  static async findById({ snsId }) {
    const user = await UserModel.findOne({ email: snsId });
    return user;
  }
  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }
}

export { User };
