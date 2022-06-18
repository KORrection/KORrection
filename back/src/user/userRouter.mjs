import { Router } from 'express';
import passport from 'passport';
import Auth from '../middleware/utils.mjs';
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

userRouter.get('/userlist', login_required, async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.status(200).send(users);
  } catch (err) {
    next(err);
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

// userRouter.post('/profile', upload.single('image'), async (req, res) => {
//   console.log(2);
//   console.log(req.file);
//   await req.user.update({ profilePicture: req.file.location });
//   console.log(req.file.location);
//   res.status(200).json(req.file);
// });

// userRouter.post('/profile/:id', upload.single('image'), login_required, async (req, res, next) => {
//   try {
//     const user_id = req.params.id;

//     const profileUrl = req.body.profilePicture;
//     const toUpdate = { profileUrl };

//     const updatedurl = await userService.setUser({ user_id, toUpdate });

//     res.json(updatedurl);
//   } catch (error) {
//     next(error);
//   }
// });

export { userRouter };
