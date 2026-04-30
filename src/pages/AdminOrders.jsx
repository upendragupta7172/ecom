import React, { useEffect, useState } from "react";
import axios from "@/api/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let ignore = false;

        const loadOrders = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    toast.error("You are not logged in. Please log in as an admin.");
                    navigate('/login');
                    return;
                }

                const res = await axios.get(
                    "/api/v1/orders/admin/all",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true
                    }
                );

                if (!ignore && res.data.success) {
                    setOrders(res.data.orders);
                } else if (!ignore) {
                    toast.error(res.data.message || "Failed to fetch admin orders.");
                    setError(res.data.message || "Failed to fetch admin orders.");
                }
            } catch (err) {
                console.error("Error fetching admin orders:", err.response?.data || err.message);
                if (err.response && err.response.status === 401) {
                    toast.error("Unauthorized: Please log in again with admin credentials.");
                    localStorage.removeItem("token");
                    navigate('/login');
                } else if (err.response && err.response.status === 403) {
                    toast.error("Access denied: admin access only.");
                    navigate('/');
                } else if (!ignore) {
                    toast.error(err.response?.data?.message || "An unexpected error occurred.");
                    setError(err.response?.data?.message || "An unexpected error occurred.");
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        void loadOrders();

        return () => {
            ignore = true;
        };
    }, [navigate]);

    if (loading) return <p className="pt-28 text-center">Loading admin orders...</p>;
    if (error) return <p className="pt-28 text-center text-red-500">Error: {error}</p>;

    return (
        <div className="pt-28 px-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">All Orders (Admin)</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div>
                    {orders.map((order) => (
                        <div key={order._id} className="mb-4 rounded-xl border bg-white p-4 shadow-sm">
                            <p className="font-semibold">{order._id}</p>
                            <p className="text-sm text-gray-500">
                                {[order.userId?.firstName, order.userId?.lastName].filter(Boolean).join(" ")}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
