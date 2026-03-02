import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { theme } = useContext(AppContext);

  return (
    <nav>
      <div className="nav-container">
        <Link to="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.75rem' }}>🚀</span>
          <span>Task Dashboard Pro</span>
        </Link>
        <ul className="nav-menu">
          <li>
            <Link to="/" style={{ transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}>
              🏠 Home
            </Link>
          </li>
          <li>
            <Link to="/projects" style={{ transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}>
              📂 Projects
            </Link>
          </li>
          <li>
            <Link to="/analytics" style={{ transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}>
              📊 Analytics
            </Link>
          </li>
          <li>
            <Link to="/reports" style={{ transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}>
              📋 Reports
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
