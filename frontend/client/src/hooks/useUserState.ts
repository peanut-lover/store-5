import { useRecoilState } from 'recoil';
import { userState } from '@src/recoil/userState';
import { User } from '@src/types/User';
import { AuthAPI } from '@src/apis/authAPI';

const useUserState = () => {
  const [userRecoil, setUserRecoil] = useRecoilState<User>(userState);
  const userDispatch = async (action: { type: string }) => {
    switch (action.type) {
      case 'SAMPLE_LOGIN':
        const res1 = await AuthAPI.getSampleLogin();
        if (res1) {
          const { isLoggedIn, name } = res1;
          setUserRecoil({ isLoggedIn, name });
        }
        break;
      case 'CHECK':
        const res2 = await AuthAPI.getCheckLoggedIn();
        if (res2) {
          const { isLoggedIn, name } = res2;
          setUserRecoil({ isLoggedIn, name });
        }
        break;
      case 'LOGOUT':
        const res3 = await AuthAPI.logout();
        if (res3) {
          setUserRecoil({ isLoggedIn: false, name: '' });
        }
        break;
      default:
        return;
    }
  };
  return [userRecoil, userDispatch] as const;
};

export default useUserState;
