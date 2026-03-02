import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  nextId: 1,
  filter: 'all', // all, pending, completed
  sortBy: 'date', // date, priority, name
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: state.nextId,
        title: action.payload.title,
        description: action.payload.description || '',
        completed: false,
        priority: action.payload.priority || 'medium', // low, medium, high
        category: action.payload.category || 'general',
        deadline: action.payload.deadline || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: action.payload.tags || [],
      };
      state.tasks.push(newTask);
      state.nextId += 1;
    },
    updateTask: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) {
        Object.assign(task, { 
          ...action.payload,
          id: task.id,
          createdAt: task.createdAt,
          updatedAt: new Date().toISOString()
        });
      }
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        task.updatedAt = new Date().toISOString();
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    clearCompleted: (state) => {
      state.tasks = state.tasks.filter(t => !t.completed);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    loadTasksFromStorage: (state, action) => {
      state.tasks = action.payload.tasks;
      state.nextId = action.payload.nextId;
    },
  },
});

export const { 
  addTask, 
  updateTask,
  toggleTask, 
  deleteTask, 
  clearCompleted,
  setFilter,
  setSortBy,
  loadTasksFromStorage
} = taskSlice.actions;

export default taskSlice.reducer;
