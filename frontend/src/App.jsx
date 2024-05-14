import React from 'react';

import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Login from './Pages/Login';
import HomePage from './Pages/HomePage';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from './config';
import { useAppDispatch, useAppSelector } from './store/store';
import { setUser } from './store/features/userSlice';
import { setIsLoggedIn } from './store/features/isLoggedInSlice';
import Header from './components/Header';

const App = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedInState, setIsLoggedInState] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    console.log(token);
    if (token) {
      axios
        .get(`${baseUrl}/currentUser`, { headers: { authorization: token } })
        .then((response) => {
          const user = response.data;
          let parsedUser = {};
          if (user.role === 'owner') {
            parsedUser = {
              email: user.email,
              name: user.name,
              role: user.role,
              cart: user.cart,
              orders: user.orders,
              id: user._id,
              createdAt: user.createdAt,
              restaurant: user.restaurant
            };
          }
          else {
            parsedUser = {
              email: user.email,
              name: user.name,
              role: user.role,
              cart: user.cart,
              orders: user.orders,
              id: user._id,
              createdAt: user.createdAt,
            };
          }
          dispatch(setUser(parsedUser));
        })
        .catch((error) => {
          console.error(
            'Error fetching current user:',
            error.response.data.message,
          );
        });
      axios
        .get(`${baseUrl}/checkAuth`, { headers: { authorization: token } })
        .then((response) => {
          const isLoggedInFromResponse = response.data.authenticated;
          dispatch(setIsLoggedIn(isLoggedInFromResponse));
          setIsLoggedInState(isLoggedInFromResponse);
        })
        .catch((error) => {
          console.error(
            'Error fetching authentication:',
            error.response.data.message,
          );
        });
    }
  }, [token]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/login'
          element={isLoggedInState ? <Navigate to='/profile' /> : <Login />}
        />
        <Route
          path='/register'
          element={isLoggedInState ? <Navigate to='/profile' /> : <Register />}
        />
        <Route path='/profile' element={isLoggedInState ? <Profile /> : <Navigate to='/login'/>} />
      </Routes>
      <footer></footer>
    </Router>
  );
};

export default App;
