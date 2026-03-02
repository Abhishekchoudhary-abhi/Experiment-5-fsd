import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask, toggleTask, deleteTask, clearCompleted } from '../redux/slices/taskSlice';
import TaskCard from '../components/TaskCard';
import SearchFilter from '../components/SearchFilter';
import { useAppContext } from '../context/AppContext';
import { showToast } from '../utils/toastService';

const Reports = () => {
  const { theme } = useAppContext();
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const filter = useSelector(state => state.tasks.filter);
  const sortBy = useSelector(state => state.tasks.sortBy);
  const [taskInput, setTaskInput] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('general');
  const [deadline, setDeadline] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    let result = tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      if (filter === 'all') return matchesSearch;
      if (filter === 'pending') return !task.completed && matchesSearch;
      if (filter === 'completed') return task.completed && matchesSearch;
      if (filter === 'priority-high') return task.priority === 'high' && matchesSearch;
      if (filter === 'priority-medium') return task.priority === 'medium' && matchesSearch;
      if (filter === 'priority-low') return task.priority === 'low' && matchesSearch;
      return matchesSearch;
    });

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityMap = { high: 0, medium: 1, low: 2 };
        return priorityMap[a.priority || 'low'] - priorityMap[b.priority || 'low'];
      }
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'deadline') {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      }
      // default: date
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return result;
  }, [tasks, filter, sortBy, searchTerm]);

  // Calculate summary statistics
  const summary = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
    const highPriority = tasks.filter(t => t.priority === 'high' && !t.completed).length;

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      completionRate,
      highPriority,
    };
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskInput.trim()) {
      dispatch(addTask({ 
        title: taskInput,
        priority,
        category,
        deadline: deadline || null
      }));
      setTaskInput('');
      setPriority('medium');
      setCategory('general');
      setDeadline('');
      showToast.success('✨ Task added successfully!');
    } else {
      showToast.error('Task title cannot be empty');
    }
  };

  const handleToggleTask = (id) => {
    dispatch(toggleTask(id));
    const task = tasks.find(t => t.id === id);
    showToast.success(task.completed ? 'Task marked as pending' : 'Task completed! 🎉');
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleEditTask = (updatedTask) => {
    dispatch(updateTask(updatedTask));
  };

  const handleClearCompleted = () => {
    if (summary.completedTasks > 0) {
      dispatch(clearCompleted());
      showToast.success(`Cleared ${summary.completedTasks} completed tasks`);
    }
  };

  return (
    <main>
      <h1>📋 Task Reports</h1>
      <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        Manage your tasks and view detailed reports with advanced filtering and sorting
      </p>

      {/* Summary Cards */}
      <div className="grid">
        <div className="summary-card">
          <h3>Total Tasks</h3>
          <div className="number">{summary.totalTasks}</div>
        </div>
        <div className="summary-card success">
          <h3>✅ Completed</h3>
          <div className="number">{summary.completedTasks}</div>
        </div>
        <div className="summary-card warning">
          <h3>📌 Pending</h3>
          <div className="number">{summary.pendingTasks}</div>
        </div>
        <div className="summary-card danger">
          <h3>🔥 High Priority</h3>
          <div className="number">{summary.highPriority}</div>
        </div>
      </div>

      {/* Completion Rate */}
      {summary.totalTasks > 0 && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3>Completion Progress</h3>
          <div style={{
            background: 'var(--border-color)',
            height: '24px',
            borderRadius: '12px',
            overflow: 'hidden',
            marginTop: '1rem'
          }}>
            <div style={{
              background: 'linear-gradient(90deg, #28a745 0%, #20c997 100%)',
              height: '100%',
              width: `${summary.completionRate}%`,
              transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: '1rem',
              fontWeight: 'bold',
              color: 'white'
            }}>
              {summary.completionRate > 5 && `${summary.completionRate}%`}
            </div>
          </div>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
            {summary.completedTasks} out of {summary.totalTasks} tasks completed
          </p>
        </div>
      )}

      {/* Add Task Form */}
      <div className="form-container">
        <h2>➕ Add New Task</h2>
        <form onSubmit={handleAddTask}>
          <div className="form-group">
            <label htmlFor="task-input">Task Title *</label>
            <input
              id="task-input"
              type="text"
              placeholder="Enter a new task..."
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              autoFocus
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  backgroundColor: 'var(--card-bg)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  backgroundColor: 'var(--card-bg)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                <option value="general">General</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
                <option value="health">Health</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="deadline">Deadline</label>
              <input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              ➕ Add Task
            </button>
            {taskInput && (
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setTaskInput('')}
              >
                Clear Input
              </button>
            )}
            {summary.completedTasks > 0 && (
              <button
                type="button"
                className="btn-danger"
                onClick={handleClearCompleted}
              >
                🗑️ Clear Completed ({summary.completedTasks})
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Search & Filter */}
      <SearchFilter onSearch={setSearchTerm} />

      {/* Task List */}
      <div style={{ marginTop: '2rem' }}>
        <h2>
          📝 Task List ({filteredAndSortedTasks.length})
          {searchTerm && ` - Search: "${searchTerm}"`}
        </h2>

        {filteredAndSortedTasks.length === 0 ? (
          <div className="empty-state">
            <h3>🎯 No tasks found</h3>
            <p>
              {tasks.length === 0 
                ? 'Add your first task using the form above to get started!' 
                : 'Try adjusting your filters or search term'}
            </p>
          </div>
        ) : (
          <div style={{ marginTop: '1rem' }}>
            {/* Pending Tasks */}
            {filteredAndSortedTasks.filter(t => !t.completed).length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: 'var(--color-warning)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  📋 Pending Tasks ({filteredAndSortedTasks.filter(t => !t.completed).length})
                </h3>
                {filteredAndSortedTasks
                  .filter(t => !t.completed)
                  .map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggle={handleToggleTask}
                      onDelete={handleDeleteTask}
                      onEdit={handleEditTask}
                    />
                  ))}
              </div>
            )}

            {/* Completed Tasks */}
            {filteredAndSortedTasks.filter(t => t.completed).length > 0 && (
              <div>
                <h3 style={{ color: 'var(--color-success)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  ✅ Completed Tasks ({filteredAndSortedTasks.filter(t => t.completed).length})
                </h3>
                {filteredAndSortedTasks
                  .filter(t => t.completed)
                  .map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggle={handleToggleTask}
                      onDelete={handleDeleteTask}
                      onEdit={handleEditTask}
                    />
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Reports;
