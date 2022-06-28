import { UserModel } from './userSchema.mjs';

class User {
  static async create({ email, nickname, profilePicture, description }) {
    const createdNewUser = await UserModel.create({ email, nickname, profilePicture, description });
    return createdNewUser;
  }
  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });

    return user;
  }
  static async findById({ userId }) {
    const user = await UserModel.findOne({ _id: userId });
    return user;
  }
  static async findAll() {
    const users = await UserModel.findAll({});
    return users;
  }
  static async update({ userId, fieldToUpdate, newValue }) {
    const filter = { _id: userId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  static async getPostByUser({ userObjId }) {
    const userAndPosts = await UserModel.findOne({ _id: userObjId }).populate('posts');
    return userAndPosts;
  }

  static async getCommentsByUser({ userObjId }) {
    const userAndComments = await UserModel.findOne({ _id: userObjId }).populate('comments');
    return userAndComments;
  }

  static async getUpvotesByUser({ userObjId }) {
    const userAndUpvotes = await UserModel.findOne({ _id: userObjId }).populate({
      path: 'upvotes',
      populate: { path: 'postObjId', populate: { path: 'authorObjId', select: 'nickname' } },
    });
    return userAndUpvotes;
  }
}

export { User };
