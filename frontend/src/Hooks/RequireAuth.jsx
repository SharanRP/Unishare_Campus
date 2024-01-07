import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function RequireAuth({ children, redirectTo }) {
  const token = JSON.parse(localStorage.getItem('user'))?.token;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  return token ? children : <Navigate to={redirectTo} />;
}

export default RequireAuth;
