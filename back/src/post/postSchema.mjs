import pkg from 'mongoose';
const { Schema, model } = pkg;
import { nanoid } from 'nanoid';

const PostSchema = new Schema(
  {
    postId: {
      type: String,
      default: () => {
        return nanoid();
      },
      required: true,
      index: true,
    },
    category: {
      type: String,
      default: '자유',
    },
    authorObjId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likeCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

PostSchema.virtual('comments', {
  ref: 'comment',
  localField: '_id',
  foreignField: 'parentPostObjId',
});

PostSchema.virtual('upvotes', {
  ref: 'postVote',
  localField: '_id',
  foreignField: 'postId',
});
const PostModel = model('post', PostSchema);
export { PostModel };

/**
 * @swagger
 * definitions:
 *   Post:
 *     type: object
 *     required:
 *       - _id
 *       - postId
 *       - authorId
 *       - authorName
 *       - category
 *       - title
 *       - content
 *       - like
 *       - createdAt
 *       - updatedAt
 *     properties:
 *       _id:
 *         type: string
 *       postId:
 *         type: string
 *       authorId:
 *         type: string
 *       authorName:
 *         type: string
 *       category:
 *         type: string
 *       title:
 *         type: string
 *       content:
 *         type: string
 *       likeCount:
 *         type: number
 *       createdAt:
 *         type: string
 *       updatedAt:
 *         type: string
 */
