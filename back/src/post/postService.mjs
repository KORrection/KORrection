// * (2)  service layer
import { Post } from './postModel.mjs';
import { User } from '../user/userModel.mjs';
import { Comment } from '../comment/commentModel.mjs';
import { PostVote } from './postVoteModel.mjs';

class postService {
  // static async createPost(userId, { category, title, content }) {
  //   if (!category || !title || !content) {
  //     throw new Error('내용을 모두 입력해주세요');
  //   }
  //   console.log(userId);
  //   const user = await User.findById(userId);
  //   console.log(user);
  //   const authorObjId = userId;
  //   const authorName = user.nickname;
  //   const post = await Post.createPost({ category, authorObjId, title, content });
  //   post.errorMessage = null;
  //   return { post, authorName };
  // }
  static async createPost({ userId, category, title, content }) {
    if (!category || !title || !content) {
      throw new Error('내용을 모두 입력해주세요');
    }
    const user = await User.findById({ userId });
    const authorObjId = userId;
    const authorName = user.nickname;
    const post = await Post.createPost({ category, authorObjId, title, content });
    post.errorMessage = null;
    return { post, authorName };
  }

  static async findAll() {
    const posts = await Post.findAll(); // array
    const refinedPosts = posts.map((post) => {
      return {
        category: post.category,
        authorName: post.authorObjId.nickname,
        authorPic: post.authorObjId.profilePicture,
        title: post.title,
        content: post.content,
        likeCount: post.likeCount,
        postId: post.postId,
        createdAt: post.createdAt,
      };
    });
    return refinedPosts;
  }

  static async findPostById({ postId }) {
    const postAndComments = await Post.findPostById({ postId });
    if (!postAndComments) {
      throw new Error('게시물이 없습니다');
    }
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
    await Comment.deleteCommentsByPostId({ postId });
    const postDoc = await Post.deletePost({ postId });
    if (postDoc.acknowledged && postDoc.deletedCount == 1) {
      // console.log('Delete successfully');
      return { isDeleted: true, message: '게시물이 삭제되었습니다.' };
    } else {
      // console.log("Post doesn't exist or already deleted");
      throw new Error('없는 게시물입니다.');
    }
  }

  static async upvotePost({ userObjId, postId }) {
    const voteRecord = await PostVote.findPostVote({ userObjId, postId });
    if (voteRecord) {
      throw new Error('좋아요는 한 번만 가능합니다.');
    }
    const post = await Post.find;
    const postObjId = post._id;
    const newVoteRecord = await PostVote.createPostVote({ userObjId, postObjId });
    newVoteRecord.postObjId.LikeCount;
    return newVoteRecord;
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
