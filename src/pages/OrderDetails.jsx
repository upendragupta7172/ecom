import React, { useEffect, useState } from "react";
import axios from "@/api/axios";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(
        `/api/v1/orders/${id}`,
        { 
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true 
        }
      );

      if (res.data.success) {
        setOrder(res.data.order);
      }
    } catch (error) {
      console.log("Error fetching order");
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  if (!order) return <p className="pt-28 text-center">Loading...</p>;

  const total = order.products.reduce((acc, item) => {
    return acc + (item.productId?.productPrice || 0) * item.quantity;
  }, 0);

  return (
    <div className="pt-28 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">

        {/* HEADER */}
        <div className="flex justify-between border-b pb-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-medium">{order._id}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-semibold text-green-600">{order.status}</p>
          </div>
        </div>

        {/* USER INFO */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Customer</h2>
          <p>{order.userId?.name}</p>
          <p className="text-sm text-gray-500">{order.userId?.email}</p>
        </div>

        {/* PRODUCTS */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Products</h2>

          <div className="space-y-4">
            {order.products.map((p, i) => (
              <div
                key={i}
                className="flex items-center justify-between border p-3 rounded-lg"
              >
                <div className="flex items-center gap-4">

                  {/* IMAGE */}
                  <img
                    src={p.productId?.productImg?.[0]?.url}
                    alt=""
                    className="w-16 h-16 object-cover rounded"
                  />

                  <div>
                    <p className="font-medium">
                      {p.productId?.productName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {p.quantity}
                    </p>
                  </div>
                </div>

                <p className="font-semibold">
                  ₹
                  {(p.productId?.productPrice || 0) * p.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* TOTAL */}
        <div className="border-t mt-6 pt-4 flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-green-600">₹{total}</span>
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;