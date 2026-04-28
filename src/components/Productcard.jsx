// import React from "react";
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// // import { setCart } from "@/redux/cartSlice";
// import { toast } from "sonner";

// const Productcard = ({ product }) => {
//   const dispatch = useDispatch();

//   // Safely destructuring with default values
//   const { 
//     productName = "Unknown Product", 
//     productPrice = 0, 
//     productDesc = "No description available", 
//     brand = "Generic", 
//     productImg = [], 
//     _id 
//   } = product || {};

//   const addToCartHandler = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         return toast.error("Please login to add items to cart!");
//       }

//       const res = await axios.post(
//         "http://localhost:5000/api/v1/cart/add",
//         { productId: _id },
//         {
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json"
//           },
//           withCredentials: true
//         }
//       );

//       if (res.data.success) {
//         toast.success(res.data.message || "Added to cart!");

//         const cartRes = await axios.get("http://localhost:5000/api/v1/cart/get", {
//           headers: { "Authorization": `Bearer ${token}` },
//           withCredentials: true
//         });
        
//         if (cartRes.data.success) {
//           dispatch(setCart(cartRes.data.items));
//         }
//       }
//     } catch (error) {
//       console.error("Cart Error Details:", error.response?.data);
//       toast.error(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
//       <div className="h-40 w-full overflow-hidden rounded-lg mb-3 bg-gray-100">
//         <img 
//           src={productImg?.[0]?.url || "https://via.placeholder.com/150"} 
//           alt={productName} 
//           className="h-full w-full object-contain hover:scale-105 transition-transform duration-300" 
//         />
//       </div>

//       <div className="space-y-1">
//         <h2 className="text-lg font-bold text-gray-800 truncate">{productName}</h2>
//         <p className="text-xs text-blue-500 font-medium uppercase tracking-wider">{brand}</p>
//         <p className="text-sm text-gray-600 line-clamp-2 min-h-[40px]">
//           {productDesc}
//         </p>
        
//         <div className="pt-2 flex items-center justify-between">
//           <p className="font-extrabold text-xl text-green-700">
//             ₹ {productPrice.toLocaleString()}
//           </p>
//         </div>
//       </div>

//       <Button 
//         onClick={addToCartHandler} 
//         className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors"
//       >
//         Add to Cart
//       </Button>
//     </div>
//   );
// };

// export default Productcard;









import React from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/cartSlice"; // ✅ FIX
import { toast } from "sonner";


const Productcard = ({ product }) => {
  const dispatch = useDispatch();

  const { productName, productPrice, productDesc, brand, productImg, _id } = product;


const addToCartHandler = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return toast.error("Please login first");
    }

    // 🟢 ADD TO CART
    await axios.post(
      "http://localhost:5000/api/v1/cart/add",
      { productId: _id },
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      }
    );

    // 🟢 GET UPDATED CART
    const res = await axios.get(
      "http://localhost:5000/api/v1/cart/get",
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      }
    );

    dispatch(setCart(res.data.items)); // 🔥 navbar update

    toast.success("Added to cart");

  } catch (error) {
    console.error("Cart Error:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Failed to add to cart");
  }
};
  return (
    <div>
      <img src={productImg?.[0]?.url} />
      <h2>{productName}</h2>
      <p>{brand}</p>
      <p>{productPrice}</p>

      <Button onClick={addToCartHandler}>
        Add to Cart
      </Button>
    </div>
  );
};

export default Productcard;