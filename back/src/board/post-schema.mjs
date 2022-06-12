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
    likes: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const PostModel = model('post', PostSchema);
export { PostModel };
