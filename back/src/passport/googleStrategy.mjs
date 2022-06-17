import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../user/userModel.mjs';
import dotenv from 'dotenv';

dotenv.config();

export default () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID, // 구글 로그인에서 발급받은 REST API 키
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: '/google/callback', // 구글 로그인 Redirect URI 경로
      },
      async (accessToken, refreshToken, profile, done) => {
        const email = profile.emails[0].value;

        // check if user already exists
        const currentUser = await User.findById({ snsId: profile.id });
        if (currentUser) {
          // already have the user -> return (login)
          return done(null, currentUser);
        } else {
          // register user and return
          const newUser = await new User({ email, snsId: profile.id }).save();
          return done(null, newUser);
        }
      }
    )
  );
};
