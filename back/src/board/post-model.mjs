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

  static async findById({ shortId }) {
    return await PostModel.findOne({ shortId });
  }
}

export { Post };
