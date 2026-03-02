import React from 'react';
import { useAppContext } from '../context/AppContext';

const Projects = () => {
  const { theme } = useAppContext();

  const projects = [
    {
      id: 1,
      name: 'Web Dashboard',
      description: 'A comprehensive dashboard for analytics and reporting',
      status: 'In Progress',
      progress: 75,
      team: ['Alice', 'Bob', 'Charlie'],
    },
    {
      id: 2,
      name: 'Mobile App',
      description: 'Cross-platform mobile application for task management',
      status: 'Planning',
      progress: 25,
      team: ['David', 'Eve'],
    },
    {
      id: 3,
      name: 'API Integration',
      description: 'RESTful API for backend services',
      status: 'Completed',
      progress: 100,
      team: ['Frank', 'Grace', 'Henry'],
    },
    {
      id: 4,
      name: 'Documentation',
      description: 'Comprehensive documentation and user guides',
      status: 'In Progress',
      progress: 60,
      team: ['Isaac', 'Julia'],
    },
  ];

  return (
    <main>
      <h1>Projects</h1>
      <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        Here are all the projects currently in development
      </p>

      <div className="grid">
        {projects.map((project) => (
          <div key={project.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>{project.name}</h3>
              <span style={{
                background: project.status === 'Completed' ? 'var(--color-success)' :
                           project.status === 'In Progress' ? 'var(--color-primary)' :
                           'var(--color-warning)',
                color: project.status === 'Planning' ? '#212529' : 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: 'bold'
              }}>
                {project.status}
              </span>
            </div>

            <p style={{ marginBottom: '1rem' }}>{project.description}</p>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{
                background: 'var(--border-color)',
                height: '8px',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  background: project.status === 'Completed' ? 'var(--color-success)' : 'var(--color-primary)',
                  height: '100%',
                  width: `${project.progress}%`,
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {project.progress}% Complete
              </span>
            </div>

            <div>
              <strong style={{ color: 'var(--text-primary)' }}>Team Members:</strong>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                {project.team.map((member, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: 'var(--color-primary)',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.875rem'
                    }}
                  >
                    {member}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Projects;
