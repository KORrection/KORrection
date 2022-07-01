import { User } from '../user/userModel.mjs';
import jwt from 'jsonwebtoken';

const signToken = (req, res) => {
  jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '120 min' }, (err, token) => {
    if (err) {
      res.status(500);
    } else {
      res.cookie('token', token);
      res.redirect(process.env.MAIN_URL); // 나중에 프론트에서 호출하게되면 뺄예정
    }
  });
};

export default { signToken };
