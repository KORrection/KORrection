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

  static async findPost({ shortId }) {
    return await PostModel.findOne({ shortId });
  }

  static async updatePost({ shortId, category, title, content }) {
    return await PostModel.updateOne({ shortId }, { category, title, content });
  }

  static async deletePost({ shortId }) {
    return await PostModel.deleteOne({ shortId });
  }

  static async likePost({ shortId }) {
    return await PostModel.findOneAndUpdate({ shortId }, { $inc: { likeCount: 1 } }, { returnDocument: 'after' });
  }

  static async undoLikePost({ shortId }) {
    return await PostModel.findOneAndUpdate({ shortId }, { $inc: { likeCount: -1 } }, { returnDocument: 'after' });
  }
}

export { Post };
