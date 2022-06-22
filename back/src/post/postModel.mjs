import { PostModel } from './postSchema.mjs';

class Post {
  static async createPost({ category, authorObjId, title, content }) {
    const newPost = await PostModel.create({ category, authorObjId, title, content });
    return newPost;
  }
  static async findAll() {
    return await PostModel.find({});
  }

  static async findPostById({ postId }) {
    return await PostModel.findOne({ postId })
      .populate('comments')
      .populate({ path: 'authorObjId', select: 'nickname' });
  }

  static async updatePost({ postId, category, title, content }) {
    return await PostModel.findOneAndUpdate({ postId }, { $set: { category, title, content } }, { new: true });
  }

  static async deletePost({ postId }) {
    return await PostModel.deleteOne({ postId });
  }

  static async plusOneToLikeCount({ postObjId }) {
    return await PostModel.findOneAndUpdate({ _id: postObjId }, { $inc: { likeCount: 1 } }, { new: true });
  }
}
export { Post };
