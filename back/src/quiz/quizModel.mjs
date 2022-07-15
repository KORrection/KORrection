import { quizModel } from './quizSchema.mjs';

export class Quiz {
  static async create(userQuiz) {
    const newUserQuiz = await quizModel.create(userQuiz);
    return newUserQuiz;
  }

  static async update({ userId, updates }, session) {
    const updatedUserQuiz = await quizModel
      .findOneAndUpdate({ userId }, updates, { returnOriginal: false, session })
      .lean();
    return updatedUserQuiz;
  }

  static async findByUserId({ userId }) {
    const UserQuiz = await quizModel.findOne({ userId }).lean();
    return UserQuiz;
  }

  static async delete({ userId }, session) {
    const deletedResult = await quizModel.deleteOne({ userId }).session(session);
    return deletedResult;
  }
}
