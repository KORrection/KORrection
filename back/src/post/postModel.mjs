import { PostModel } from './postSchema.mjs';

class Post {
  static async createPost({ category, authorObjId, title, content }) {
    const newPost = await PostModel.create({ category, authorObjId, title, content });
    return newPost;
  }
  static async findAll() {
    return await PostModel.find({}).populate('authorObjId');
  }

  static async findPostById({ postId }) {
    return await PostModel.findOne({ postId })
      .populate({ path: 'comments', populate: { path: 'authorObjId', select: ['nickname', 'profilePicture'] } })
      .populate({ path: 'authorObjId', select: ['nickname', 'profilePicture'] });
  }

  static async updatePost({ postId, updates }, session) {
    if (session !== undefined) {
      return await PostModel.findOneAndUpdate({ postId }, { $inc: updates }, { new: true }).session(session);
    }
    return await PostModel.findOneAndUpdate({ postId }, { $set: updates }, { new: true });
  }

  static async deletePost({ postId }, { session }) {
    if (session !== undefined) {
      return await PostModel.deleteOne({ postId }).session(session);
    }
    return await PostModel.deleteOne({ postId });
  }
}
export { Post };
