import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (Component) => (props) => {
  const token = JSON.parse(localStorage.getItem('user'))?.token;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  return token ? <Component {...props} /> : null;
};

export default withAuth;
