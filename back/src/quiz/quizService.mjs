import { Quiz } from './quizModel.mjs';
import mongoose from 'mongoose';
import { questions } from './quizData.mjs';

export class quizService {
  static async addOrSetQuiz({ userId, idx }) {
    let userQuiz = (await Quiz.findByUserId({ userId })) ?? null;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      if (questions.length <= idx) {
        await session.abortTransaction();
        session.endSession();

        return {
          status: 400,
          message: '400 Error: 퀴즈 배열 데이터의 길이보다 크거나 같은 인덱스는 가질 수 없습니다.',
        };
      }
      if (userQuiz === null) {
        userQuiz = await Quiz.create({ userId });
      } else {
        const updates = { userId, idx };
        userQuiz = await Quiz.update({ userId, updates }, session);
      }
      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
    } finally {
      session.endSession();
    }

    if (userQuiz !== undefined) {
      return { status: 201, payload: userQuiz };
    } else {
      return { status: 500, message: '500 Error: mongoose create or findOneAndUpdate internal error' };
    }
  }

  static async getQuiz({ userId }) {
    const userQuiz = (await Quiz.findByUserId({ userId })) ?? null;
    if (userQuiz === null) {
      return { status: 400, message: '400 Error: 제시한 userId에 해당하는 유저가 존재하지 않습니다.' };
    }

    const idx = userQuiz.idx;
    if (questions.length <= idx) {
      return {
        status: 500,
        message: '500 Error: mongoDB에 저장된 userQuiz의 인덱스가 퀴즈 배열 데이터 길이를 넘습니다.(잘못된 저장)',
      };
    }
    const question = questions[idx];

    return { status: 200, idx, payload: question };
  }

  static async deleteQuiz({ userId }) {
    const userQuiz = (await Quiz.findByUserId({ userId })) ?? null;
    if (userQuiz === null) {
      return { status: false, message: '400 Error: 제시한 userId에 해당하는 유저가 존재하지 않습니다.' };
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    let deletedResult;
    try {
      deletedResult = await Quiz.delete({ userId }, session);
      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
    } finally {
      session.endSession();
    }

    if (deletedResult.deletedCount === 1) return { status: true, message: '게시물이 삭제되었습니다.' };
    else return { status: false, message: '500 Error: mongoose deleteOne internal error' };
  }
}
