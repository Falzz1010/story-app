const TOKEN_KEY = 'story_app_token';
const USER_KEY = 'story_app_user';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export const getUserInfo = () => {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};
export const setUserInfo = (info) => localStorage.setItem(USER_KEY, JSON.stringify(info));
export const removeUserInfo = () => localStorage.removeItem(USER_KEY);

export const isLoggedIn = () => !!getToken();

export const requireAuth = () => {
  if (!isLoggedIn()) {
    window.location.href = '/login.html';
    return false;
  }
  return true;
};

export const logout = () => {
  removeToken();
  removeUserInfo();
  window.location.href = '/login.html';
};
