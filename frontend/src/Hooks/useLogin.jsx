import { useState, useContext } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';
import { LoadingContext } from '../Context/LoadingContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const { loadingState, setIsLoadingState } = useContext(LoadingContext);
  console.log(loadingState);

  const login = async (email, password) => {
    setError('');
    setIsLoadingState(true);

    try {
      const response = await fetch('http://localhost:3000/api/users/loginblog', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoadingState(false);
        setError(json.error);
      }

      if (response.ok) {
        localStorage.setItem('userInfo', JSON.stringify(json));
        dispatch({ type: 'LOGIN', payload: json });
        navigate('/');
      }
    } catch (error) {
      console.error('Error during signup:', error.error);
      setIsLoadingState(false);
      setError('An unexpected error occurred.');
    }
    setIsLoadingState(false);
  };

  return { login, error, loadingState };
};
