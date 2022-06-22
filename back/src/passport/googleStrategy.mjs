import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../user/userModel.mjs';
import dotenv from 'dotenv';

dotenv.config();

export default () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: '/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const email = profile.emails[0].value;

        const currentUser = await User.findByEmail({ email });

        if (currentUser) {
          return done(null, currentUser);
        } else {
          const newUser = await User.create({
            email,
            Id: profile.id,
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
