import { jwtDecode } from 'jwt-decode';
import { createContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogout from '../Hooks/useLogout';

export const AuthContext = createContext();

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    }
    case 'LOGOUT': {
      return {
        user: null,
        isAuthenticated: false,
      };
    }
    default: {
      return state;
    }
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    if (!token) return;
    const exp = token.exp;
    if (Date.now() >= exp * 1000) {
      dispatch({ type: 'LOGOUT' });
      return;
    }
    const decodeUser = jwtDecode(token);
    if (decodeUser) {
      dispatch({ type: 'LOGIN', payload: decodeUser });
    }
  }, []);

  console.log('AuthContext: ', state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
