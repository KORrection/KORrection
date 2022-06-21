import { UserModel } from './userSchema.mjs';

class User {
  static async create({ email, snsId, nickname, profilePicture, description }) {
    const createdNewUser = await UserModel.create({ email, snsId, nickname, profilePicture, description });
    return createdNewUser;
  }
  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });

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
