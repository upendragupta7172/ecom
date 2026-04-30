import React from 'react';
import { CheckCircle, Download, ShoppingBag } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "@/api/axios";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId } = location.state || { orderId: "N/A" };

  const downloadInvoice = () => {
    if (orderId === "N/A") {
      return;
    }

    window.open(`${API_BASE_URL}/api/v1/payment/invoice/${orderId}`, "_blank");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-green-100">
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500 w-24 h-24 animate-bounce" />
        </div>

        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Payment Confirmed!</h1>
        <p className="text-slate-500 mb-6">Your order has been placed successfully.</p>

        <div className="bg-slate-100 p-4 rounded-lg mb-8">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Order Transaction ID</p>
          <p className="font-mono text-blue-600 font-bold">{orderId}</p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={downloadInvoice}
            disabled={orderId === "N/A"}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Download size={20} /> Download PDF Invoice
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full bg-white text-slate-600 py-3 rounded-xl font-semibold border border-slate-200 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
          >
            <ShoppingBag size={20} /> Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
