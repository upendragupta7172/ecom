import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaShoppingCart, FaMapMarkerAlt, FaEnvelope, FaUserShield } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#f8f7f2] text-[#2d3e33] py-16 px-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* SECTION 1: LOGO & SOCIAL */}
        <div className="space-y-6">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2 text-[#b08d57] font-bold text-3xl">
              <FaShoppingCart size={32} />
              <span className="tracking-widest">KART</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mt-4">
              Premium electronics for the modern lifestyle. Quality gadgets, 
              crafted for performance and durability.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-[#2d3e33] hover:text-white transition cursor-pointer">
              <FaFacebook size={18} />
            </div>
            <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-[#2d3e33] hover:text-white transition cursor-pointer">
              <FaInstagram size={18} />
            </div>
            <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-[#2d3e33] hover:text-white transition cursor-pointer">
              <FaYoutube size={18} />
            </div>
          </div>
        </div>

        {/* SECTION 2: QUICK LINKS */}
        <div className="space-y-6">
          <h3 className="font-bold text-lg tracking-widest uppercase">Quick Links</h3>
          <ul className="space-y-4 text-gray-600 text-md">
            <li className="hover:text-[#b08d57] cursor-pointer transition">About Us</li>
            <li className="hover:text-[#b08d57] cursor-pointer transition">Laptops & PC</li>
            <li className="hover:text-[#b08d57] cursor-pointer transition">Mobiles & Tablets</li>
            <li className="hover:text-[#b08d57] cursor-pointer transition">Corporate Gifting</li>
          </ul>
        </div>

        {/* SECTION 3: SUPPORT */}
        <div className="space-y-6">
          <h3 className="font-bold text-lg tracking-widest uppercase">Support</h3>
          <ul className="space-y-4 text-gray-600 text-md">
            <li className="hover:text-[#b08d57] cursor-pointer transition">Contact Us</li>
            <li className="hover:text-[#b08d57] cursor-pointer transition">Privacy Policy</li>
            <li className="hover:text-[#b08d57] cursor-pointer transition">Terms & Conditions</li>
            <li className="hover:text-[#b08d57] cursor-pointer transition">Return & Refund Policy</li>
            <li className="hover:text-[#b08d57] cursor-pointer transition">Shipping Policy</li>
          </ul>
        </div>

        {/* SECTION 4: GET IN TOUCH */}
        <div className="space-y-6">
          <h3 className="font-bold text-lg tracking-widest uppercase">Get In Touch</h3>
          <div className="space-y-5 text-gray-600 text-md">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-gray-500" />
              <span>UP Enterprises, Sector 62, Noida,<br /> Uttar Pradesh 201301</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-gray-500" />
              <span>support@kart.com</span>
            </div>
            <div className="flex items-start gap-3">
              <FaUserShield className="mt-1 text-gray-500" />
              <div>
                <p className="font-semibold text-gray-800">Grievance Officer:</p>
                <p className="text-sm">officer@kart.com</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;