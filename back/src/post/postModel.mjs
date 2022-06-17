// * (3) database layer (model)
import { PostModel } from './postSchema.mjs';

class Post {
  static async createPost({ category, author, title, content }) {
    const newPost = await PostModel.create({ category, author, title, content });
    return newPost;
  }
  static async findAll() {
    return await PostModel.find({});
  }

  static async findPost({ postId }) {
    return await PostModel.findOne({ postId });
  }

  static async updatePost({ postId, category, title, content }) {
    return await PostModel.findOneAndUpdate({ postId }, { category, title, content }, { returnDocument: 'after' });
  }

  static async deletePost({ postId }) {
    return await PostModel.deleteOne({ postId });
  }

  static async likePost({ postId }) {
    return await PostModel.findOneAndUpdate({ postId }, { $inc: { likeCount: 1 } }, { returnDocument: 'after' });
  }

  static async undoLikePost({ postId }) {
    return await PostModel.findOneAndUpdate({ postId }, { $inc: { likeCount: -1 } }, { returnDocument: 'after' });
  }
}

export { Post };
