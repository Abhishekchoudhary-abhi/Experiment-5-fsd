import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setSortBy } from '../redux/slices/taskSlice';

const SearchFilter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const filter = useSelector(state => state.tasks.filter);
  const sortBy = useSelector(state => state.tasks.sortBy);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-filter-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        {searchTerm && (
          <button 
            className="clear-search"
            onClick={() => {
              setSearchTerm('');
              onSearch('');
            }}
          >
            ✕
          </button>
        )}
      </div>

      <div className="filter-controls">
        <select 
          value={filter} 
          onChange={(e) => dispatch(setFilter(e.target.value))}
          className="filter-select"
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="priority-high">High Priority</option>
          <option value="priority-medium">Medium Priority</option>
          <option value="priority-low">Low Priority</option>
        </select>

        <select 
          value={sortBy} 
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className="filter-select"
        >
          <option value="date">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
          <option value="name">Sort by Name</option>
          <option value="deadline">Sort by Deadline</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;
