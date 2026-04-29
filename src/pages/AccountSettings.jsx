// aaj

import React, { useEffect, useState } from "react";
import axios from "@/api/axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";

const AccountSettings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [loading, setLoading] = useState(false);

  // 🔥 AUTO FILL USER DATA
  // useEffect(() => {
  //   if (user) {
  //     setForm({
  //       name: user.name || "",
  //       email: user.email || "",
  //       phone: user.phone || ""
  //     });
  //   }
  // }, [user]);


  // ... existing code ...

  // 🔥 AUTO FILL USER DATA (Is portion ko update karein)
  useEffect(() => {
    if (user) {
      setForm({
        // Model mein 'firstName' hai, isliye wahi use hoga
        name: user.firstName || "", 
        email: user.email || "",
        // Model mein 'phoneNo' hai, isliye wahi use hoga
        phone: user.phoneNo || "" 
      });
    }
  }, [user]);

// ... existing code ...

  // 🔥 HANDLE CHANGE
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 UPDATE PROFILE
  const updateProfile = async () => {
    try {
      setLoading(true);

      const res = await axios.put(
        "/api/user/profile/update",

        {
          name: form.name,
          phone: form.phone
        },
        { 
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true 
        }
      );

      if (res.data.success) {
        toast.success("Profile updated");

        // 🔥 UPDATE REDUX USER
        dispatch(setUser(res.data.user));
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-6">
          Account Settings
        </h1>

        {/* PROFILE INFO */}
        <div className="space-y-4">

          {/* NAME */}
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={changeHandler}
              className="w-full border p-3 rounded-lg mt-1 outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* EMAIL (READ ONLY) */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={form.email}
              disabled
              className="w-full border p-3 rounded-lg mt-1 bg-gray-100"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm text-gray-600">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={changeHandler}
              className="w-full border p-3 rounded-lg mt-1 outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={updateProfile}
            disabled={loading}
            className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default AccountSettings;
