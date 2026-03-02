import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppContext } from '../context/AppContext';

const Analytics = () => {
  const { theme } = useAppContext();
  const tasks = useSelector(state => state.tasks.tasks);

  // Use useMemo to calculate analytics data
  const analytics = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
    
    // Priority breakdown
    const highPriority = tasks.filter(t => t.priority === 'high').length;
    const mediumPriority = tasks.filter(t => t.priority === 'medium').length;
    const lowPriority = tasks.filter(t => t.priority === 'low').length;
    
    // Category breakdown
    const categories = {};
    tasks.forEach(task => {
      const cat = task.category || 'general';
      categories[cat] = (categories[cat] || 0) + 1;
    });

    // Overdue tasks
    const overdueTasks = tasks.filter(t => 
      t.deadline && new Date(t.deadline) < new Date() && !t.completed
    ).length;

    // Tasks by completion
    const completedHighPriority = tasks.filter(t => t.completed && t.priority === 'high').length;

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      completionRate,
      highPriority,
      mediumPriority,
      lowPriority,
      categories,
      overdueTasks,
      completedHighPriority,
    };
  }, [tasks]);

  const getPriorityPercentage = (priority) => {
    if (analytics.totalTasks === 0) return 0;
    const count = analytics[`${priority}Priority`] || 0;
    return Math.round((count / analytics.totalTasks) * 100);
  };

  return (
    <main>
      <h1>📊 Analytics Dashboard</h1>
      <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        Real-time analytics and insights about your task completion and productivity
      </p>

      {/* Summary Cards */}
      <div className="grid">
        <div className="summary-card">
          <h3>Total Tasks</h3>
          <div className="number">{analytics.totalTasks}</div>
        </div>
        <div className="summary-card success">
          <h3>✅ Completed</h3>
          <div className="number">{analytics.completedTasks}</div>
        </div>
        <div className="summary-card warning">
          <h3>📌 Pending</h3>
          <div className="number">{analytics.pendingTasks}</div>
        </div>
        <div className="summary-card danger">
          <h3>🔥 Completion Rate</h3>
          <div className="number">{analytics.completionRate}%</div>
        </div>
      </div>

      {/* Main Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="stat-item success">
          <span className="label">🏆 High Priority Completed</span>
          <span className="value">{analytics.completedHighPriority}/{analytics.highPriority}</span>
        </div>
        <div className="stat-item danger">
          <span className="label">⏰ Overdue Tasks</span>
          <span className="value">{analytics.overdueTasks}</span>
        </div>
        <div className="stat-item warning">
          <span className="label">📊 Average Completion</span>
          <span className="value">{analytics.completionRate}%</span>
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h2>📈 Detailed Statistics</h2>
        
        {analytics.totalTasks === 0 ? (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
            No tasks yet. Add some tasks to see analytics!
          </p>
        ) : (
          <div style={{ marginTop: '2rem' }}>
            {/* Completion Progress */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <strong style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>Overall Completion Progress</strong>
                <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-success)' }}>
                  {analytics.completedTasks}/{analytics.totalTasks}
                </span>
              </div>
              <div style={{
                background: 'var(--border-color)',
                height: '28px',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <div style={{
                  background: 'linear-gradient(90deg, #28a745 0%, #20c997 100%)',
                  height: '100%',
                  width: `${analytics.completionRate}%`,
                  transition: 'width 0.6s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: '1rem',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  {analytics.completionRate > 5 && `${analytics.completionRate}%`}
                </div>
              </div>
            </div>

            {/* Priority Distribution */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>🎯 Priority Distribution</h3>
              
              {/* High Priority */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <strong>🔴 High Priority</strong>
                  <span style={{ color: 'var(--color-danger)', fontWeight: 'bold' }}>
                    {analytics.highPriority} tasks ({getPriorityPercentage('high')}%)
                  </span>
                </div>
                <div style={{
                  background: 'var(--border-color)',
                  height: '20px',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    background: 'var(--color-danger)',
                    height: '100%',
                    width: `${getPriorityPercentage('high')}%`,
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
              </div>

              {/* Medium Priority */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <strong>🟡 Medium Priority</strong>
                  <span style={{ color: 'var(--color-warning)', fontWeight: 'bold' }}>
                    {analytics.mediumPriority} tasks ({getPriorityPercentage('medium')}%)
                  </span>
                </div>
                <div style={{
                  background: 'var(--border-color)',
                  height: '20px',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    background: 'var(--color-warning)',
                    height: '100%',
                    width: `${getPriorityPercentage('medium')}%`,
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
              </div>

              {/* Low Priority */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <strong>🟢 Low Priority</strong>
                  <span style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>
                    {analytics.lowPriority} tasks ({getPriorityPercentage('low')}%)
                  </span>
                </div>
                <div style={{
                  background: 'var(--border-color)',
                  height: '20px',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    background: 'var(--color-success)',
                    height: '100%',
                    width: `${getPriorityPercentage('low')}%`,
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            {Object.keys(analytics.categories).length > 0 && (
              <div>
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>📁 Category Breakdown</h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '1rem'
                }}>
                  {Object.entries(analytics.categories).map(([category, count]) => (
                    <div 
                      key={category}
                      style={{
                        padding: '1.25rem',
                        background: 'linear-gradient(135deg, var(--bg-secondary) 0%, transparent 100%)',
                        borderRadius: '8px',
                        border: '2px solid var(--border-color)',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-primary)';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <strong style={{ color: 'var(--text-primary)' }}>{category}</strong>
                      <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--color-primary)', marginTop: '0.5rem' }}>
                        {count}
                      </div>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {Math.round((count / analytics.totalTasks) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Insights */}
      {analytics.totalTasks > 0 && (
        <div className="card" style={{ marginTop: '2rem', background: 'linear-gradient(135deg, var(--bg-secondary) 0%, transparent 100%)' }}>
          <h2>💡 Insights & Recommendations</h2>
          <div style={{ marginTop: '1.5rem' }}>
            {analytics.completionRate === 100 ? (
              <div style={{ padding: '1rem', background: 'rgba(40, 167, 69, 0.1)', borderRadius: '8px', borderLeft: '4px solid var(--color-success)', marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--color-success)' }}>🎉 Amazing! All tasks completed!</strong>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>You're doing great! Keep up the momentum.</p>
              </div>
            ) : (
              <>
                {analytics.completionRate >= 75 ? (
                  <div style={{ padding: '1rem', background: 'rgba(40, 167, 69, 0.1)', borderRadius: '8px', borderLeft: '4px solid var(--color-success)', marginBottom: '1rem' }}>
                    <strong style={{ color: 'var(--color-success)' }}>✨ Excellent progress!</strong>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>You're on track with {analytics.completionRate}% completion rate.</p>
                  </div>
                ) : (
                  <div style={{ padding: '1rem', background: 'rgba(255, 193, 7, 0.1)', borderRadius: '8px', borderLeft: '4px solid var(--color-warning)', marginBottom: '1rem' }}>
                    <strong style={{ color: 'var(--color-warning)' }}>📌 Keep pushing forward!</strong>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>You've completed {analytics.completedTasks} out of {analytics.totalTasks} tasks. {analytics.pendingTasks} more to go!</p>
                  </div>
                )}
              </>
            )}

            {analytics.overdueTasks > 0 && (
              <div style={{ padding: '1rem', background: 'rgba(220, 53, 69, 0.1)', borderRadius: '8px', borderLeft: '4px solid var(--color-danger)', marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--color-danger)' }}>⏰ {analytics.overdueTasks} task(s) overdue</strong>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Consider prioritizing these tasks to get back on schedule.</p>
              </div>
            )}

            {analytics.highPriority > 0 && analytics.completedHighPriority < analytics.highPriority && (
              <div style={{ padding: '1rem', background: 'rgba(220, 53, 69, 0.1)', borderRadius: '8px', borderLeft: '4px solid var(--color-danger)' }}>
                <strong style={{ color: 'var(--color-danger)' }}>🔴 {analytics.highPriority - analytics.completedHighPriority} high-priority task(s) pending</strong>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Focus on completing these important tasks first.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Analytics;
