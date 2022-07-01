// * (2)  service layer
import { Post } from './postModel.mjs';
import { User } from '../user/userModel.mjs';
import { Comment } from '../comment/commentModel.mjs';
import { PostVote } from '../postVote/postVoteModel.mjs';
import mongoose from 'mongoose';

class postService {
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

  static async findPostById({ postId, userId }) {
    const postAndComments = await Post.findPostById({ postId });
    if (!postAndComments) {
      throw new Error('게시물이 없습니다');
    }
    const postObjId = postAndComments._id;
    const post = {
      _id: postObjId,
      category: postAndComments.category,
      title: postAndComments.title,
      content: postAndComments.content,
      likeCount: postAndComments.likeCount,
      createdAt: postAndComments.createdAt,
      updatedAt: postAndComments.updatedAt,
    };
    const authorName = postAndComments.authorObjId.nickname;
    const authorPic = postAndComments.authorObjId.profilePicture;
    const comments = await postAndComments.comments;
    const refinedComments = comments.map((comment) => {
      return {
        _id: comment._id,
        author: comment.authorObjId.nickname,
        authorPic: comment.authorObjId.profilePicture,
        commentId: comment.commentId,
        commentBody: comment.commentBody,
        createdAt: comment.createdAt,
        isAuthor: comment.authorObjId._id == userId ? true : false,
      };
    });
    const isAuthor = postAndComments.authorObjId._id == userId ? true : false;
    const voteRecord = await PostVote.findPostVote({ userObjId: userId, postObjId });
    const isLike = voteRecord == undefined ? false : true;
    return { post, authorName, authorPic, comments: refinedComments, isAuthor, isLike };
  }

  static async updatePost({ postId, category, title, content }) {
    if (!title || !content) {
      throw new Error('제목과 내용을 입력해주세요');
    }
    const updates = { category, title, content };
    const post = await Post.updatePost({ postId, updates });
    return post;
  }

  static async deletePost({ postId }) {
    const session = await mongoose.startSession();
    session.startTransaction();
    let postDoc;

    try {
      await Comment.deleteCommentsByPostId({ postId }, { session });
      postDoc = await Post.deletePost({ postId }, { session });
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
    } finally {
      await session.endSession();
    }

    if (postDoc !== undefined && postDoc.acknowledged && postDoc.deletedCount == 1) {
      console.log('Delete successfully');
      return { isDeleted: true, message: '게시물이 삭제되었습니다.' };
    } else {
      console.log("Post doesn't exist or already deleted");
      throw new Error('없는 게시물입니다.');
    }
  }

  static async upvotePost({ userObjId, postId }) {
    const post = await Post.findPostById({ postId });
    const postObjId = post._id;
    const voteRecord = await PostVote.findPostVote({ userObjId, postObjId });
    if (voteRecord !== null) {
      throw new Error('좋아요는 한 번만 가능합니다.');
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    let updatedPost;

    try {
      await PostVote.createPostVote({ userObjId, postObjId }, session);
      const updates = { likeCount: 1 };
      updatedPost = await Post.updatePost({ postId, updates }, session);
      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
    } finally {
      await session.endSession();
    }
    return updatedPost;
  }

  static async devotePost({ userObjId, postId }) {
    let updatedPost;
    let voteDoc;
    const post = await Post.findPostById({ postId });
    if (post.likeCount < 1) {
      throw new Error('게시물의 좋아요 수가 0입니다.');
    }
    const postObjId = post._id;
    const voteRecord = await PostVote.findPostVote({ userObjId, postObjId });
    if (voteRecord == undefined) {
      throw new Error('좋아요한 내역이 없습니다.');
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const updates = { likeCount: -1 };
      updatedPost = await Post.updatePost({ postId, updates }, session);
      const postVoteId = voteRecord._id;
      voteDoc = await PostVote.deletePostVote({ postVoteId }, session);
      await session.commitTransaction();
    } catch (err) {
      console.log(err);
      await session.abortTransaction();
    } finally {
      await session.endSession();
    }

    if (voteDoc !== undefined && voteDoc.acknowledged && voteDoc.deletedCount == 1) {
      console.log('Delete successfully');
      return updatedPost;
    } else {
      console.log("Vote record doesn't exist or already deleted");
      throw new Error('좋아요한 내역이 없습니다');
    }
  }

  static async findPostsByUser({ userObjId }) {
    console.log(userObjId);
    const userBelongings = await User.getPostByUser({ userObjId });
    console.log(userBelongings);
    const post = userBelongings.posts.length == 0 ? '작성한 내역이 없습니다' : userBelongings.posts;
    const refinedPosts = post.map((each) => {
      return {
        category: each.category,
        authorName: each.authorObjId.nickname,
        authorPic: each.authorObjId.profilePicture,
        title: each.title,
        content: each.content,
        likeCount: each.likeCount,
        postId: each.postId,
        createdAt: each.createdAt,
      };
    });
    return refinedPosts;
  }
}

export { postService };
