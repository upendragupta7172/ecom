import React, { useState } from 'react';
import Stepper from '../components/Stepper';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '@/redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import axios from "@/api/axios";
import { toast } from 'sonner';

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + (Number(item.product?.productPrice) || 0) * (item.quantity || 0), 0);
  const totalAmount = Math.round(subtotal + (subtotal * 0.18));

  const handlePayment = async () => {
    if (totalAmount <= 0) return toast.error("Your cart is empty");
    if (!window.Razorpay) return toast.error("Razorpay is not available right now");

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      };

      const { data } = await axios.post('/api/v1/payment/checkout', {
        amount: totalAmount
      }, config);

      const order = data.order;

      const options = {
        key: "rzp_test_SfLdh3pCV57Gfp",
        amount: order.amount,
        currency: "INR",
        name: "Upendra's Store",
        description: "Secure Payment for your Order",
        image: "",
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderData: {
                products: items.map(item => ({
                  productId: item.product._id,
                  quantity: item.quantity
                })),
                amount: totalAmount
              }
            };

            const res = await axios.post('/api/v1/payment/verify', verifyData, config);

            if (res.data.success) {
              dispatch(clearCart());
              toast.success("Order placed successfully!");
              navigate('/order-success', {
                state: { orderId: res.data.orderId || order.id }
              });
            }
          } catch (err) {
            console.error("Verification Error:", err);
            toast.error(err.response?.data?.message || "Payment verification failed");
          }
        },
        prefill: {
          name: `${user?.firstName || "Customer"} ${user?.lastName || ""}`.trim(),
          email: user?.email || "test@example.com",
        },
        theme: { color: "#2563eb" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Razorpay Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24 min-h-screen">
      <Stepper step={3} />

      <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-50 max-w-md mx-auto text-center">
        <h2 className="text-2xl font-black mb-2 text-gray-800">Final Payment</h2>
        <p className="text-gray-400 mb-8 text-sm">Choose your payment method via Razorpay</p>

        <div className="border-2 border-blue-50 bg-blue-50/30 p-6 rounded-3xl mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-500 font-medium">Subtotal:</span>
            <span className="text-gray-800 font-bold">Rs. {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-blue-100">
            <span className="text-gray-500 font-medium">GST (18%):</span>
            <span className="text-gray-800 font-bold">Rs. {Math.round(subtotal * 0.18).toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-black">Total Payable:</span>
            <span className="text-3xl font-black text-blue-600 tracking-tighter">Rs. {totalAmount.toLocaleString()}</span>
          </div>
        </div>

        <Button
          onClick={handlePayment}
          disabled={loading || items.length === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 py-8 text-xl font-black rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95"
        >
          {loading ? "Initializing..." : "PAY WITH RAZORPAY"}
        </Button>

        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          100% Secure SSL Encryption
        </div>
      </div>
    </div>
  );
};

export default Payment;
