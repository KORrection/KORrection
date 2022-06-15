import { UserModel } from './userSchema.mjs';
// import { UserService } from './userService.mjs';

class User {
  static async create(newUser) {
    const createdNewUser = await UserModel.create(newUser);
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
