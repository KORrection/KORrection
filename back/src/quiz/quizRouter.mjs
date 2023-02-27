import { Router } from 'express';
import { loginRequired } from '../middleware/loginRequired.mjs';
import { quizService } from './quizService.mjs';
import { questions } from './quizData.mjs';

const quizRouter = Router();
/**
 * @swagger
 * tags:
 *  name: Quiz
 *  description: 유저마다 QUiz 진행사항을 저장하는 Quiz API
 */
/**
 * @swagger
 * paths:
 *  /quizzes:
 *    get:
 *      tags: [Quiz]
 *      summary: get all quizzes
 *      responses:
 *        200:
 *          description: success
 *          content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                      payload:
 *                          type: array
 *                          items:
 *                              $ref: '#/definitions/Quiz'
 */
quizRouter.get('/quizzes', async function (req, res, next) {
  try {
    if (questions.length > 0) {
      res.status(200).json({
        status: 'success',
        payload: questions,
      });
    } else {
      throw new Error('퀴즈 배열 데이터가 없습니다.');
    }
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * paths:
 *  /quiz:
 *    get:
 *      tags: [Quiz]
 *      summary: get user quiz
 *      security:
 *	      - jwt: []
 *      responses:
 *        200:
 *          description: success
 *          content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                      idx:
 *                          type: integer
 *                      payload:
 *                          $ref: '#/definitions/Quiz'
 */
quizRouter.get('/quiz', loginRequired, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const userQuiz = await quizService.getQuiz({ userId });
    if (userQuiz.status >= 400) {
      throw new Error(userQuiz.message);
    }
    res.status(200).json({
      status: 'success',
      idx: userQuiz.idx,
      payload: userQuiz.payload,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * paths:
 *  /quiz:
 *    put:
 *      tags: [Quiz]
 *      summary: update user quiz
 *      security:
 *	      - jwt: []
 *      responses:
 *        200:
 *          description: success
 *          content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                      idx:
 *                          type: integer
 *                      payload:
 *                          $ref: '#/definitions/Quiz'
 */
quizRouter.put('/quiz', loginRequired, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const { idx } = req.body;
    const userQuiz = await quizService.addOrSetQuiz({ userId, idx });
    if (userQuiz.status >= 400) {
      throw new Error(userQuiz.message);
    }
    res.status(201).json({
      status: 'success',
      payload: userQuiz.payload,
    });
  } catch (err) {
    next(err);
  }
});

export { quizRouter };

//여유가 생기면 구현예정
