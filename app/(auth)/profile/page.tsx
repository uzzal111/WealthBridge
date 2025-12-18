'use client';

import { useState } from 'react';
import { 
  FiUser, 
  FiMail, 
  FiDollarSign, 
  FiCalendar, 
  FiShield,
  FiTrendingUp,
  FiLock,
  FiKey,
  FiSettings,
  FiEye,
  FiEyeOff,
  FiBell,
  FiGlobe,
  FiCreditCard,
  FiShield as FiShield2
} from 'react-icons/fi';
import { 
  MdVerified, 
  MdWorkspacePremium,
  MdPhone,
  MdLocationOn,
  MdSecurity,
  MdPassword
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

  // Password change state
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: true,
    autoWithdrawal: false,
    darkMode: true,
    currency: 'USD'
  });

  // Handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitPasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    
    setIsChangingPassword(true);
    // Simulate API call
    setTimeout(() => {
      alert('Password changed successfully!');
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }, 1500);
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Handle settings toggle
  const toggleSetting = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 py-4 px-3 sm:py-8 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white flex items-center">
            <FiUser className="mr-3 text-blue-400" />
            My Profile
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2">Manage your account settings and security</p>
        </div>

        {/* Main Content Grid - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {/* Left Column - Profile */}
          <div className="lg:col-span-2 space-y-5 sm:space-y-6 md:space-y-8">
            {/* Profile Card - Mobile Optimized */}
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

          {/* Right Column - Settings & Security */}
          <div className="space-y-5 sm:space-y-6 md:space-y-8">
            {/* Settings Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-5 sm:p-6 md:p-8 border border-slate-700">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <FiSettings className="mr-2.5 text-blue-400" />
                Account Settings
              </h3>
              
              <div className="space-y-4 sm:space-y-5">
                {/* Notification Settings */}
                <div className="space-y-3">
                  <h4 className="text-slate-300 font-semibold text-sm sm:text-base flex items-center">
                    <FiBell className="mr-2" />
                    Notifications
                  </h4>
                  
                  <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                    <div>
                      <p className="text-white text-sm sm:text-base">Email Notifications</p>
                      <p className="text-slate-400 text-xs">Receive updates via email</p>
                    </div>
                    <button 
                      onClick={() => toggleSetting('emailNotifications')}
                      className={`w-12 h-6 rounded-full transition-colors ${settings.emailNotifications ? 'bg-green-500' : 'bg-slate-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${settings.emailNotifications ? 'translate-x-7' : 'translate-x-1'} mt-0.5`} />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                    <div>
                      <p className="text-white text-sm sm:text-base">SMS Notifications</p>
                      <p className="text-slate-400 text-xs">Receive SMS alerts</p>
                    </div>
                    <button 
                      onClick={() => toggleSetting('smsNotifications')}
                      className={`w-12 h-6 rounded-full transition-colors ${settings.smsNotifications ? 'bg-green-500' : 'bg-slate-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${settings.smsNotifications ? 'translate-x-7' : 'translate-x-1'} mt-0.5`} />
                    </button>
                  </div>
                </div>
                
                {/* Display Settings */}
                <div className="space-y-3">
                  
                  <div className="p-3 bg-slate-800/30 rounded-lg">
                    <p className="text-white text-sm sm:text-base mb-2">Currency</p>
                    <select 
                      value={settings.currency}
                      onChange={(e) => setSettings(prev => ({ ...prev, currency: e.target.value }))}
                      className="w-full bg-slate-700 text-white rounded-lg p-2 text-sm"
                    >
                      <option value="USD">USDT - US Dollar</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Change Password Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-5 sm:p-6 md:p-8 border border-slate-700">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <MdPassword className="mr-2.5 text-red-400" />
                Change Password
              </h3>
              
              <div className="space-y-4">
                {/* Current Password */}
                <div>
                  <label className="block text-slate-300 text-sm sm:text-base mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword.current ? "text" : "password"}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter current password"
                      className="w-full bg-slate-700 text-white rounded-lg p-3 pr-10 text-sm sm:text-base"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword.current ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
                
                {/* New Password */}
                <div>
                  <label className="block text-slate-300 text-sm sm:text-base mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword.new ? "text" : "password"}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password"
                      className="w-full bg-slate-700 text-white rounded-lg p-3 pr-10 text-sm sm:text-base"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword.new ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Minimum 8 characters with uppercase, lowercase & number</p>
                </div>
                
                {/* Confirm Password */}
                <div>
                  <label className="block text-slate-300 text-sm sm:text-base mb-2">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword.confirm ? "text" : "password"}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm new password"
                      className="w-full bg-slate-700 text-white rounded-lg p-3 pr-10 text-sm sm:text-base"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword.confirm ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
                
                {/* Password Requirements */}
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <p className="text-slate-300 text-sm font-semibold mb-2">Password Requirements:</p>
                  <ul className="text-xs text-slate-400 space-y-1">
                    <li className="flex items-center">
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${passwordData.newPassword.length >= 8 ? 'bg-green-500' : 'bg-red-500'}`} />
                      At least 8 characters
                    </li>
                    <li className="flex items-center">
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${/[A-Z]/.test(passwordData.newPassword) ? 'bg-green-500' : 'bg-red-500'}`} />
                      One uppercase letter
                    </li>
                    <li className="flex items-center">
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${/[a-z]/.test(passwordData.newPassword) ? 'bg-green-500' : 'bg-red-500'}`} />
                      One lowercase letter
                    </li>
                    <li className="flex items-center">
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${/[0-9]/.test(passwordData.newPassword) ? 'bg-green-500' : 'bg-red-500'}`} />
                      One number
                    </li>
                  </ul>
                </div>
                
                {/* Submit Button */}
                <button
                  onClick={submitPasswordChange}
                  disabled={isChangingPassword}
                  className={`w-full py-3 text-sm sm:text-base font-semibold rounded-lg transition-all ${
                    isChangingPassword 
                      ? 'bg-slate-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                  } text-white`}
                >
                  {isChangingPassword ? 'Changing Password...' : 'Change Password'}
                </button>
                
                {/* Security Tips */}
                <div className="text-center">
                  <p className="text-xs text-slate-400">
                    <FiShield2 className="inline mr-1" />
                    For security reasons, password changes require re-login
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>    
      </div>
    </div>
  );
}