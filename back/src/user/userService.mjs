import { User } from './userModel.mjs';
import jwt from 'jsonwebtoken';

class userService {
  static async getUser({ email }) {
    const user = await User.findByEmail({ email });
    if (!user) {
      console.log('존재하지 않는 이메일입니다');
    }
    const id = user.email;
    const nickname = user.nickname;
    const description = user.description;

    const loginUser = {
      email,
      nickname,
      description,
    };
    return loginUser;
  }

  static async setUser({ userId, toUpdate }) {
    let user = await User.findById({ userId });

    if (!user) {
      console.log('존재하지 않는 회원입니다.');
      return;
    }

    if (toUpdate.nickname) {
      const fieldToUpdate = 'nickname';
      const newValue = toUpdate.nickname;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = 'description';
      const newValue = toUpdate.description;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }
    return user;
  }

  static async updateProfilePhotoUrl({ userId, toUpdate }) {
    let user = await User.findById({ userId });

    if (!user) {
      console.log('존재하지 않는 회원입니다.');
      return;
    }
    if (toUpdate.profilePicture) {
      const fieldToUpdate = 'profilePicture';
      const newValue = toUpdate.profilePicture;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    return user;
  }

  static async getUsers() {
    const users = await User.findAll();
    return users;
  }
}

export { userService };
