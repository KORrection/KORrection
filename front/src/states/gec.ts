import { atom } from 'recoil';

const tempGecData = `현재 인공지능 서버가 동작하지 않습니다.
예시 문장과 결과를 확인해주시기 바랍니다 :)

------

오랫만에 친구들을 만나서 기분이 조았다.

그럼 며칠뒤에 뵈요!

웨 안돼
`;

export const gecTextState = atom({
  key: '#gecTextState',
  default: tempGecData,
});
