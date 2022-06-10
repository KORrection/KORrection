// * (3) database layer (model)
import { PostModel } from './post-schema.mjs';

class Post {
  static async findAll() {
    return await PostModel.find({});
  }
}

export { Post };
