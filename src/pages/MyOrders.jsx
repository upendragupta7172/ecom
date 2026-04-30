import React, { useEffect, useState } from "react";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const navigate = useNavigate();

    const cancelOrder = async (id) => {
        try {
            const res = await axios.put(
                `/api/v1/orders/cancel/${id}`,
                {},
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    withCredentials: true
                }
            );

            if (res.data.success) {
                toast.success("Order cancelled");
                setRefreshKey((currentKey) => currentKey + 1);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Cancel failed");
        }
    };

    useEffect(() => {
        let ignore = false;

        const loadOrders = async () => {
            try {
                const res = await axios.get(
                    "/api/v1/orders/my",
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                        withCredentials: true
                    }
                );

                if (!ignore && res.data.success) {
                    setOrders(res.data.orders);
                }
            } catch (error) {
                if (!ignore) {
                    console.error("Error fetching orders", error);
                }
            }
        };

        void loadOrders();

        return () => {
            ignore = true;
        };
    }, [refreshKey]);

    const getStatusColor = (status) => {
        switch (status) {
            case "Delivered":
                return "bg-green-100 text-green-700";
            case "Shipped":
                return "bg-blue-100 text-blue-700";
            case "Packed":
                return "bg-purple-100 text-purple-700";
            case "Processing":
                return "bg-yellow-100 text-yellow-700";
            case "Cancelled":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-200";
        }
    };

    const steps = [
        "Processing",
        "Packed",
        "Shipped",
        "Out for Delivery",
        "Delivered",
    ];

    return (
        <div className="pt-28 px-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">My Orders</h1>

            {orders.length === 0 ? (
                <div className="text-center mt-20 text-gray-500">
                    <p>No orders found</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => {
                        const total = order.products.reduce((acc, item) => {
                            return acc + (item.productId?.productPrice || 0) * item.quantity;
                        }, 0);

                        const currentStep = steps.indexOf(order.status);

                        return (
                            <div
                                key={order._id}
                                className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-lg transition"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Order ID: {order._id}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <span
                                        className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                            order.status
                                        )}`}
                                    >
                                        {order.status}
                                    </span>
                                </div>

                                {order.status !== "Cancelled" && (
                                    <div className="flex items-center justify-between mb-6">
                                        {steps.map((step, index) => (
                                            <div key={index} className="flex-1 text-center">
                                                <div
                                                    className={`w-6 h-6 mx-auto rounded-full ${
                                                        index <= currentStep ? "bg-green-500" : "bg-gray-300"
                                                    }`}
                                                ></div>
                                                <p className="text-xs mt-1">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="space-y-3">
                                    {order.products.map((product, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center border p-3 rounded-lg"
                                        >
                                            <div>
                                                <p className="font-medium">
                                                    {product.productId?.productName}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Qty: {product.quantity}
                                                </p>
                                            </div>

                                            <p className="font-semibold text-gray-700">
                                                Rs. {(product.productId?.productPrice || 0) * product.quantity}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center mt-5 pt-4 border-t">
                                    <p className="font-semibold text-lg">Total</p>
                                    <p className="text-green-600 text-lg font-bold">
                                        Rs. {total}
                                    </p>
                                </div>

                                <div className="flex justify-end gap-3 mt-4">
                                    {(order.status === "Processing" || order.status === "Packed") && (
                                        <button
                                            onClick={() => cancelOrder(order._id)}
                                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm"
                                        >
                                            Cancel Order
                                        </button>
                                    )}

                                    <button
                                        onClick={() => navigate(`/order/${order._id}`)}
                                        className="bg-pink-600 text-white px-4 py-1 rounded hover:bg-pink-700 text-sm"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
