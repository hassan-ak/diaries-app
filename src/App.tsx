// Imports
// React Imports
import React, { lazy, Suspense } from "react";
// Router imports
import { Routes, Route } from "react-router-dom";
// Redux Imports
import { useSelector } from "react-redux";
// Reducer Imports
import { RootState } from "./rootReducer";
// Styles Imports
import './App.css';
// Component Imports
import Header from './components/Header';
import { Loader } from "./components/Loader";
import Footer from './components/Footer';
const Auth = lazy(() => import("./features/auth/Auth"));
const Home = lazy(() => import("./features/home/Home"));

function App() {
  // check if the user is loged in by checking authentication
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              {isLoggedIn ? <Home /> : <Auth />}
            </Suspense>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
