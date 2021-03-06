import pkg from 'mongoose';
const { model, Schema } = pkg;

const quizSchema = new Schema(
  {
    idx: { type: Number, default: 0, required: false },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

export const quizModel = model('Quiz', quizSchema);
