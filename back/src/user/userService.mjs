import { User } from './userModel.mjs';
import jwt from 'jsonwebtoken';

//Token 생성

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
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let user = await User.findById({ userId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
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

  static async fileUpload({ userId, toUpdate }) {
    let user = await User.findById({ userId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
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
