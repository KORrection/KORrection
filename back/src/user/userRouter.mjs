import { Router } from 'express';
import passport from 'passport';
import Auth from './userService.mjs';
import { login_required } from '../middleware/login_required.mjs';

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

userRouter.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
});

export { userRouter };
