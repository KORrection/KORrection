import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
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
    accessType: 'offline',
    approvalPrompt: 'force',
  })
);

// callback url upon successful google authentication
userRouter.get('/google/callback/', passport.authenticate('google', { session: false }), (req, res) => {
  Auth.signToken(req, res);
});

// userRouter.get('/verify', Auth.checkTokenMW, (req, res) => {
//   Auth.verifyToken(req, res);
//   if (null === req.authData) {
//     res.sendStatus(403);
//   } else {
//     res.json(req.authData);
//   }
// });
userRouter.get('/asd', login_required, (req, res) => {
  res.send('OK');
});

userRouter.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

export { userRouter };
