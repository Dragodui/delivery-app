import React from 'react';
import Restaurant from './Pages/Restaurant';
import Cart from './components/Cart';
import CartPage from './Pages/CartPage';
import Order from './Pages/Order';
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from './config';
import { useAppDispatch, useAppSelector } from './store/store';
import { setUser } from './store/features/userSlice';
import { setIsLoggedIn } from './store/features/isLoggedInSlice';
import Header from './components/Header';
import ResOwnerPanel from './Pages/ResOwnerPanel';
import Restaurants from './Pages/Restaurants';
import { fillCart } from './store/features/cartSlice';
import { fillOrders } from './store/features/ordersSlice';

const App = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedInState, setIsLoggedInState] = useState(false);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem('token');
      setIsLoading(true);
      if (token) {
        try {
          const response = await axios.get(`${baseUrl}/currentUser`, {
            headers: { authorization: token },
          });
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
              restaurants: user.restaurants,
            };
          } else {
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
        } catch (error) {
          console.log(`Error fetching current user: ${error}`);
        }
      }
    };
    const fetchIsLoggedIn = async () => {
      try {
        const response = await axios.get(`${baseUrl}/checkAuth`, {
          headers: { authorization: token },
        });
        const isLoggedInFromResponse = response.data.authenticated;
        dispatch(setIsLoggedIn(isLoggedInFromResponse));
        setIsLoggedInState(isLoggedInFromResponse);
      } catch (error) {
        console.log(`Error fetching login: ${error}`);
      }
    };
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${baseUrl}/cart/${user.id}`);
        const fetchedCart = response.data.cart;
        dispatch(fillCart(fetchedCart));
      } catch (error) {
        console.log(error);
      }
    };
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${baseUrl}/orders/${user.id}`);
        // setOrders(response.data.orders);
        console.log(response.data);
        dispatch(fillOrders(response.data.order));
      } catch (error) {
        console.log(error);
      }
      
    };
    
    fetchCurrentUser();
    fetchIsLoggedIn();
    fetchCart();
    fetchOrders();
    setIsLoading(false);
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path='/login'
          element={isLoggedInState ? <Navigate to='/profile' /> : <Login />}
        />
        <Route
          path='/register'
          element={isLoggedInState ? <Navigate to='/profile' /> : <Register />}
        />
        <Route
          path='/profile'
          element={isLoggedInState ? <Profile /> : <Navigate to='/login' />}
        />
        <Route
          path='/my_restaurant/:resId'
          element={
            isLoggedInState && user.role === 'owner' ? (
              <ResOwnerPanel />
            ) : (
              <Navigate to='/profile' />
            )
          }
        />
        <Route
          path='/restaurants'
          element={isLoggedInState ? <Restaurants /> : <Navigate to='/login' />}
        />
        <Route
          path='/restaurants/:resId'
          element={isLoggedInState ? <Restaurant /> : <Navigate to='/login' />}
        />
        <Route
          path='/orders/:orderId'
          element={isLoggedInState ? <Order /> : <Navigate to='/login' />}
        />
         <Route
          path='/cart'
          element={isLoggedInState ? <CartPage /> : <Navigate to='/login' />}
        />
      </Routes>
      <footer></footer>
      {isLoggedInState ? <Cart /> : ''}
    </Router>
  );
};

export default App;
