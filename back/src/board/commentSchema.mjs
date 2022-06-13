import pkg from 'mongoose';
const { Schema, model } = pkg;

const CommentSchema = new Schema(
  {
    // commentId는 mongoDB자체Id 사용?
    postId: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    like: {
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
 *       - postId
 *       - author
 *       - comment
 *       - like
 *       - isDeleted
 *       - createdAt
 *       - updatedAt
 *     properties:
 *       _id:
 *         type: string
 *       postId:
 *         type: string
 *       author:
 *         type: string
 *       comment:
 *         type: string
 *       like:
 *         type: number
 *       isDeleted:
 *         type: boolean
 *       createdAt:
 *         type: string
 *       updatedAt:
 *         type: string
 */
