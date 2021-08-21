import { useRecoilState } from 'recoil';
import { userState } from '@src/recoil/userState';
import { User } from '@src/types/User';
import { AuthAPI } from '@src/apis/authAPI';

const useUserState = () => {
  const [userRecoil, setUserRecoil] = useRecoilState<User>(userState);
  const userDispatch = async (action: { type: string }) => {
    switch (action.type) {
      case 'SAMPLE_LOGIN':
        {
          const { result } = await AuthAPI.getSampleLogin();
          if (result && result.isLoggedIn) {
            const { isLoggedIn, name } = result;
            setUserRecoil({ isLoggedIn, name });
          }
        }
        break;
      case 'CHECK':
        {
          const { result } = await AuthAPI.getCheckLoggedIn();
          if (result && result.isLoggedIn) {
            const { isLoggedIn, name } = result;
            setUserRecoil({ isLoggedIn, name });
          }
        }
        break;
      case 'LOGOUT':
        {
          const result = await AuthAPI.logout();
          if (result) {
            setUserRecoil({ isLoggedIn: false, name: '' });
          }
        }
        break;
      default:
        return;
    }
  };
  return [userRecoil, userDispatch] as const;
};

export default useUserState;
