import pkg from 'mongoose';
import { nanoid } from 'nanoid';

const { Schema, model } = pkg;

const gecClientSchema = new Schema(
  {
    taskId: {
      type: String,
      required: true,
      default: () => {
        const id = nanoid();
        return `[t]${id}`;
      },
    },
    userObjId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sentences: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const gecClientModel = model('gecClient', gecClientSchema);
export { gecClientModel };
