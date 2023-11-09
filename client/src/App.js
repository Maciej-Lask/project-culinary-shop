import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout/MainLayout';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Home from './components/pages/Home/HomePage';
import NotFound from './components/pages/NotFound/NotFoundPage';

import SignUp from './components/pages/SignUp/SignUp';
import SignIn from './components/pages/SignIn/SignIn';
import SignOut from './components/pages/SignOut/SignOut';

import Product from './components/pages/Product/Product';

import Search from './components/pages/Search/Search';

import { fetchProducts } from './redux/productsRedux';
import { logIn } from './redux/usersRedux';

import ContactPage from './components/pages/ContactUs/ContactUsPage';
import AboutUsPage from './components/pages/AboutUs/AboutUsPage';
import CartPage from './components/pages/Cart/CartPage';

import Order from './components/pages/Order/Order';
import MyOrders from './components/pages/MyOrders/MyOrders';
import OrderSummary from './components/pages/OrderSummary/OrderSummary';

import { AUTH_URL } from './config';

const App = () => {
  const dispatch = useDispatch();
  // localStorage.setItem('user', JSON.stringify('unauthorized'));
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    console.log(userData);
    if (userData) {
      const userObj = JSON.parse(userData);
      dispatch(logIn(userObj));
    } else {
      localStorage.setItem('user', JSON.stringify('unauthorized'));
      fetch(`${AUTH_URL}/user`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (response) {
            dispatch(logIn(response));
            localStorage.setItem('user', JSON.stringify(response));
          }
        })
        .catch((error) => {
          console.error('Error while fetching user data:', error);
        });
    }
  }, [dispatch]);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        
        <Route path="/cart" element={<CartPage />} />


        <Route path="/order" element={<Order />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/order-summary" element={<OrderSummary />} />

        <Route path="/product/:id" element={<Product />} />

        <Route path="/search/:searchPhrase" element={<Search />} />

        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-out" element={<SignOut />} />
        

        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
