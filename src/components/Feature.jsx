import React from 'react';
import { Truck, ShieldCheck, Headphones } from 'lucide-react';

const Features = () => {
  const featureList = [
    {
      icon: <Truck className="text-blue-600" size={24} />,
      title: "Free Shipping",
      desc: "On orders over $50",
      bgColor: "bg-blue-100",
    },
    {
      icon: <ShieldCheck className="text-green-600" size={24} />,
      title: "Secure Payment",
      desc: "100% secure transactions",
      bgColor: "bg-green-100",
    },
    {
      icon: <Headphones className="text-purple-600" size={24} />,
      title: "24/7 Support",
      desc: "Always here to help",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureList.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-4">
              {/* Icon Circle */}
              <div className={`${item.bgColor} p-4 rounded-full flex items-center justify-center`}>
                {item.icon}
              </div>
              
              {/* Text Content */}
              <div>
                <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;