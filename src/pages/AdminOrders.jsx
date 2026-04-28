import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchAllOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("You are not logged in. Please log in as an admin.");
                setLoading(false);
                navigate('/login'); // Redirect to login if no token
                return;
            }

            const res = await axios.get( // Ensure this is the correct URL for your local backend
                "http://localhost:5000/api/v1/orders/admin/all", // Use relative path for deployment
                {
                    headers: { Authorization: `Bearer ${token}` }, // Attach the token here
                    withCredentials: true // Important if your backend uses cookies for session management
                }
            );

            if (res.data.success) {
                setOrders(res.data.orders);
            } else {
                toast.error(res.data.message || "Failed to fetch admin orders.");
                setError(res.data.message || "Failed to fetch admin orders.");
            }
        } catch (err) {
            console.error("Error fetching admin orders:", err.response?.data || err.message);
            if (err.response && err.response.status === 401) {
                toast.error("Unauthorized: Please log in again with admin credentials.");
                localStorage.removeItem("token"); // Clear invalid token
                navigate('/login');
            } else if (err.response && err.response.status === 403) {
                toast.error("Access Denied: You do not have admin privileges.");
                navigate('/'); // Redirect non-admins
            } else {
                toast.error(err.response?.data?.message || "An unexpected error occurred.");
            }
            setError(err.response?.data?.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    if (loading) return <p className="pt-28 text-center">Loading admin orders...</p>;
    if (error) return <p className="pt-28 text-center text-red-500">Error: {error}</p>;

    return (
        <div className="pt-28 px-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">All Orders (Admin)</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div>
                    {/* Render your admin orders here */}
                    {/* Example: orders.map(order => <div key={order._id}>{order._id} - {order.userId?.firstName}</div>) */}
                </div>
            )}
        </div>
    );
};

export default AdminOrders;