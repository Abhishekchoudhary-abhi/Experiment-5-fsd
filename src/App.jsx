import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Toaster from 'react-hot-toast';
import store from './redux/store';
import { AppProvider } from './context/AppContext';
import { useLocalStorage } from './hooks/useLocalStorage';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Projects from './pages/Projects';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';

import './index.css';

function AppContent() {
  // Initialize local storage persistence
  useLocalStorage();

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppProvider>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '8px',
              fontWeight: '500',
            },
          }}
        />
        <AppContent />
      </AppProvider>
    </Provider>
  );
}

export default App;
