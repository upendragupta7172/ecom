

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCart } from "@/redux/cartSlice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// Icons import karein (Lucide-react install hona chahiye)
import { Trash2, Heart, CheckCircle, ShieldCheck, Truck, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";

const Cart = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();       
  const { items = [] } = useSelector((state) => state.cart);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState("");

  const API_URL = "https://ecombackend-8yfl.onrender.com/api/v1/cart";
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    withCredentials: true,
  };

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_URL}/get`, config);
      if (res.data.success) dispatch(setCart(res.data.items || []));
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => { fetchCart(); }, []);

  const updateQty = async (productId, type) => {
    try {
      const res = await axios.post(`${API_URL}/update`, { productId, type }, config);
      if (res.data.success) dispatch(setCart(res.data.items));
    } catch (error) { toast.error("Update failed"); }
  };

  const removeItem = async (productId) => {
    try {
      const res = await axios.post(`${API_URL}/remove`, { productId }, config);
      if (res.data.success) {
        dispatch(setCart(res.data.items));
        toast.success("Item removed");
        setDiscount(0);
      }
    } catch (error) { toast.error("Error removing item"); }
  };

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === "UPENDRA10") {
      setDiscount(1000);
      setAppliedCode(code);
      toast.success("Promo Applied! ₹1000 Saved");
    } else {
      toast.error("Invalid Code");
      setDiscount(0);
      setAppliedCode("");
    }
  };

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + (Number(item.product?.productPrice) || 0) * (item.quantity || 0), 0);
  const deliveryCharges = subtotal > 5000 || subtotal === 0 ? 0 : 40;
  const tax = Math.round(subtotal * 0.18);
  const finalTotal = subtotal + deliveryCharges + tax - discount;

  return (
    <div className="max-w-6xl mx-auto p-6 pt-24 min-h-screen bg-white">
      
      {/* 3. PROGRESSIVE STEP TRACKER */}
      <div className="flex items-center justify-center gap-4 mb-10 overflow-x-auto py-2">
        <div className="flex items-center gap-2 text-blue-600 font-bold border-b-2 border-blue-600 pb-1">
          <span className="w-6 h-6 flex items-center justify-center bg-blue-600 text-white rounded-full text-xs">1</span>
          <span>BAG</span>
        </div>
        <ChevronRight size={16} className="text-gray-300" />
        <div className="flex items-center gap-2 text-gray-400 font-semibold">
          <span className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-500 rounded-full text-xs">2</span>
          <span>ADDRESS</span>
        </div>
        <ChevronRight size={16} className="text-gray-300" />
        <div className="flex items-center gap-2 text-gray-400 font-semibold">
          <span className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-500 rounded-full text-xs">3</span>
          <span>PAYMENT</span>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-6">Shopping Bag ({items.length} items)</h1>

      {items.length === 0 ? (
        <div className="text-center py-20 border rounded-2xl bg-gray-50">
          <p className="text-gray-500 text-lg mb-4">Your bag is empty!</p>
          <Button className="bg-blue-600">Start Shopping</Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT SIDE: PRODUCT LIST */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              item.product && (
                <div key={item._id} className="flex gap-4 border p-4 rounded-xl relative hover:shadow-md transition-shadow">
                  <img
                    src={item.product?.productImg?.[0]?.url || "/placeholder.png"}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg bg-gray-50 border"
                    alt="product"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between">
                        <h2 className="font-bold text-gray-800 line-clamp-1">{item.product?.productName}</h2>
                        <button onClick={() => removeItem(item.product._id)} className="text-gray-400 hover:text-red-500">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-gray-400 text-xs font-bold uppercase mt-1">{item.product?.brand}</p>
                      <p className="font-bold text-lg mt-2">₹ {Number(item.product?.productPrice).toLocaleString()}</p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border rounded-lg bg-gray-50">
                        <button onClick={() => updateQty(item.product._id, "decrease")} className="px-3 py-1 font-bold hover:bg-gray-200 transition">-</button>
                        <span className="px-3 py-1 font-bold border-x">{item.quantity}</span>
                        <button onClick={() => updateQty(item.product._id, "increase")} className="px-3 py-1 font-bold hover:bg-gray-200 transition">+</button>
                      </div>
                      
                      {/* 2. SAVE FOR LATER BUTTON */}
                      <button className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-pink-500 transition uppercase tracking-tighter">
                        <Heart size={14} /> Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>

          {/* RIGHT SIDE: SUMMARY & BADGES */}
          <div className="lg:col-span-1 space-y-4">
            <div className="border p-6 rounded-2xl bg-white shadow-sm sticky top-28">
              <h2 className="text-lg font-bold mb-4 border-b pb-2">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Subtotal</span>
                  <span>₹ {subtotal.toLocaleString()}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-bold bg-green-50 p-2 rounded-lg">
                    <span>Discount ({appliedCode})</span>
                    <span>- ₹ {discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Delivery Fee</span>
                  <span className={deliveryCharges === 0 ? "text-green-600 font-bold" : ""}>
                    {deliveryCharges === 0 ? "FREE" : `₹ ${deliveryCharges}`}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600 text-sm">
                  <span>GST (18%)</span>
                  <span>₹ {tax.toLocaleString()}</span>
                </div>

                <div className="pt-4 border-t flex justify-between items-center mb-6">
                  <span className="font-bold text-gray-800 text-lg">Total Amount</span>
                  <span className="text-2xl font-black text-blue-700">₹ {finalTotal.toLocaleString()}</span>
                </div>

                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter Coupon" 
                    className="flex-1 border p-2 rounded-lg text-sm outline-none focus:border-blue-400 uppercase font-bold"
                  />
                  <button onClick={handleApplyPromo} className="bg-gray-800 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-black transition">APPLY</button>
                </div>


{/* 
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-bold rounded-xl mt-4">
                  Proceed to Checkout
                </Button> */}

                {/* new */}

                <Button 
  onClick={() => navigate('/checkout/address')} // Redirect to Step 2
  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-7 text-lg font-black rounded-2xl shadow-lg transition-transform active:scale-[0.97]"
>
  PROCEED TO CHECKOUT
</Button>

                {/* 1. WARRANTY & DELIVERY BADGES GRID */}
                <div className="mt-8 pt-6 border-t space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <CheckCircle className="text-green-500" size={20} />
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-tight">7 Days Easy Replacement</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <ShieldCheck className="text-blue-500" size={20} />
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-tight">1 Year Official Warranty</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <Truck className="text-orange-500" size={20} />
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-tight">Free Express Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;