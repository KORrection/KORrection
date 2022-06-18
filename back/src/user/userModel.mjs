import { UserModel } from './userSchema.mjs';

class User {
  static async create({ email, googleId, nickname, profilePicture, description }) {
    const createdNewUser = await UserModel.create({ email, googleId, nickname, profilePicture, description });
    return createdNewUser;
  }
  static async findById({ user_id }) {
    const user = await UserModel.findOne({ user_id });

    return user;
  }
  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }
  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }
}

export { User };
