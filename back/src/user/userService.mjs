import { User } from './userModel.mjs';
import jwt from 'jsonwebtoken';

// check if Token exists on request Header and attach token to request as attribute
const checkTokenMW = (req, res, next) => {
  // Get auth header value
  const userToken = req.headers['authorization'];

  if (typeof userToken !== 'undefined') {
    req.token = userToken.split(' ')[1];
    next();
  } else {
    res.sendStatus(403);
  }
};

// Verify Token validity and attach token data as request attribute
// const verifyToken = (req, res) => {
//   jwt.verify(req.token, 'secretkey', (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       return (req.authData = authData);
//     }
//   });
// };

// Issue Token
const signToken = (req, res) => {
  jwt.sign({ userId: req.user._id }, 'secretkey', { expiresIn: '5 min' }, (err, token) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.cookie('cookie', token);
      res.redirect('/');
    }
  });
};

export default { checkTokenMW, signToken };
