import pkg from 'mongoose';
import { nanoid } from 'nanoid';
const { Schema, model } = pkg;

const CommentSchema = new Schema(
  {
    parentPostId: {
      type: String,
      required: true,
    },
    commentId: {
      type: String,
      required: true,
      default: () => {
        const id = nanoid();
        return `[c]${id}`;
      },
    },
    author: {
      type: String,
      required: true,
    },
    commentBody: {
      type: String,
      required: true,
    },
    likeCount: {
      type: Number,
      required: true,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const CommentModel = model('comment', CommentSchema);
export { CommentModel };

/**
 * @swagger
 * definitions:
 *   Comment:
 *     type: object
 *     required:
 *       - _id
 *       - parentPostId
 *       - commentId
 *       - author
 *       - commentBody
 *       - likeCount
 *       - isDeleted
 *       - createdAt
 *       - updatedAt
 *     properties:
 *       _id:
 *         type: string
 *       parentPostId:
 *         type: string
 *       commentId:
 *         type: string
 *       author:
 *         type: string
 *       commentBody:
 *         type: string
 *       likeCount:
 *         type: number
 *       isDeleted:
 *         type: boolean
 *       createdAt:
 *         type: string
 *       updatedAt:
 *         type: string
 */
