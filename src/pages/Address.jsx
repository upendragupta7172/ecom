import React, { useState } from 'react';
import Stepper from '../components/Stepper';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Address = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', phone: '', pincode: '', locality: '', address: '', city: '', state: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Address Saved!");
    // Agla step: Payment
    navigate('/checkout/payment'); 
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Stepper step={2} /> {/* Step 2 Active */}
      
      <div className="bg-white p-8 rounded-3xl shadow-sm border">
        <h2 className="text-2xl font-bold mb-6">Add Delivery Address</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" placeholder="Full Name" className="border p-3 rounded-xl outline-blue-500" onChange={handleChange} required />
          <input name="phone" placeholder="10-digit mobile number" className="border p-3 rounded-xl outline-blue-500" onChange={handleChange} required />
          <input name="pincode" placeholder="Pincode" className="border p-3 rounded-xl outline-blue-500" onChange={handleChange} required />
          <input name="locality" placeholder="Locality" className="border p-3 rounded-xl outline-blue-500" onChange={handleChange} required />
          <textarea name="address" placeholder="Address (Area and Street)" className="border p-3 rounded-xl outline-blue-500 md:col-span-2" rows="3" onChange={handleChange} required></textarea>
          <input name="city" placeholder="City/District/Town" className="border p-3 rounded-xl outline-blue-500" onChange={handleChange} required />
          <input name="state" placeholder="State" className="border p-3 rounded-xl outline-blue-500" onChange={handleChange} required />
          
          <Button type="submit" className="md:col-span-2 bg-blue-600 hover:bg-blue-700 py-6 text-lg rounded-2xl mt-4">
            Deliver to this Address
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Address;


