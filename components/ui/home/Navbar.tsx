'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  FiTrendingUp, FiBell, FiLogOut, FiMenu,
  FiHome, FiUsers, FiGlobe, FiGift, FiCreditCard, FiDollarSign, FiDownload, 
  FiList, FiClock, FiAward, FiShoppingCart, FiShoppingBag, FiTag, FiTruck, FiUser
} from 'react-icons/fi';

const HomeNavbar = () => {
  const router = useRouter();

  const handleJoinNowClick = () => {
    router.push('/register');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo & Name */}
        <div className="flex items-center gap-2">
         
          <FiTrendingUp className="text-white text-lg" />
          <span className="text-lg md:text-xl font-bold text-gray-800">
            WealthBridge
          </span>
        </div>

        {/* Join Now Button */}
        <button
          onClick={handleJoinNowClick}
          className="px-4 py-2 text-sm md:text-base font-medium text-white bg-indigo-600 
                     hover:bg-indigo-700 rounded-lg transition-colors 
                     focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
        >
          Join Now
        </button>
      </div>
    </header>
  );
};

export default HomeNavbar;
