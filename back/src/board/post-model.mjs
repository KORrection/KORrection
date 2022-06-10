// * (3) database layer (model)
import { PostModel } from './post-schema.mjs';

class Post {
  static async findAll() {
    return await PostModel.find({});
  }

  static async findById({ shortId }) {
    return await PostModel.findOne({ shortid: shortId });
  }
}

export { Post };
