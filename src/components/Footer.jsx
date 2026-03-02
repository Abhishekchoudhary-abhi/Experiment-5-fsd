import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {currentYear} Task Dashboard - Experiment 5</p>
      <p>Built with React, Vite, Redux Toolkit, and React Router</p>
    </footer>
  );
};

export default Footer;
