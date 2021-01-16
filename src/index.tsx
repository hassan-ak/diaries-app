// Imports
// React Imports
import React from 'react';
import ReactDOM from 'react-dom';
// Routers Imports
import { BrowserRouter as Router } from 'react-router-dom';
// Server Imports
import { setupServer } from './services/mirage/server';
// Redux Tool Kiy imports
import { Provider } from "react-redux";
// Store Imports
import store from "./store";
// Component Imports
import App from './App';

// Initilize server
if (process.env.NODE_ENV === 'development') {
  setupServer();
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
