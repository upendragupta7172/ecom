import React from 'react';
import { ChevronRight, ShoppingBag, MapPin, CreditCard } from 'lucide-react';

const Stepper = ({ step }) => {
  const steps = [
    { id: 1, label: 'BAG', icon: <ShoppingBag size={16} /> },
    { id: 2, label: 'ADDRESS', icon: <MapPin size={16} /> },
    { id: 3, label: 'PAYMENT', icon: <CreditCard size={16} /> },
  ];

  return (
    <div className="flex items-center justify-center gap-4 mb-10 py-4 overflow-x-auto">
      {steps.map((s, index) => (
        <React.Fragment key={s.id}>
          <div className={`flex items-center gap-2 ${step >= s.id ? 'text-blue-600' : 'text-gray-400'}`}>
            <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold transition-colors ${step >= s.id ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              {s.icon}
            </span>
            <span className="font-bold text-xs sm:text-sm tracking-widest">{s.label}</span>
          </div>
          {index < steps.length - 1 && <ChevronRight size={18} className="text-gray-300" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;