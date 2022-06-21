import jwt from 'jsonwebtoken';

function login_required(req, res, next) {
  const userToken = req.cookies['token'] ?? 'null';
  // 토큰이 "null" 일 경우, login_required 가 필요한 서비스 사용을 제한
  if (userToken === 'null') {
    res.status(400).send('로그인한 유저만 사용할 수 있는 서비스입니다.');
    return;
  }

  // 해당 token 이 정상적인 token인지 확인 -> 토큰에 담긴 user_id 정보 추출
  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const jwtDecoded = jwt.verify(userToken, secretKey);
    const user_id = jwtDecoded.userId;
    //이해하기 쉽게 함수로 ?
    req.currentUserId = user_id;
    next();
  } catch (error) {
    res.status(400).send('정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.');
    return;
  }
}

export { login_required };
