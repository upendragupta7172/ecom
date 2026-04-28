


// aaj

// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ShoppingCart, LayoutDashboard } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearUser } from '@/redux/userSlice';
// import { clearCart } from '@/redux/cartSlice';

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user } = useSelector(store => store.user);
//   const { items } = useSelector(store => store.cart || { items: [] });

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     dispatch(clearUser());
//     dispatch(clearCart());
//     navigate('/login');
//   };

//   return (
//     <header className='bg-pink-50 fixed w-full z-20 border-b border-pink-200'>
//       <div className='max-w-7xl mx-auto flex justify-between items-center py-3 px-4'>

//         {/* LOGO */}
//         <Link to="/">
//           <img src="/h.jpg" className='w-24' />
//         </Link>

//         <nav className='flex gap-10 items-center'>

//           {/* LEFT MENU */}
//           <ul className='flex gap-7 items-center text-lg font-semibold text-gray-700'>

//             <li>
//               <Link to='/' className='hover:text-pink-600'>Home</Link>
//             </li>

//             <li>
//               <Link to='/product' className='hover:text-pink-600'>Products</Link>
//             </li>

//             <li>
//               <Link to='/admin/orders' className='hover:text-pink-600'>Orders</Link>
//             </li>

//             {/* ADMIN */}
//             {user?.role === 'admin' && (
//               <li>
//                 <Link to='/admin/products' className='flex items-center gap-1 bg-purple-200 px-3 py-1 rounded hover:bg-purple-300'>
//                   <LayoutDashboard size={18} />
//                   Admin
//                 </Link>
//               </li>
//             )}

//             {/* USER DROPDOWN */}
//             {user && (
//               <li className="relative group list-none">

//                 {/* NAME */}
//                 <div className="text-pink-600 cursor-pointer">
//                   Hello {user.firstName}
//                 </div>

//                 {/* DROPDOWN */}
//                 <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">

//                   <Link to={`/profile/${user._id}`}>
//                     <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                       Profile
//                     </div>
//                   </Link>

//                   <Link to="/my-orders">
//                     <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                       My Orders
//                     </div>
//                   </Link>

//                   <Link to="/account">
//                     <li>Account Settings</li>
//                   </Link>

//                   <div
//                     onClick={handleLogout}
//                     className="px-4 py-2 hover:bg-red-100 text-red-500 cursor-pointer"
//                   >
//                     Logout
//                   </div>

//                 </div>
//               </li>
//             )}
//           </ul>

//           {/* RIGHT SIDE */}
//           <div className='flex items-center gap-5'>

//             {/* CART */}
//             <Link to='/cart' className='relative'>
//               <ShoppingCart size={28} />

//               {items?.length > 0 && (
//                 <span className='absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
//                   {items.length}
//                 </span>
//               )}
//             </Link>

//             {/* LOGIN BUTTON (only when NOT logged in) */}
//             {!user && (
//               <Link to='/login'>
//                 <button className='bg-blue-600 text-white px-4 py-1 rounded'>
//                   Login
//                 </button>
//               </Link>
//             )}

//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;







import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LayoutDashboard, Menu, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '@/redux/userSlice';
import { clearCart } from '@/redux/cartSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user } = useSelector(store => store.user);
  const { items } = useSelector(store => store.cart || { items: [] });

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearUser());
    dispatch(clearCart());
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img src="/h.jpg" className="w-20 md:w-24 rounded-lg" />
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-gray-700">

          <Link to="/" className="hover:text-pink-600">Home</Link>
          <Link to="/product" className="hover:text-pink-600">Products</Link>

          {user?.role === "admin" && (
            <Link to="/admin/products" className="flex items-center gap-1 bg-purple-100 px-3 py-1 rounded hover:bg-purple-200">
              <LayoutDashboard size={18} />
              Admin
            </Link>
          )}

          {/* USER DROPDOWN */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-pink-600 font-semibold"
              >
                Hello {user.firstName}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white shadow-lg rounded-lg border">

                  <Link to={`/profile/${user._id}`}>
                    <div className="px-4 py-2 hover:bg-gray-100">Profile</div>
                  </Link>

                  <Link to="/my-orders">
                    <div className="px-4 py-2 hover:bg-gray-100">My Orders</div>
                  </Link>

                  <Link to="/account">
                    <div className="px-4 py-2 hover:bg-gray-100">Account Settings</div>
                  </Link>

                  <div
                    onClick={handleLogout}
                    className="px-4 py-2 text-red-500 hover:bg-red-100 cursor-pointer"
                  >
                    Logout
                  </div>

                </div>
              )}
            </div>
          )}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* CART */}
          <Link to="/cart" className="relative">
            <ShoppingCart size={26} />
            {items?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {items.length}
              </span>
            )}
          </Link>

          {/* LOGIN */}
          {!user && (
            <Link to="/login">
              <button className="hidden md:block bg-pink-600 text-white px-4 py-1 rounded hover:bg-pink-700">
                Login
              </button>
            </Link>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* 🔥 MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-md">

          <Link to="/" onClick={() => setMenuOpen(false)}>
            <div className="px-4 py-3 border-b">Home</div>
          </Link>

          <Link to="/product" onClick={() => setMenuOpen(false)}>
            <div className="px-4 py-3 border-b">Products</div>
          </Link>

          {user?.role === "admin" && (
            <Link to="/admin/products" onClick={() => setMenuOpen(false)}>
              <div className="px-4 py-3 border-b">Admin</div>
            </Link>
          )}

          {user && (
            <>
              <div className="px-4 py-3 border-b text-pink-600 font-semibold">
                Hello {user.firstName}
              </div>

              <Link to={`/profile/${user._id}`} onClick={() => setMenuOpen(false)}>
                <div className="px-4 py-3 border-b">Profile</div>
              </Link>

              <Link to="/my-orders" onClick={() => setMenuOpen(false)}>
                <div className="px-4 py-3 border-b">My Orders</div>
              </Link>

              <Link to="/account" onClick={() => setMenuOpen(false)}>
                <div className="px-4 py-3 border-b">Account Settings</div>
              </Link>

              <div
                onClick={handleLogout}
                className="px-4 py-3 text-red-500"
              >
                Logout
              </div>
            </>
          )}

          {!user && (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <div className="px-4 py-3">Login</div>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;