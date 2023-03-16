import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';

import { User } from '../user/userModel.mjs';

dotenv.config();

export default () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const email = profile.emails[0].value;
        const nickname = profile.displayName;

        try {
          const currentUser = await User.findByEmail({ email });

          if (currentUser) {
            return done(null, currentUser);
          } else {
            const newUser = await User.create({
              email,
              nickname,
              profilePicture: `https://team16-s3-bucket.s3.ap-northeast-2.amazonaws.com/profile/${
                Math.floor(Math.random() * 4) + 1
              }.png`,
              description: '자신을 소개해줄 메세지를 작성해주세요!',
            });
            return done(null, newUser);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
