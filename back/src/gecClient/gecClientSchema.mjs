import pkg from 'mongoose';
const { Schema, model } = pkg;

const gecClientSchema = new Schema(
  {
    taskId: {
      type: 'string',
      required: true,
    },
    userObjId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const gecClientModel = model('gecClient', gecClientSchema);
export { gecClientModel };
