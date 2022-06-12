// * (3) database layer (model)
import { PostModel } from './post-schema.mjs';

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
}

export { Post };
