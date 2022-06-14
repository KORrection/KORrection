import pkg from 'mongoose';
const { Schema, model } = pkg;
import { nanoid } from 'nanoid';

const PostSchema = new Schema(
  {
    shortId: {
      type: String,
      default: () => {
        return nanoid();
      },
      require: true,
      index: true,
    },
    cateory: {
      type: String,
      default: 'free',
    },
    author: {
      type: String,
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
  { timestamps: true }
);

const PostModel = model('post', PostSchema);
export { PostModel };

/**
 * @swagger
 * definitions:
 *   Post:
 *     type: object
 *     required:
 *       - _id
 *       - shortId
 *       - author
 *       - category
 *       - title
 *       - content
 *       - like
 *       - createdAt
 *       - updatedAt
 *     properties:
 *       _id:
 *         type: string
 *       shortId:
 *         type: string
 *       author:
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
