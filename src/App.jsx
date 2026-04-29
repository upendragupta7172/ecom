// upendragupta7172_db_user

// onf6j6fnFFKIq9zB


// mongodb+srv://upendragupta7172_db_user:<db_password>@ecommercecluseter.mhvcipe.mongodb.net/?appName=ecommercecluseter


// new

import React, { useEffect } from 'react';
import axios from "axios";

axios.defaults.baseURL = "https://ecombackend-8yfl.onrender.com";
axios.defaults.withCredentials = true;
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCart } from './redux/cartSlice';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Varify from './pages/Varify';
import VarifyEmail from './pages/VarifyEmail';
import Footer from './components/Footer';
// import Profile from './pages/Profile';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Address from './pages/Address'; // Nayi file
import AddProduct from './admin/AddProduct';
import AdminProducts from './admin/AdminProducts';
import Payment from './pages/Payment';
import Orders from './admin/Orders';
import MyOrders from './pages/MyOrders';
import OrderDetails from './pages/OrderDetails';
import AccountSettings from './pages/AccountSettings';
import Profile from './pages/Profile';
// import Profile from './pages/Profile';


const Layout = () => (
  <>
    <Navbar />
    <div className="min-h-screen pt-16"> {/* Navbar fixed hai isliye padding top */}
      <Outlet /> 
    </div>
    <Footer />
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/product', element: <Product /> },
      { path: '/cart', element: <Cart /> },
      { path: '/checkout/address', element: <Address /> }, // Step 2 Route
      // { path: '/profile/:userid', element: <Profile /> },
      { path: '/checkout/payment', element: <Payment /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/admin/products', element: <AdminProducts /> },
      { path: '/admin/add-product', element: <AddProduct /> },

      // aaj

      { path: '/admin/orders', element: <Orders /> },
      { path: '/my-orders', element: <MyOrders /> },
      { path: "/order/:id", element: <OrderDetails /> },

      { path: "/profile/:id", element: <Profile /> },

      { path: "/account", element: <AccountSettings /> }
    ]
  },
  { path: '/varify', element: <Varify /> },
  { path: '/varify/:token', element: <VarifyEmail /> },
]);



const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchInitialCart = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Token ko header mein bhej rahe hain kyunki isAuthenticated middleware check karta hai
          const res = await axios.get('https://ecombackend-8yfl.onrender.com/api/v1/cart/get', {
            headers: { "Authorization": `Bearer ${token}` }
          });
          if (res.data.success) dispatch(setCart(res.data.items || []));
        }
      } catch (error) { 
        console.error("Cart fetch error:", error); 
        if(error.response?.status === 401) {
          localStorage.removeItem('token'); // Invalid token ko saaf karein
        }
      }
    };
    fetchInitialCart();
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;