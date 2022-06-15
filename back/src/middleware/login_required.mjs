import jwt from 'jsonwebtoken';

function login_required(req, res, next) {
  // request 헤더로부터 authorization bearer 토큰을 받음.
  const userToken = req.headers['cookie'];
  if (typeof userToken !== 'undefined') {
    req.token = userToken.split(' ')[1];
    next();
  } else {
    res.sendStatus(403);
  }

  // 해당 token 이 정상적인 token인지 확인 -> 토큰에 담긴 user_id 정보 추출
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      return (req.authData = authData);
    }
  });
}

export { login_required };
