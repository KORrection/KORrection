import { atom } from 'recoil';
import { Cookies } from 'react-cookie';

import { IProfile } from 'types/user';

const cookies = new Cookies();

export const userLoginState = atom({
  key: '#userLoginState',
  default: !!cookies.get('token'),
});

const INITIAL_USER_STATE = {
  userObjId: '',
  description: '',
  nickname: '',
  profilePicture: '',
  userEmail: '',
};

export const currentUserState = atom<IProfile>({
  key: '#currentUserState',
  default: INITIAL_USER_STATE,
});
