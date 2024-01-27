import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    localStorage.removeItem('userInfo');
    dispatch({ type: 'LOGOUT' });
  };

  return { logout };
};

export default useLogout;
