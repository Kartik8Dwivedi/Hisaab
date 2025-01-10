import { CalculatorIcon } from 'lucide-react';
import React from 'react'

const Logo = () => (
  <div className="flex items-center gap-3 p-2">
    <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200">
      <CalculatorIcon className="h-6 w-6 text-white md:h-7 md:w-7" />
    </div>
    <div>
      <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
        Hisaab
      </h1>
      <p className="text-xs md:text-sm text-gray-700">
        Your Personal Calculator Bot
      </p>
    </div>
  </div>
);

export default Logo