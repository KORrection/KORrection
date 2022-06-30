import { Router } from 'express';
import passport from 'passport';
import Auth from '../passport/token.mjs';
import { login_required } from '../middleware/login_required.mjs';
import { userService } from '../user/userService.mjs';
import { questions } from './quizData.mjs';

const quizRouter = Router();

quizRouter.get('/quiz', login_required, async function (req, res, next) {
  try {
    
  } catch (error) {
    next(error);
  }
});

export { quizRouter };
