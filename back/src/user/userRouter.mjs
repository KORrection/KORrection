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

userRouter.get('/google/callback/', passport.authenticate('google', { session: false }), (req, res) => {
  Auth.signToken(req, res);
});

userRouter.get('/logout', (req, res) => {
  req.logout();
  res.clearCookie('token');
  res.redirect('http://localhost:3000');
});

userRouter.get('/users', login_required, async function (req, res, next) {
  try {
    // 전체 사용자 목록을 얻음
    const users = await userService.getUsers();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

userRouter.put('/users/:id', async function (req, res, next) {
  try {
    const user_id = req.params.id;

    const nickname = req.body.nickname ?? null;
    const description = req.body.description ?? null;

    const toUpdate = { nickname, description };

    const updatedUser = await userService.setUser({ user_id, toUpdate });

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

userRouter.post('/profile/:id', upload.single('image'), async (req, res, next) => {
  try {
    const user_id = req.params.id;

    const profilePicture = req.file.key ?? null;
    const toUpdate = { profilePicture };

    const updatedUser = await userService.fileUpload({ user_id, toUpdate });

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }
    res.status(200).json(updatedUser);
    console.log(updatedUser);
  } catch (error) {
    next(error);
  }
});

export { userRouter };
