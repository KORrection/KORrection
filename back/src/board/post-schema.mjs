import pkg from 'mongoose';
const { Schema, model } = pkg;
import { nanoid } from 'nanoid';

const PostSchema = new Schema(
  {
    shortid: {
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
  },
  { timestamps: true }
);

const PostModel = model('post', PostSchema);
export { PostModel };
