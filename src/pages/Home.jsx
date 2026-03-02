import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Home = () => {
  const { theme } = useAppContext();
  const navigate = useNavigate();

  const features = [
    {
      title: '📋 Advanced Task Management',
      description: 'Create, manage, and track tasks with priorities, categories, deadlines, and descriptions',
      icon: '✨'
    },
    {
      title: '🔍 Smart Search & Filter',
      description: 'Search tasks by title, filter by status, priority, and category with smart sorting',
      icon: '🎯'
    },
    {
      title: '✏️ Task Editing',
      description: 'Edit task details, add descriptions, set priorities and deadlines on the fly',
      icon: '🛠️'
    },
    {
      title: '📊 Real-time Analytics',
      description: 'View detailed insights about your task completion with visual progress indicators',
      icon: '📈'
    },
    {
      title: '💾 Auto-save & Persistence',
      description: 'All your tasks are automatically saved to local storage, never lose your data',
      icon: '🔐'
    },
    {
      title: '🎨 Dark & Light Themes',
      description: 'Switch between beautiful light and dark themes for comfortable viewing anytime',
      icon: '🌙'
    },
  ];

  const technologies = [
    { name: 'React 18', icon: '⚛️' },
    { name: 'Redux Toolkit', icon: '🔄' },
    { name: 'React Router', icon: '🗺️' },
    { name: 'React Hot Toast', icon: '🍞' },
    { name: 'Framer Motion', icon: '🎬' },
    { name: 'Vite', icon: '⚡' },
  ];

  return (
    <main>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(135deg, var(--color-primary), #0056b3)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        🚀 Welcome to Task Dashboard Pro
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '3rem', color: 'var(--text-secondary)', maxWidth: '800px' }}>
        An extraordinary task management application built with cutting-edge technologies. Experience seamless productivity with advanced features, stunning UI, and powerful analytics.
      </p>

      <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>✨ Key Features</h2>
      <div className="grid">
        {features.map((feature, index) => (
          <div key={index} className="card" style={{ transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{feature.description}</p>
            <div style={{ fontSize: '2.5rem' }}>{feature.icon}</div>
          </div>
        ))}
      </div>

      <div style={{ 
        textAlign: 'center', 
        padding: '3rem 2rem', 
        background: 'linear-gradient(135deg, var(--bg-secondary) 0%, transparent 100%)',
        border: '2px solid var(--border-color)',
        borderRadius: '12px',
        marginTop: '3rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>🎯 Get Started Now</h2>
        <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Head over to the Reports section to start managing your tasks with superpowers!
        </p>
        <button 
          className="btn-primary"
          onClick={() => navigate('/reports')}
          style={{ fontSize: '1.1rem', padding: '0.875rem 2rem' }}
        >
          Go to Reports →
        </button>
      </div>

      <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
        <h2 style={{ marginBottom: '2rem', fontSize: '1.75rem' }}>🛠️ Built With Modern Technologies</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1.5rem'
        }}>
          {technologies.map((tech, idx) => (
            <div key={idx} style={{
              padding: '1.5rem',
              background: 'linear-gradient(135deg, var(--bg-secondary) 0%, transparent 100%)',
              borderRadius: '8px',
              border: '2px solid var(--border-color)',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-primary)';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{tech.icon}</div>
              <strong style={{ color: 'var(--text-primary)' }}>{tech.name}</strong>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem' }}>📋 Features Included</h2>
        <div style={{
          columnCount: { xs: 1, sm: 1, md: 2 },
          columnGap: '2rem'
        }}>
          <ul style={{ marginLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: '2' }}>
            <li style={{ marginBottom: '0.75rem' }}>✅ React Router for seamless navigation</li>
            <li style={{ marginBottom: '0.75rem' }}>✅ Redux Toolkit for powerful state management</li>
            <li style={{ marginBottom: '0.75rem' }}>✅ Context API for theme management</li>
            <li style={{ marginBottom: '0.75rem' }}>✅ useMemo for performance optimization</li>
            <li style={{ marginBottom: '0.75rem' }}>✅ React Hot Toast for notifications</li>
            <li style={{ marginBottom: '0.75rem' }}>✅ Local storage persistence</li>
            <li style={{ marginBottom: '0.75rem' }}>✅ Search & advanced filtering</li>
            <li style={{ marginBottom: '0.75rem' }}>✅ Task priorities and categories</li>
            <li style={{ marginBottom: '0.75rem' }}>✅ Task deadlines and metadata</li>
            <li style={{ marginBottom: '0.75rem' }}>✅ Task editing capabilities</li>
            <li style={{ marginBottom: '0.75rem' }}>✅ Responsive design for all devices</li>
            <li style={{ marginBottom: '0.75rem' }}>✅ Light and dark theme support</li>
            <li style={{ marginBottom: '0.75rem' }}>✅ Smooth animations & transitions</li>
            <li style={{ marginBottom: '0.75rem' }}>✅ Completion tracking & analytics</li>
          </ul>
        </div>
      </div>

      <div style={{ 
        textAlign: 'center', 
        padding: '2rem', 
        marginTop: '3rem',
        background: 'linear-gradient(135deg, rgba(0,123,255,0.1) 0%, rgba(40,167,69,0.1) 100%)',
        borderRadius: '12px',
        border: '2px solid var(--border-color)'
      }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          🌟 Made with ❤️ for productivity lovers | Version 2.0
        </p>
      </div>
    </main>
  );
};

export default Home;
