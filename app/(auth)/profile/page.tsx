'use client';

import { useState } from 'react';
import { 
  FiUser, 
  FiMail, 
  FiDollarSign, 
  FiCalendar, 
  FiShield,
  FiTrendingUp
} from 'react-icons/fi';
import { 
  MdVerified, 
  MdWorkspacePremium,
  MdPhone,
  MdLocationOn
} from 'react-icons/md';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
  membershipLevel: string;
  verificationStatus: string;
  country: string;
}

interface IncomeData {
  today: {
    total: number;
    commission: number;
    bonus: number;
    investment: number;
  };
  totalEarnings: number;
  availableBalance: number;
}

export default function UserProfilePage() {
  // User Profile Data
  const [userProfile] = useState<UserProfile>({
    id: 'USR001',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=center',
    joinDate: '2024-01-15',
    membershipLevel: 'Premium',
    verificationStatus: 'verified',
    country: 'United States'
  });

  // Income Data
  const [incomeData] = useState<IncomeData>({
    today: {
      total: 1250,
      commission: 850,
      bonus: 300,
      investment: 100
    },
    totalEarnings: 125000,
    availableBalance: 8450.75
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 py-4 px-3 sm:py-8 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Content Grid - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
          {/* Left Column - Profile */}
          <div className="space-y-5 sm:space-y-6 md:space-y-8">
            {/* Profile Card - Mobile Optimized - CENTERED PROFILE */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-5 sm:p-6 md:p-8 border border-slate-700">
              {/* CENTERED PROFILE PICTURE SECTION */}
              <div className="flex flex-col items-center mb-5 sm:mb-6">
                <div className="relative mb-4">
                  <img 
                    src={userProfile.avatar} 
                    alt={userProfile.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full border-4 border-blue-500 object-cover shadow-lg mx-auto"
                  />
                  <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-green-500 text-white p-1.5 sm:p-2 rounded-full">
                    <MdVerified className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                </div>
                
                <div className="text-center w-full">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">{userProfile.name}</h2>
                  <div className="flex items-center justify-center text-blue-300 mb-3 text-sm sm:text-base">
                    <FiMail className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="truncate max-w-[250px]">{userProfile.email}</span>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    <span className="px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-full text-sm sm:text-base font-semibold flex items-center">
                      <MdWorkspacePremium className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                      {userProfile.membershipLevel}
                    </span>
                    <span className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm sm:text-base font-semibold">
                      {userProfile.verificationStatus}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Profile Details - Mobile Optimized */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-slate-700">
                  <span className="text-slate-400 text-sm sm:text-base flex items-center">
                    <FiUser className="mr-3 w-4 h-4 sm:w-5 sm:h-5" />
                    User ID
                  </span>
                  <span className="text-white text-sm sm:text-base font-mono bg-slate-800/50 px-3 py-1 rounded">{userProfile.id}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-slate-700">
                  <span className="text-slate-400 text-sm sm:text-base flex items-center">
                    <FiCalendar className="mr-3 w-4 h-4 sm:w-5 sm:h-5" />
                    Join Date
                  </span>
                  <span className="text-white text-sm sm:text-base">{userProfile.joinDate}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-slate-700">
                  <span className="text-slate-400 text-sm sm:text-base flex items-center">
                    <MdPhone className="mr-3 w-4 h-4 sm:w-5 sm:h-5" />
                    Phone
                  </span>
                  <span className="text-white text-sm sm:text-base">{userProfile.phone}</span>
                </div>
                
                <div className="flex justify-between items-center py-3">
                  <span className="text-slate-400 text-sm sm:text-base flex items-center">
                    <MdLocationOn className="mr-3 w-4 h-4 sm:w-5 sm:h-5" />
                    Country
                  </span>
                  <span className="text-white text-sm sm:text-base">{userProfile.country}</span>
                </div>
              </div>
            </div>

            {/* Today's Income - Mobile Optimized */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-5 sm:p-6 md:p-8 border border-slate-700">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center">
                  <FiTrendingUp className="mr-2.5 text-green-400 w-4 h-4 sm:w-5 sm:h-5" />
                  Today's Income
                </h3>
                <span className="text-slate-400 text-xs sm:text-sm">Just now</span>
              </div>
              
              <div className="text-center mb-4 sm:mb-6">
                <p className="text-slate-400 text-xs sm:text-sm mb-1">Total Earnings Today</p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400">${incomeData.today.total.toLocaleString()}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-slate-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-700">
                  <p className="text-slate-400 text-xs sm:text-sm">Commission</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-400">${incomeData.today.commission}</p>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-700">
                  <p className="text-slate-400 text-xs sm:text-sm">Bonus</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-400">${incomeData.today.bonus}</p>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-700">
                  <p className="text-slate-400 text-xs sm:text-sm">Investment</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-purple-400">${incomeData.today.investment}</p>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-700">
                  <p className="text-slate-400 text-xs sm:text-sm">Balance</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-400">${incomeData.availableBalance.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Earnings Summary */}
          <div className="space-y-5 sm:space-y-6 md:space-y-8">
            {/* Total Earnings Summary - Mobile Optimized */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-5 sm:p-6 md:p-8 border border-slate-700">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">
                Earnings Summary
              </h3>
              
              <div className="text-center mb-4 sm:mb-6">
                <p className="text-slate-400 text-xs sm:text-sm">Total Lifetime Earnings</p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400">${incomeData.totalEarnings.toLocaleString()}</p>
              </div>
              
              {/* Earnings Breakdown - Mobile Optimized */}
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex justify-between items-center p-3 sm:p-4 bg-slate-800/30 rounded-lg sm:rounded-xl">
                  <span className="text-slate-300 text-sm sm:text-base">Commission</span>
                  <span className="text-white font-bold text-sm sm:text-base">$48,500</span>
                </div>
                
                <div className="flex justify-between items-center p-3 sm:p-4 bg-slate-800/30 rounded-lg sm:rounded-xl">
                  <span className="text-slate-300 text-sm sm:text-base">Investment</span>
                  <span className="text-green-400 font-bold text-sm sm:text-base">$32,750</span>
                </div>
                
                <div className="flex justify-between items-center p-3 sm:p-4 bg-slate-800/30 rounded-lg sm:rounded-xl">
                  <span className="text-slate-300 text-sm sm:text-base">Bonus</span>
                  <span className="text-yellow-400 font-bold text-sm sm:text-base">$18,250</span>
                </div>
                
                <div className="flex justify-between items-center p-3 sm:p-4 bg-slate-800/30 rounded-lg sm:rounded-xl">
                  <span className="text-slate-300 text-sm sm:text-base">Salary</span>
                  <span className="text-blue-400 font-bold text-sm sm:text-base">$25,500</span>
                </div>
              </div>
              
              {/* Withdraw Section - Mobile Optimized */}
              <div className="pt-4 sm:pt-6 border-t border-slate-700">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <span className="text-white font-semibold text-sm sm:text-base">Available Balance</span>
                  <span className="text-xl sm:text-2xl font-bold text-white">${incomeData.availableBalance.toLocaleString()}</span>
                </div>
                <button className="w-full py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg sm:rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300">
                  Withdraw Funds
                </button>
              </div>
            </div>
          </div>
        </div>    
      </div>
    </div>
  );
}