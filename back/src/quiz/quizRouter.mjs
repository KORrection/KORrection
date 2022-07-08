import { Router } from 'express';
import { login_required } from '../middleware/login_required.mjs';
import { quizService } from "./quizService.mjs";

const quizRouter = Router();

quizRouter.get('/quizz', login_required, async function (req, res, next) {
  try {
    userId = req.currentUserId;
    const userQuiz = await quizService.getQuiz({ userId });
    if(userQuiz.status === false){
        throw new Error(userQuiz.message);
    }
    res.status(200).json({
        status: 'success',
        payload: userQuiz.payload,
    })
  } catch (err) {
    next(err);
  }
});

quizRouter.put('/quizz', login_required, async function (req, res, next) {
    try{
        userId = req.currentUserId;
        const userQuiz = await quizService.addOrSetQuiz({ userId });
        if(userQuiz.status === false){
            throw new Error(userQuiz.message);
        }
        res.status(201).json({
            status: 'success',
            payload: userQuiz.payload,
        })
    } catch(err) {
        next(err);
    }
});

export { quizRouter };

//여유가 생기면 구현예정
