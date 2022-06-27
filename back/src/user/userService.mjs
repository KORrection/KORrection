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

  static async findPostsByUser({ userObjId }) {
    const userBelongings = await User.sortPostByUser({ userObjId });
    const post = userBelongings.posts.length == 0 ? '작성한 내역이 없습니다' : userBelongings.posts;
    return post;
  }

  static async findCommentsByUser({ userObjId }) {
    const userBelongings = await User.sortCommentsByUser({ userObjId });
    const comments = userBelongings.comments.length == 0 ? '작성한 내역이 없습니다' : userBelongings.comments;
    return comments;
  }

  static async findUpvotesByUser({ userObjId }) {
    const userBelongings = await User.sortUpvotesByUser({ userObjId });
    const upvotes = userBelongings.upvotes;
    const refinedUpvotes = upvotes.map((upvote) => {
      return {
        postId: upvote.postObjId.postId,
        category: upvote.postObjId.category,
        authorName: upvote.postObjId.authorObjId.nickname,
        title: upvote.postObjId.title,
        content: upvote.postObjId.content,
        likeCount: upvote.postObjId.likeCount,
        createdAt: upvote.postObjId.createdAt,
      };
    });
    const result = refinedUpvotes.length == 0 ? '좋아요 한 내역이 없습니다' : refinedUpvotes;
    return result;
  }
}

export { userService };
