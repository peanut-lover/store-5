import { APIResponse, checkedFetch } from '@src/apis/base';

interface LoginUserInfo {
  isLoggedIn: boolean;
  name: string;
}

async function getCheckLoggedIn(): Promise<APIResponse<LoginUserInfo>> {
  const res = await checkedFetch(`api/auth/check`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
  return res.json();
}

async function getSampleLogin(): Promise<APIResponse<LoginUserInfo>> {
  const res = await checkedFetch(`/api/auth/sample`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
  return res.json();
}

const logout = async (): Promise<boolean> => {
  const res = checkedFetch(`/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  return true;
};

export const AuthAPI = {
  getCheckLoggedIn,
  getSampleLogin,
  logout,
};
