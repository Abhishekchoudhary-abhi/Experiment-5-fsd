import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTasksFromStorage } from '../redux/slices/taskSlice';

export const useLocalStorage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const nextId = useSelector(state => state.tasks.nextId);

  // Load from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        dispatch(loadTasksFromStorage(parsed));
      } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
      }
    }
  }, [dispatch]);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    const data = { tasks, nextId };
    localStorage.setItem('tasks', JSON.stringify(data));
  }, [tasks, nextId]);
};
