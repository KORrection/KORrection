import jwt from 'jsonwebtoken';

const jwtToken = {
  sign: (req, res) => {
    jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '120 min' }, (err, token) => {
      if (err) {
        res.status(500);
      } else {
        res.cookie('token', token);
        res.redirect(req.get('Referrer'));
      }
    });
  },
};

export default { jwtToken };
