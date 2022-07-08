import { quizModel } from "./quizSchema.mjs";

export class Quiz {
    static async create(userQuiz){
        newUserQuiz = await quizModel.create(userQuiz);
        return newUserQuiz;
    }

    static async update({ userId, updates}, session){
        updatedUserQuiz = await quizModel.findOneAndUpdate({ userId }, updates, { returnOriginal: false, session }).lean();
        return updatedUserQuiz;
    }

    static async findByUserId({ userId }){
        UserQuiz = await quizModel.findOne({ userId }).lean();
        return UserQuiz;
    }

    static async delete({ userId }, session){
        deletedResult = await quizModel.deleteOne({ userId }).session(session);
        return deletedResult;
    }
}


