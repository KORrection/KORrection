import { UserModel } from './userSchema.mjs';

class User {
  static async create({ email, Id, nickname, profilePicture, description }) {
    const createdNewUser = await UserModel.create({ email, Id, nickname, profilePicture, description });
    return createdNewUser;
  }
  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });

    return user;
  }
  static async findById({ userId }) {
    return await UserModel.findOne({ _id: userId });
  }
  static async findAll() {
    const users = await UserModel.findAll({});
    return users;
  }
  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { _id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }
}

export { User };
