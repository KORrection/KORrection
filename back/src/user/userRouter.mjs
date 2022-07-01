import { Router } from 'express';
import passport from 'passport';
import Auth from '../passport/token.mjs';
import { login_required } from '../middleware/login_required.mjs';
import { userService } from './userService.mjs';
import upload from '../utils/upload.mjs';

const userRouter = Router();

/**
 * @swagger
 * tags:
 *    name: Users
 *    description : 유저 MVP
 */

userRouter.get(
  '/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
  })
);

/**
 * @swagger
 * paths:
 *  /google:
 *   get:
 *    tags: [Users]
 *    summary: 로그인
 */
userRouter.get('/google/callback/', passport.authenticate('google', { session: false }), (req, res) => {
  Auth.signToken(req, res);
});

userRouter.get('/logout', (req, res) => {
  req.logout();
  res.clearCookie('token');
  res.redirect(process.env.MAIN_URL);
});
/**
 * @swagger
 * paths:
 *  /logout:
 *   get:
 *    tags: [Users]
 *    summary: 로그아웃
 */

userRouter.get('/users', login_required, async function (req, res, next) {
  try {
    // 전체 사용자 목록을 얻음
    const users = await userService.getUsers();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

userRouter.get('/userInfo', login_required, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const user = await userService.getUser({ userId });
    res.status(200).send({ user });
  } catch (error) {
    next(error);
  }
});
/**
 * @swagger
 * paths:
 *  /users:
 *   get:
 *    tags: [Users]
 *    summary: 전체 사용자 목록
 */
userRouter.put('/users', login_required, async function (req, res, next) {
  try {
    const userId = req.currentUserId;

    const nickname = req.body.nickname ?? null;
    const description = req.body.description ?? null;

    const toUpdate = { nickname, description };

    const updatedUser = await userService.setUser({ userId, toUpdate });

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * paths:
 *  /users/:id:
 *    put:
 *      tags: [Users]
 *      summary: 닉네임 / 자기소개 변경
 *      parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          properties:
 *            nickname:
 *              type: string
 *            description:
 *              type: string
 *      responses:
 *        200:
 *          description: succ
 *          content:
 *            application/json:
 */

userRouter.post('/profile', login_required, upload.single('image'), async (req, res, next) => {
  try {
    const userId = req.currentUserId;

    const profilePicture = req.file.key ?? null;
    const toUpdate = { profilePicture };

    const updatedUser = await userService.updateProfilePhotoUrl({ userId, toUpdate });

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }
    res.status(200).json(req.file.location);
  } catch (error) {
    next(error);
  }
});


/**
 * @swagger
 * paths:
 *  /profile/:id:
 *    post:
 *      tags: [Users]
 *      summary: 프로필 이미지 변경
 *      parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          properties:
 *            profilePicture:
 *              type: string
 *      responses:
 *        200:
 *          description: succ
 *          content:
 *            application/json:
 */

export { userRouter };
