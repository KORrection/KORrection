// * (2)  service layer
import { Post } from './postModel.mjs';
import { User } from '../user/userModel.mjs';

class postService {
  static async createPost({ userId, category, title, content }) {
    if (!category || !userId || !title || !content) {
      throw new Error('내용을 모두 입력해주세요');
    }
    const user = await User.findById({ userId });
    const authorObjId = user._id;
    const authorName = user.nickname;
    const post = await Post.createPost({ category, authorObjId, title, content });
    post.errorMessage = null;
    return { post, authorName };
  }

  static async findAll() {
    const posts = await Post.findAll();
    return posts;
  }

  static async findPostById({ postId }) {
    const postAndComments = await Post.findPostById({ postId });
    if (!postAndComments) {
      throw new Error('게시물이 없습니다');
    }
    console.log(postAndComments);
    console.log(postAndComments.authorObjId.nickname);
    const post = {
      _id: postAndComments._id,
      category: postAndComments.category,
      title: postAndComments.title,
      content: postAndComments.content,
      likeCount: postAndComments.likeCount,
      createdAt: postAndComments.createdAt,
      updatedAt: postAndComments.updatedAt,
    };
    const authorName = postAndComments.authorObjId.nickname;
    const comments = postAndComments.comments;
    return { post, authorName, comments };
  }

  static async updatePost({ postId, category, title, content }) {
    if (!title || !content) {
      throw new Error('제목과 내용을 입력해주세요');
    }
    const post = await Post.updatePost({ postId, category, title, content });
    return post;
  }

  static async deletePost({ postId }) {
    const doc = await Post.deletePost({ postId });
    if (doc.acknowledged && doc.deletedCount == 1) {
      // console.log('Delete successfully');
      return { isDeleted: true, message: '게시물이 삭제되었습니다.' };
    } else {
      // console.log("Post doesn't exist or already deleted");
      throw new Error('없는 게시물입니다.');
    }
  }

  static async upvotePost({ userObjId, postId }) {
    const user = await User.findById({ userObjId });
    if (!user) {
      throw new Error('존재하지 않는 유저입니다.');
    }

    const post = await Post.findById({ postId });
    if (!post) {
      return { errorMessage: '존재하지 않는 게시글입니다.' };
    }
    const votedPost = post._id;
    console.log(votedPost);

    const updatedPost = await Post.upvotePost({ voteUser, votedPost });
    return updatedPost;
  }

  static async downvotePost({ userId, postId }) {
    const author = userId.substring(0, userId.indexOf('@')); // ! assume that userId = email
    const post = await Post.downvotePost({ author, postId });
    if (post.likeCount < 0) {
      throw new Error('잘못된 요청입니다.');
    }
    return post;
  }
}

export { postService };
