import { API_BASE_URL } from '@src/constants/config';

async function getCheckLoggedIn() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/check`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    if (res.ok) {
      return res.json();
    }
  } catch (error) {
    console.log(error);
  }
}

const logout = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return res.ok;
  } catch (error) {
    console.error(error);
  }
};

export const AuthAPI = {
  getCheckLoggedIn,
  logout,
};
