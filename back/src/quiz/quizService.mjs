import { Quiz } from "./quizModel.mjs";
import mongoose from "mongoose";
import { questions } from "./quizData.mjs";

export class quizService {
    static async addOrSetQuiz({ userId }){
        userQuiz = await Quiz.findById({ userId }) ?? null;

        const session = await mongoose.startSession();
        session.startTransaction();
        let userQuiz;

        try{
            if(userQuiz === null){
                userQuiz = await Quiz.create({ userId });
            } else {
                nextIdx = userQuiz.idx + 1;
                updates = { userId, idx: nextIdx };
                userQuiz = await Quiz.update({ userId, updates }, session);
            }
            await session.commitTransaction();
        } catch(err){
            await session.abortTransaction();
        } finally{
            session.endSession();
        }

        if(userQuiz !== undefined){
            return { status: true, payload: userQuiz };
        } else {
            return { status: false, message: '500 Error: mongoose create or findOneAndUpdate internal error'};
        }
        
    }

    static async getQuiz({ userId }){
        userQuiz = await Quiz.findById({ userId }) ?? null;
        if(userQuiz === null){
            return { status: false, message: "400 Error: 제시한 userId에 해당하는 유저가 존재하지 않습니다." }
        }

        const idx = userQuiz.idx;
        const question = questions[idx];
        
        return { status: true, payload: question };
    }

    static async deleteQuiz({ userId }){
        userQuiz = await Quiz.findByUserId({ userId }) ?? null;
        if(userQuiz === null){
            return { status: false, message: "400 Error: 제시한 userId에 해당하는 유저가 존재하지 않습니다." }
        }

        const session = await mongoose.startSession();
        session.startTransaction();
        let deletedResult
        try{
            deletedResult = await Quiz.delete({ userId }, session);
            await session.commitTransaction();
        } catch(err){
            await session.abortTransaction();
        } finally{
            session.endSession();
        }
        
        if(deletedCount === 1)
            return { status: true, message: '게시물이 삭제되었습니다.' };
        else
            return { status: false, message: '500 Error: mongoose deleteOne internal error'};
    }

}