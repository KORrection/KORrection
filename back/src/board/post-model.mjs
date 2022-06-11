// * (3) database layer (model)
import { PostModel } from './post-schema.mjs';

class Post {
  static async createPost({ shortId, category, author, title, content, likes }) {
    const newPost = await PostModel.create({ shortId, category, author, title, content, likes });
    return newPost;
  }
  static async findAll() {
    return await PostModel.find({});
  }

  static async findById({ shortId }) {
    return await PostModel.findOne({ shortid: shortId });
  }
}

export { Post };
