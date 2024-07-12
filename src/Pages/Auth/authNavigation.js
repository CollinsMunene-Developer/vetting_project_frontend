// authNavigation.js
import { useNavigate } from 'react-router-dom';

export const useAuthNavigation = () => {
  const navigate = useNavigate();

  const goToLogin = () => navigate('/login');
  const goToRegister = () => navigate('/register');
  const goToResetPassword = () => navigate('/reset-password');

  return {
    goToLogin,
    goToRegister,
    goToResetPassword,
  };
};

export const handleAuthNavigation = (isAuthenticated, isRegistered) => {
  const { goToLogin, goToRegister } = useAuthNavigation();

  if (isAuthenticated) {
    // Navigate to the main app or dashboard
    navigate('/dashboard');
  } else if (isRegistered) {
    goToLogin();
  } else {
    goToRegister();
  }
};