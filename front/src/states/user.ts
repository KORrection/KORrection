import { atom } from 'recoil';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const userLoginState = atom({
  key: '#userLoginState',
  default: !!cookies.get('token'),
});
