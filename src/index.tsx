// Imports
// React Imports
import React from 'react';
import ReactDOM from 'react-dom';
// Routers Imports
import { BrowserRouter as Router } from 'react-router-dom';
// Server Imports
import { setupServer } from './services/mirage/server';
// Component Imports
import App from './App';

// Initilize server
if (process.env.NODE_ENV === 'development') {
  setupServer();
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
