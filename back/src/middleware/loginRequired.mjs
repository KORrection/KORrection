import jwt from 'jsonwebtoken';

function loginRequired(req, res, next) {
  const userToken = req.cookies['token'] ?? 'null';
  if (userToken === 'null') {
    res.status(401).send('로그인한 유저만 사용할 수 있는 서비스입니다.');
    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const jwtDecoded = jwt.verify(userToken, secretKey);
    const userId = jwtDecoded.userId;
    req.currentUserId = userId;
    next();
  } catch (error) {
    res.status(400).send('정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.');
    return;
  }
}

export { loginRequired };
