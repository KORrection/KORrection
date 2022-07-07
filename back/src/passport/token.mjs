import { User } from '../user/userModel.mjs';
import jwt from 'jsonwebtoken';

const signToken = (req, res) => {
  jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '120 min' }, (err, token) => {
    if (err) {
      res.status(500);
    } else {
      res.cookie('token', token);
      res.redirect('http://localhost:3000');
    }
  });
};

export default { signToken };
