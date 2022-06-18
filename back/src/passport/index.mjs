import passport from 'passport';
import { User } from '../user/userModel.mjs';
import google from './googleStrategy.mjs';

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser(async (email, done) => {
    const user = await User.findById({ snsId: email });
    done(null, user);
  });

  google();
};
