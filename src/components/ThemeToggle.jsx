import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(AppContext);

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      title={`Switch to ${theme === 'light-theme' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light-theme' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;
