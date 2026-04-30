import React from "react";
import { Button } from "@/components/ui/button";
import axios from "@/api/axios";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/cartSlice";
import { toast } from "sonner";

const Productcard = ({ product }) => {
  const dispatch = useDispatch();

  const {
    productName = "Unknown Product",
    productPrice = 0,
    productDesc = "No description available",
    brand = "Generic",
    productImg = [],
    _id,
  } = product || {};

  const addToCartHandler = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return toast.error("Please login first");
      }

      await axios.post(
        "/api/v1/cart/add",
        { productId: _id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const res = await axios.get("/api/v1/cart/get", {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(setCart(res.data.items || []));
      toast.success("Added to cart");
    } catch (error) {
      console.error("Cart Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 h-52 overflow-hidden rounded-xl bg-gray-50">
        <img
          src={productImg?.[0]?.url || "https://via.placeholder.com/400x400?text=Product"}
          alt={productName}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-500">
          {brand}
        </p>
        <h2 className="line-clamp-1 text-lg font-bold text-gray-900">
          {productName}
        </h2>
        <p className="line-clamp-2 text-sm text-gray-500">{productDesc}</p>
        <p className="mt-auto text-xl font-black text-gray-900">
          Rs. {Number(productPrice).toLocaleString()}
        </p>
      </div>

      <Button
        onClick={addToCartHandler}
        className="mt-4 w-full bg-pink-600 text-white hover:bg-pink-700"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default Productcard;
