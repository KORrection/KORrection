import { User } from './userModel.mjs';
import jwt from 'jsonwebtoken';

//Token 생성
const signToken = (req, res) => {
  jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5 min' }, (err, token) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.cookie('token', token);
      res.redirect('/'); // 나중에 프론트에서 호출하게되면 뺄예정
    }
  });
};

export default { signToken };
