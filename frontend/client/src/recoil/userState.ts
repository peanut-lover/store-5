import { User } from '@src/types/User';
import { atom } from 'recoil';

export const userState = atom<User>({
  key: 'userState',
  default: {
    isLoggedIn: false,
    name: '',
    profileImgUrl: null,
    id: 0,
    createdAt: '',
  },
});
