// // import { configureStore } from '@reduxjs/toolkit'
// // import userSlice from './userSlice.js'
// // import productSlice from './productSlice.js';
// // import Product from '@/pages/Product.jsx';

// // export const store = configureStore({
// //   reducer: {

// //    user :userSlice,
// //    product:productSlice

    
// //   },
// //    clearUser: (state) => {
// //     state.user = null;
// //   }
// // })

// // export default store 


// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";
// import productReducer from "./productSlice";
// import cartReducer from "./cartSlice"; // ✅ वापस add किया

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     product: productReducer,
//     cart: cartReducer, // ✅ required hai
//   },
// });

// export default store;




import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer, // ✅ add karo
  },
});