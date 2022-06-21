// * (3) database layer (model)
import { PostModel } from './postSchema.mjs';
import { PVoteModel } from './postVoteSchema.mjs';

class Post {
  static async createPost({ category, authorId, title, content }) {
    const newPost = await PostModel.create({ category, author: authorId, title, content });
    return newPost;
  }
  static async findAll() {
    return await PostModel.find({});
  }

  static async findPost({ postId }) {
    return await PostModel.findOne({ postId });
  }

  static async updatePost({ postId, category, title, content }) {
    return await PostModel.findOneAndUpdate({ postId }, { $set: { category, title, content } }, { new: true });
  }

  static async deletePost({ postId }) {
    return await PostModel.deleteOne({ postId });
  }

  static async upvotePost({ voteUser, votedPost }) {
    const post = await PostModel.findOneAndUpdate({ _id: votedPost }, { $inc: { likeCount: 1 } }, { new: true });
    await PVoteModel.create({ postId: votedPost, author: voteUser });
    return post;
  }

  static async downvotePost({ author, postId }) {
    const post = await PostModel.findOneAndUpdate({ postId }, { $inc: { likeCount: -1 } }, { new: true });
    await PVoteModel.deleteOne({ author, postId });
    return post;
  }
}

export { Post };
