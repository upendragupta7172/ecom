


import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 STATUS FLOW (REAL ECOMMERCE LOGIC)
  const statusFlow = {
    Processing: "Packed",
    Packed: "Shipped",
    Shipped: "Out for Delivery",
    "Out for Delivery": "Delivered",
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/v1/orders/admin/all",
        { withCredentials: true }
      );

      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔥 STATUS UPDATE (FLOW CONTROLLED)
  const updateStatus = async (id, currentStatus) => {
    const nextStatus = statusFlow[currentStatus];

    if (!nextStatus) return;

    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/orders/status/${id}`,
        { status: nextStatus },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(`Status updated → ${nextStatus}`);
        fetchOrders();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="pt-28 px-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Orders Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-4 text-left">User</th>
                  <th className="p-4 text-left">Products</th>
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => {
                  const total = order.products.reduce((acc, item) => {
                    return (
                      acc +
                      (item.productId?.productPrice || 0) * item.quantity
                    );
                  }, 0);

                  return (
                    <tr
                      key={order._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      {/* USER */}
                      <td className="p-4">
                        <p className="font-medium text-gray-800">
                          {order.userId?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.userId?.email}
                        </p>
                      </td>

                      {/* PRODUCTS */}
                      <td className="p-4">
                        <div className="space-y-1">
                          {order.products.map((p, i) => (
                            <div
                              key={i}
                              className="text-gray-700 text-sm flex gap-2"
                            >
                              <span className="font-medium">
                                {p.productId?.productName}
                              </span>
                              <span className="text-gray-500">
                                × {p.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* AMOUNT */}
                      <td className="p-4 font-semibold text-green-600">
                        ₹{total}
                      </td>

                      {/* STATUS */}
                      <td className="p-4">
                        <div className="flex flex-col gap-2">
                          
                          {/* Current Status */}
                          <span className="px-3 py-1 rounded-full bg-gray-200 text-sm w-fit">
                            {order.status}
                          </span>

                          {/* Next Step Button */}
                          {order.status !== "Delivered" && (
                            <button
                              onClick={() =>
                                updateStatus(order._id, order.status)
                              }
                              className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-purple-700 transition"
                            >
                              Move to → {statusFlow[order.status]}
                            </button>
                          )}

                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;