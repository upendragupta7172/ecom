// aaj

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "@/redux/userSlice";
import { clearCart } from "@/redux/cartSlice";

const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
    dispatch(clearCart());
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="pt-28 text-center">
        <p>Please login first</p>
      </div>
    );
  }

  return (
    <div className="pt-28 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">

        {/* 🔥 HEADER */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center text-white text-2xl font-bold">
            {user.firstName?.charAt(0)}
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* 🔥 OPTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

          {/* MY ORDERS */}
          <div
            onClick={() => navigate("/my-orders")}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
          >
            <h3 className="text-lg font-semibold mb-2">My Orders</h3>
            <p className="text-gray-500 text-sm">
              Track, return or buy things again
            </p>
          </div>

          {/* ADDRESS (future feature) */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">Addresses</h3>
            <p className="text-gray-500 text-sm">
              Manage your saved addresses
            </p>
          </div>

          {/* ACCOUNT SETTINGS */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
            <p className="text-gray-500 text-sm">
              Update profile & password
            </p>
          </div>

        </div>

        {/* 🔥 LOGOUT */}
        <div className="mt-8">
          <button
            onClick={logoutHandler}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;