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
      .populate('comments')
      .populate({ path: 'authorObjId', select: ['nickname', 'profilePicture'] });
  }

  static async updatePost({ postId, category, title, content }) {
    return await PostModel.findOneAndUpdate({ postId }, { $set: { category, title, content } }, { new: true });
  }

  static async deletePost({ postId }, { session }) {
    if (session !== undefined) {
      return await PostModel.deleteOne({ postId }).session(session);
    }
    return await PostModel.deleteOne({ postId });
  }

  static async plusOneToLikeCount({ postObjId }) {
    return await PostModel.findOneAndUpdate({ _id: postObjId }, { $inc: { likeCount: 1 } }, { new: true });
  }
}
export { Post };
