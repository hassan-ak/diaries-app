// Imports
// React Imports
import React from 'react';
// Component Imports
import Header from './components/Header';
import { Auth } from './features/auth/Auth';
import Footer from './components/Footer';
// Styles Imports
import './App.css';

function App() {
  return (
    <div>
      <Header/>
      <Auth/>
      <Footer/>
    </div>
  );
}

export default App;
