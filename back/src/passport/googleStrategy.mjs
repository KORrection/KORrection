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
        clientSecret: process.env.GOOGLE_SECRET, // 구글 로그인에서 발급받은 SECRET 키
        callbackURL: '/google/callback', // 구글 로그인 Redirect URI 경로
      },
      async (accessToken, refreshToken, profile, done) => {
        const email = profile.emails[0].value;
        console.log(profile);

        const currentUser = await User.findById({ email });
        console.log(currentUser);
        if (currentUser) {
          return done(null, currentUser);
        } else {
          const newUser = await User.create({
            email,
            googldId: profile.id,
            nickname: 'null',
            profilePicture: 'null',
            description: 'null',
          });
          return done(null, newUser);
        }
      }
    )
  );
};
