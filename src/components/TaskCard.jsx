import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { showToast } from '../utils/toastService';

const TaskCard = ({ task, onToggle, onDelete, onEdit }) => {
  const { theme } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [showDetails, setShowDetails] = useState(false);

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onEdit && onEdit({
        ...task,
        title: editTitle,
        description: editDescription,
      });
      setIsEditing(false);
      showToast.success('Task updated successfully!');
    } else {
      showToast.error('Task title cannot be empty');
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && !task.completed;

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-header">
        <div className="task-info">
          <input
            type="checkbox"
            className="task-checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            aria-label={`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
          />
          <div className="task-content">
            {isEditing ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="edit-input"
                autoFocus
              />
            ) : (
              <span className="task-title">{task.title}</span>
            )}
            {task.priority && (
              <span className="priority-badge" style={{ color: getPriorityColor(task.priority) }}>
                {getPriorityIcon(task.priority)} {task.priority}
              </span>
            )}
          </div>
        </div>
        <div className="task-actions">
          {isEditing ? (
            <>
              <button
                className="btn-success btn-sm"
                onClick={handleSaveEdit}
                title="Save changes"
              >
                Save
              </button>
              <button
                className="btn-secondary btn-sm"
                onClick={() => setIsEditing(false)}
                title="Cancel editing"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="btn-info btn-sm"
                onClick={() => setShowDetails(!showDetails)}
                title="Toggle details"
              >
                {showDetails ? '▼' : '▶'}
              </button>
              <button
                className="btn-warning btn-sm"
                onClick={() => setIsEditing(true)}
                title="Edit task"
              >
                ✎
              </button>
              <button
                className="btn-danger btn-sm"
                onClick={() => {
                  onDelete(task.id);
                  showToast.success('Task deleted!');
                }}
                title="Delete task"
              >
                ✕
              </button>
            </>
          )}
        </div>
      </div>

      {showDetails && (
        <div className="task-details">
          {isEditing ? (
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="edit-input"
              placeholder="Add description..."
              rows="3"
            />
          ) : (
            editDescription && <p className="task-description">{editDescription}</p>
          )}
          
          <div className="task-meta">
            {task.category && (
              <span className="meta-badge">📁 {task.category}</span>
            )}
            {task.deadline && (
              <span className={`meta-badge ${isOverdue ? 'overdue' : ''}`}>
                📅 {new Date(task.deadline).toLocaleDateString()}
              </span>
            )}
            {task.tags && task.tags.length > 0 && (
              <div className="tags">
                {task.tags.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
