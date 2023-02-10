import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../user/userModel.mjs';
import dotenv from 'dotenv';
import { server } from '../utils/constants.mjs';

dotenv.config();

export default () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: server.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const email = profile.emails[0].value;

        const currentUser = await User.findByEmail({ email });

        if (currentUser) {
          return done(null, currentUser);
        } else {
          const newUser = await User.create({
            email,
            nickname: 'Anonymous',
            profilePicture: `https://team16-s3-bucket.s3.ap-northeast-2.amazonaws.com/profile/${
              Math.floor(Math.random() * 4) + 1
            }.png`,
            description: '자신을 소개해줄 메세지를 작성해주세요!',
            // socialId: profile.id, 나중에 소셜 로그인을 더 추가하면 비교값이 되는 변수
          });
          return done(null, newUser);
        }
      }
    )
  );
};
