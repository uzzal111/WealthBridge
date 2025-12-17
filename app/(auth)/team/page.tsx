"use client";

import React, { useState } from "react";
import { 
  FiUsers, 
  FiShare2, 
  FiCopy, 
  FiCheck, 
  FiDollarSign, 
  FiTrendingUp, 
  FiDownload, 
  FiUser,
  FiPhone,
  FiActivity,
  FiArrowUp,
  FiArrowDown,
  FiStar,
  FiAward,
  FiLink,
  FiFacebook,
  FiTwitter,
  FiMessageSquare,
  FiMail,
  FiChevronDown,
  FiChevronUp,
  FiPlus,
  FiMinus,
  FiSmartphone,
  FiGlobe,
  FiBarChart2,
  FiCreditCard,
  FiCalendar,
  FiHelpCircle,
  FiZap,
  FiTarget,
  FiBell
} from "react-icons/fi";
import { 
  FaWhatsapp, 
  FaTelegram, 
  FaUserCircle,
  FaChartLine,
  FaLevelUpAlt,
  FaLevelDownAlt,
  FaIdBadge,
  FaMoneyBillWave,
  FaPercentage,
  FaQrcode,
  FaRegCopy,
  FaRegShareSquare,
  FaRegChartBar
} from "react-icons/fa";
import { 
  IoLogoWhatsapp,
  IoLogoFacebook,
  IoLogoTwitter,

  IoShareSocialSharp
} from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";


export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const [expandedLevel, setExpandedLevel] = useState<number | null>(1);
  const [activeShareTab, setActiveShareTab] = useState<'direct' | 'social'>('direct');
  const [showQRCode, setShowQRCode] = useState(false);
  const [activeStatFilter, setActiveStatFilter] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [notification, setNotification] = useState<string | null>(null);
  
  const referralLink = "https://wealthbridge.com/ref/aj12345";
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    showNotification("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Level wise members data
  const levelData = [
    {
      level: 1,
      commission: "10%",
      icon: <FaLevelUpAlt className="text-green-400" />,
      color: "from-green-900/30 to-emerald-900/20",
      border: "border-green-700/30",
      textColor: "text-green-400",
      members: [
        { id: 1, name: "John Smith", phone: "+1 555 123 4567", status: "active", deposit: 2500, withdraw: 1200, joinDate: "15 Jan", profit: 450 },
        { id: 2, name: "Sarah Johnson", phone: "+1 555 987 6543", status: "active", deposit: 3500, withdraw: 2000, joinDate: "20 Jan", profit: 620 },
        { id: 3, name: "Mike Williams", phone: "+1 555 456 7890", status: "inactive", deposit: 1500, withdraw: 800, joinDate: "01 Feb", profit: 230 },
        { id: 4, name: "Emma Davis", phone: "+1 555 789 0123", status: "active", deposit: 5000, withdraw: 3000, joinDate: "10 Feb", profit: 890 },
      ]
    },
    {
      level: 2,
      commission: "5%",
      icon: <FaLevelUpAlt className="text-blue-400" />,
      color: "from-blue-900/30 to-cyan-900/20",
      border: "border-blue-700/30",
      textColor: "text-blue-400",
      members: [
        { id: 5, name: "Robert Brown", phone: "+1 555 234 5678", status: "active", deposit: 2800, withdraw: 1500, joinDate: "15 Feb", profit: 510 },
        { id: 6, name: "Lisa Wilson", phone: "+1 555 345 6789", status: "active", deposit: 4200, withdraw: 2500, joinDate: "25 Jan", profit: 680 },
        { id: 7, name: "David Lee", phone: "+1 555 567 8901", status: "active", deposit: 3200, withdraw: 1800, joinDate: "05 Feb", profit: 520 },
      ]
    },
    {
      level: 3,
      commission: "2%",
      icon: <FaLevelDownAlt className="text-purple-400" />,
      color: "from-purple-900/30 to-pink-900/20",
      border: "border-purple-700/30",
      textColor: "text-purple-400",
      members: [
        { id: 8, name: "Jennifer Taylor", phone: "+1 555 678 9012", status: "active", deposit: 3800, withdraw: 2200, joinDate: "12 Feb", profit: 610 },
        { id: 9, name: "Michael Clark", phone: "+1 555 789 1234", status: "inactive", deposit: 2100, withdraw: 1200, joinDate: "18 Feb", profit: 320 },
      ]
    }
  ];

  // Top stats with dynamic filtering
  const statsData = {
    daily: {
      totalMembers: 6,
      activeMembers: 5,
      totalDeposit: 12500,
      totalWithdraw: 6800,
      totalEarned: 1850,
      referralBonus: 420
    },
    weekly: {
      totalMembers: 48,
      activeMembers: 32,
      totalDeposit: 85450,
      totalWithdraw: 45200,
      totalEarned: 12500,
      referralBonus: 3250
    },
    monthly: {
      totalMembers: 156,
      activeMembers: 118,
      totalDeposit: 245000,
      totalWithdraw: 132500,
      totalEarned: 38500,
      referralBonus: 9850
    }
  };

  const topStats = statsData[activeStatFilter];

  // Direct share options
  const directShareOptions = [
    { 
      platform: "Copy Link", 
      icon: copied ? <FiCheck /> : <FiCopy />, 
      color: "bg-purple-500/10 hover:bg-purple-500/20 active:bg-purple-500/30", 
      text: "text-purple-400",
      action: copyToClipboard
    },
    { 
      platform: "SMS", 
      icon: <FiMessageSquare />, 
      color: "bg-green-600/10 hover:bg-green-600/20 active:bg-green-600/30", 
      text: "text-green-400",
      action: () => showNotification("SMS sharing feature coming soon!")
    },
    { 
      platform: "Email", 
      icon: <FiMail />, 
      color: "bg-red-500/10 hover:bg-red-500/20 active:bg-red-500/30", 
      text: "text-red-400",
      action: () => showNotification("Email sharing feature coming soon!")
    },
  ];

  // Social share options
  const socialShareOptions = [
    { 
      platform: "WhatsApp", 
      icon: <IoLogoWhatsapp />, 
      color: "bg-green-500/10 hover:bg-green-500/20 active:bg-green-500/30", 
      text: "text-green-400",
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(referralLink)}`, '_blank')
    },
    { 
      platform: "Telegram", 
     
      color: "bg-blue-500/10 hover:bg-blue-500/20 active:bg-blue-500/30", 
      text: "text-blue-400",
      action: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}`, '_blank')
    },
    { 
      platform: "Facebook", 
      icon: <IoLogoFacebook />, 
      color: "bg-blue-600/10 hover:bg-blue-600/20 active:bg-blue-600/30", 
      text: "text-blue-300",
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, '_blank')
    },
    { 
      platform: "Twitter", 
      icon: <IoLogoTwitter />, 
      color: "bg-sky-500/10 hover:bg-sky-500/20 active:bg-sky-500/30", 
      text: "text-sky-400",
      action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}`, '_blank')
    },
  ];

  const toggleLevel = (level: number) => {
    setExpandedLevel(expandedLevel === level ? null : level);
  };

  const toggleQRCode = () => {
    setShowQRCode(!showQRCode);
  };

  // Format large numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    }
    if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}k`;
    }
    return `$${num.toLocaleString()}`;
  };

  // Format date
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-gray-950 p-3 sm:p-4 md:p-6">
      {/* Notification Banner */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm px-4"
          >
            <div className="bg-gradient-to-r from-green-600/90 to-emerald-600/90 backdrop-blur-lg rounded-xl p-3 shadow-lg border border-green-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FiCheck className="w-4 h-4 text-white mr-2" />
                  <span className="text-white text-sm font-medium">{notification}</span>
                </div>
                <button 
                  onClick={() => setNotification(null)}
                  className="text-white/80 hover:text-white"
                >
                  <FiMinus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        
        {/* Header - Fully Responsive */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg mr-3">
                  <IoShareSocialSharp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white truncate">
                    Referral Program
                  </h1>
                  <p className="text-slate-400 text-xs sm:text-sm md:text-base mt-1">
                    {getCurrentDate()}
                  </p>
                </div>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm md:text-base">
                Invite friends & earn commission on their investments
              </p>
            </div>
            <div className="flex gap-2">
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-3 sm:px-4 py-2 rounded-lg border border-blue-500/30 flex items-center">
                <FiZap className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 mr-2" />
                <span className="text-xs sm:text-sm font-semibold text-white">Earn up to 10%</span>
              </div>
              <button className="p-2 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:bg-slate-700/50 transition-colors">
                <FiBell className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
              </button>
            </div>
          </div>

          {/* Stats Filter */}
          <div className="flex items-center justify-between mt-4 sm:mt-6">
            <h2 className="text-sm sm:text-base font-semibold text-white">Team Performance</h2>
            <div className="flex bg-slate-800/50 rounded-lg p-1">
              {(['daily', 'weekly', 'monthly'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveStatFilter(filter)}
                  className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md transition-all capitalize ${
                    activeStatFilter === filter 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Top Stats Cards - Mobile First Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
          {/* Total Team */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-3 sm:p-4 border border-slate-700/50 active:border-blue-500/50 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 sm:p-2 bg-blue-600/20 rounded-lg">
                <FiUsers className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-400" />
              </div>
              <span className="text-xs text-green-400 font-medium bg-green-500/10 px-1.5 py-0.5 rounded">↑ 12%</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm mb-1 truncate">Total Team</p>
            <p className="text-base sm:text-lg md:text-xl font-bold text-white truncate">{topStats.totalMembers}</p>
            <div className="flex items-center mt-2">
              <div className="w-full bg-slate-700/50 rounded-full h-1.5">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${(topStats.activeMembers / topStats.totalMembers) * 100}%` }}
                />
              </div>
              <span className="text-xs text-blue-400 ml-2 whitespace-nowrap">
                {topStats.activeMembers} Active
              </span>
            </div>
          </motion.div>

          {/* Total Deposit */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-3 sm:p-4 border border-slate-700/50 active:border-emerald-500/50 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 sm:p-2 bg-emerald-600/20 rounded-lg">
                <FiArrowUp className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-emerald-400" />
              </div>
              <span className="text-xs text-emerald-400 font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded">↑ 8%</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm mb-1 truncate">Total Deposit</p>
            <p className="text-base sm:text-lg md:text-xl font-bold text-white truncate">{formatNumber(topStats.totalDeposit)}</p>
            <div className="flex items-center mt-2">
              <FiStar className="w-2 h-2 sm:w-3 sm:h-3 text-emerald-400 mr-1" />
              <span className="text-xs text-emerald-400 truncate">Team Investment</span>
            </div>
          </motion.div>

          {/* Total Withdraw */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-3 sm:p-4 border border-slate-700/50 active:border-amber-500/50 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 sm:p-2 bg-amber-600/20 rounded-lg">
                <FiArrowDown className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-amber-400" />
              </div>
              <span className="text-xs text-amber-400 font-medium bg-amber-500/10 px-1.5 py-0.5 rounded">↑ 5%</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm mb-1 truncate">Total Withdraw</p>
            <p className="text-base sm:text-lg md:text-xl font-bold text-white truncate">{formatNumber(topStats.totalWithdraw)}</p>
            <div className="flex items-center mt-2">
              <FiUser className="w-2 h-2 sm:w-3 sm:h-3 text-amber-400 mr-1" />
              <span className="text-xs text-amber-400 truncate">Team Earnings</span>
            </div>
          </motion.div>

          {/* Your Earnings */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-3 sm:p-4 border border-slate-700/50 active:border-purple-500/50 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 sm:p-2 bg-purple-600/20 rounded-lg">
                <FiAward className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-400" />
              </div>
              <span className="text-xs text-purple-400 font-medium bg-purple-500/10 px-1.5 py-0.5 rounded">↑ 15%</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm mb-1 truncate">Your Earnings</p>
            <p className="text-base sm:text-lg md:text-xl font-bold text-white truncate">{formatNumber(topStats.totalEarned)}</p>
            <div className="flex items-center mt-2">
              <FaChartLine className="w-2 h-2 sm:w-3 sm:h-3 text-purple-400 mr-1" />
              <span className="text-xs text-purple-400 truncate">
                ${topStats.referralBonus} Bonus
              </span>
            </div>
          </motion.div>
        </div>

        {/* Referral Link Section - Fully Responsive */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-8 border border-slate-700/50">
          <div className="mb-3 sm:mb-4 md:mb-6">
            <div className="flex items-center mb-2">
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-600/20 to-blue-700/20 rounded-lg mr-2 sm:mr-3">
                <FiShare2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              </div>
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-white">Your Referral Link</h2>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm">
              Share this link and earn 10% commission from Level 1 referrals
            </p>
          </div>
          
          {/* Link Display */}
          <div className="mb-3 sm:mb-4 md:mb-6">
            <div className="bg-slate-800/70 rounded-lg sm:rounded-xl p-3 border border-slate-700 mb-3">
              <div className="flex items-center">
                <FiLink className="text-blue-400 mr-2 sm:mr-3 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                <code className="text-slate-300 font-mono text-xs sm:text-sm truncate flex-1 select-all">
                  {referralLink}
                </code>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={copyToClipboard}
                className="flex-1 px-4 py-3 sm:py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 rounded-lg sm:rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 active:scale-95"
              >
                {copied ? (
                  <>
                    <FiCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">Copied!</span>
                  </>
                ) : (
                  <>
                    <FiCopy className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">Copy Link</span>
                  </>
                )}
              </button>
              
              <button
                onClick={toggleQRCode}
                className="flex-1 px-4 py-3 sm:py-3.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 active:from-purple-800 active:to-purple-900 rounded-lg sm:rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 active:scale-95"
              >
                <FaQrcode className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">QR Code</span>
              </button>
            </div>
          </div>

          {/* QR Code Modal */}
          <AnimatePresence>
            {showQRCode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <div className="flex flex-col items-center">
                    
                    <p className="text-slate-400 text-sm text-center mb-3">
                      Scan QR code to share referral link
                    </p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(referralLink);
                        showNotification("QR Code copied as image!");
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 rounded-lg text-white text-sm font-medium transition-all duration-300 active:scale-95"
                    >
                      Save QR Code
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Commission Levels - Horizontal Scroll on Mobile */}
          <div className="mt-4 sm:mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-semibold text-white flex items-center">
                <FaPercentage className="mr-2 text-blue-400" />
                Commission Levels
              </h3>
              <span className="text-xs text-slate-500">Swipe →</span>
            </div>
            <div className="flex space-x-3 overflow-x-auto pb-3 sm:pb-4 scrollbar-hide -mx-1 px-1">
              {levelData.map((level) => (
                <motion.div 
                  key={level.level}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-shrink-0 bg-gradient-to-br ${level.color} rounded-lg sm:rounded-xl p-3 sm:p-4 border ${level.border} min-w-[160px] sm:min-w-[180px] active:scale-95 transition-transform`}
                >
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className={`text-sm sm:text-base font-bold ${level.textColor}`}>
                      Level {level.level}
                    </span>
                    {level.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">{level.commission}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs sm:text-sm text-slate-400">
                      {level.members.length} member{level.members.length !== 1 ? 's' : ''}
                    </div>
                    <button
                      onClick={() => toggleLevel(level.level)}
                      className="text-xs text-slate-500 hover:text-slate-400 transition-colors"
                    >
                      View →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Share Options - Tabbed Interface */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-8 border border-slate-700/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 md:mb-6 gap-3">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-white">Share Via</h2>
            <div className="flex bg-slate-800/50 rounded-lg p-1 w-full sm:w-auto">
              <button
                onClick={() => setActiveShareTab('direct')}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-md transition-all ${
                  activeShareTab === 'direct' 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                Direct
              </button>
              <button
                onClick={() => setActiveShareTab('social')}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-md transition-all ${
                  activeShareTab === 'social' 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                Social
              </button>
            </div>
          </div>

          {/* Share Options Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3 md:gap-4">
            {activeShareTab === 'direct' ? (
              <>
                {directShareOptions.map((option, index) => (
                  <motion.button
                    key={option.platform}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={option.action}
                    className={`flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 rounded-lg ${option.color} border border-slate-700/50 transition-all duration-300 active:scale-95`}
                  >
                    <div className={`text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 ${option.text}`}>
                      {option.icon}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-300 truncate w-full text-center">
                      {option.platform}
                    </span>
                  </motion.button>
                ))}
                
                {/* QR Code Option */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={toggleQRCode}
                  className={`flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 rounded-lg ${
                    showQRCode 
                      ? 'bg-gradient-to-br from-amber-500/20 to-amber-600/20 border-amber-700/50' 
                      : 'bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-700/30'
                  } border transition-all duration-300 active:scale-95 col-span-4 sm:col-span-1`}
                >
                  <div className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 text-amber-400">
                    <FiSmartphone />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-300">QR Code</span>
                </motion.button>
              </>
            ) : (
              <>
                {socialShareOptions.map((option, index) => (
                  <motion.button
                    key={option.platform}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={option.action}
                    className={`flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 rounded-lg ${option.color} border border-slate-700/50 transition-all duration-300 active:scale-95`}
                  >
                    <div className={`text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 ${option.text}`}>
                      {option.icon}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-300 truncate w-full text-center">
                      {option.platform}
                    </span>
                  </motion.button>
                ))}
                
                {/* More Options Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => showNotification("More sharing options coming soon!")}
                  className="flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 rounded-lg bg-gradient-to-br from-slate-700/30 to-slate-800/30 border border-slate-700/50 transition-all duration-300 active:scale-95"
                >
                  <div className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 text-slate-400">
                    <FiGlobe />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-300">More</span>
                </motion.button>
              </>
            )}
          </div>
        </div>

        {/* Team Levels - Mobile Optimized */}
        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-white">Team Levels</h2>
            <span className="text-xs text-slate-400 sm:text-sm">
              Tap level to {expandedLevel ? "collapse" : "expand"} details
            </span>
          </div>
          
          {levelData.map((level, levelIndex) => {
            const isExpanded = expandedLevel === level.level;
            const totalDeposit = level.members.reduce((sum, member) => sum + member.deposit, 0);
            const totalWithdraw = level.members.reduce((sum, member) => sum + member.withdraw, 0);
            const totalProfit = level.members.reduce((sum, member) => sum + member.profit, 0);
            const activeMembers = level.members.filter(m => m.status === "active").length;
            const yourCommission = totalDeposit * (level.level === 1 ? 0.1 : level.level === 2 ? 0.05 : 0.02);

            return (
              <motion.div 
                key={level.level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: levelIndex * 0.1 }}
                whileTap={{ scale: 0.99 }}
                className={`bg-gradient-to-br ${level.color} rounded-xl sm:rounded-2xl border ${level.border} overflow-hidden active:scale-95 transition-transform`}
              >
                {/* Level Header */}
                <button
                  onClick={() => toggleLevel(level.level)}
                  className="w-full p-3 sm:p-4 md:p-6 flex items-center justify-between hover:bg-white/5 active:bg-white/10 transition-colors duration-200"
                >
                  <div className="flex items-center flex-1 min-w-0">
                    <div className="mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
                        {level.icon}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center mb-1">
                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-white truncate">
                          Level {level.level} Team
                        </h3>
                        <span className="ml-2 px-1.5 sm:px-2 py-0.5 text-xs rounded-full bg-white/10 text-slate-300 whitespace-nowrap">
                          {level.members.length} members
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        <div className="flex items-center text-xs text-slate-400 bg-black/20 px-1.5 py-0.5 rounded">
                          <FaPercentage className="mr-1" />
                          <span>{level.commission} commission</span>
                        </div>
                        <div className="flex items-center text-xs text-slate-400 bg-black/20 px-1.5 py-0.5 rounded">
                          <FiUsers className="mr-1" />
                          <span>{activeMembers} Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center ml-1 sm:ml-2">
                    {/* Your Commission Badge - Hidden on smallest screens */}
                    <div className="hidden xs:block px-2 sm:px-3 py-1 bg-gradient-to-r from-blue-600/20 to-blue-700/20 rounded-lg border border-blue-600/30 mr-2 sm:mr-3 md:mr-4">
                      <span className="text-xs sm:text-sm text-blue-400 font-semibold whitespace-nowrap">
                        Your: ${yourCommission.toFixed(0)}
                      </span>
                    </div>
                    
                    {/* Expand/Collapse Icon */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-slate-400"
                    >
                      {isExpanded ? (
                        <FiChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <FiChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </motion.div>
                  </div>
                </button>

                {/* Collapsible Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-3 sm:px-4 pb-3 sm:pb-4 border-t border-white/10 pt-3 sm:pt-4">
                        {/* Quick Stats Row - Mobile */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <div className="bg-black/20 rounded-lg p-2 sm:p-3">
                            <p className="text-slate-400 text-xs mb-1">Active Members</p>
                            <p className="text-base sm:text-lg font-bold text-white">{activeMembers}</p>
                          </div>
                          <div className="bg-black/20 rounded-lg p-2 sm:p-3">
                            <p className="text-slate-400 text-xs mb-1">Your Commission</p>
                            <p className="text-base sm:text-lg font-bold text-blue-400">${yourCommission.toFixed(0)}</p>
                          </div>
                          <div className="bg-black/20 rounded-lg p-2 sm:p-3">
                            <p className="text-slate-400 text-xs mb-1">Total Deposit</p>
                            <p className="text-base sm:text-lg font-bold text-emerald-400">{formatNumber(totalDeposit)}</p>
                          </div>
                          <div className="bg-black/20 rounded-lg p-2 sm:p-3">
                            <p className="text-slate-400 text-xs mb-1">Total Profit</p>
                            <p className="text-base sm:text-lg font-bold text-purple-400">${totalProfit}</p>
                          </div>
                        </div>

                        {/* Members List */}
                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm sm:text-base font-semibold text-white">Team Members</h4>
                            <span className="text-xs text-slate-500">
                              Showing {level.members.length} member{level.members.length !== 1 ? 's' : ''}
                            </span>
                          </div>
                          
                          {level.members.map((member, memberIndex) => (
                            <motion.div 
                              key={member.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: memberIndex * 0.05 }}
                              whileTap={{ scale: 0.98 }}
                              className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50 active:border-blue-500/50 transition-all"
                            >
                              {/* Member Header */}
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center flex-1 min-w-0">
                                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                                    <FaUserCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center">
                                      <p className="font-medium text-white text-sm truncate">{member.name}</p>
                                      <div className="ml-2 flex items-center">
                                        <FaIdBadge className="w-2 h-2 sm:w-3 sm:h-3 text-slate-400 mr-1" />
                                        <p className="text-xs text-slate-400">REF{member.id}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center mt-0.5">
                                      <FiCalendar className="w-2 h-2 sm:w-3 sm:h-3 text-slate-400 mr-1" />
                                      <p className="text-xs text-slate-400">Joined {member.joinDate}</p>
                                    </div>
                                  </div>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold flex-shrink-0 ml-2 ${
                                  member.status === "active" 
                                    ? "bg-green-500/20 text-green-400" 
                                    : "bg-red-500/20 text-red-400"
                                }`}>
                                  {member.status === "active" ? "Active" : "Inactive"}
                                </span>
                              </div>

                              {/* Member Details Grid */}
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                                <div className="flex items-center bg-black/20 rounded p-2">
                                  <FiDollarSign className="w-3 h-3 text-emerald-400 mr-1 sm:mr-2 flex-shrink-0" />
                                  <div className="min-w-0">
                                    <p className="text-xs text-slate-400 truncate">Deposit</p>
                                    <p className="text-xs sm:text-sm font-semibold text-emerald-400 truncate">
                                      ${member.deposit.toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center bg-black/20 rounded p-2">
                                  <FiDownload className="w-3 h-3 text-amber-400 mr-1 sm:mr-2 flex-shrink-0" />
                                  <div className="min-w-0">
                                    <p className="text-xs text-slate-400 truncate">Withdraw</p>
                                    <p className="text-xs sm:text-sm font-semibold text-amber-400 truncate">
                                      ${member.withdraw.toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center bg-black/20 rounded p-2">
                                  <FaMoneyBillWave className="w-3 h-3 text-blue-400 mr-1 sm:mr-2 flex-shrink-0" />
                                  <div className="min-w-0">
                                    <p className="text-xs text-slate-400 truncate">Profit</p>
                                    <p className="text-xs sm:text-sm font-semibold text-blue-400 truncate">
                                      ${member.profit}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center bg-black/20 rounded p-2 col-span-2 sm:col-span-1">
                                  <FiPhone className="w-3 h-3 text-slate-400 mr-1 sm:mr-2 flex-shrink-0" />
                                  <div className="min-w-0">
                                    <p className="text-xs text-slate-400 truncate">Phone</p>
                                    <p className="text-xs font-semibold text-slate-300 truncate">
                                      {member.phone.replace('+1 ', '')}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* How It Works & Tips */}
        <div className="mt-4 sm:mt-6 md:mt-8 space-y-4 sm:space-y-6">
          {/* How It Works */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-slate-700/50">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4 md:mb-6 flex items-center">
              <FiHelpCircle className="mr-2 text-blue-400" />
              How It Works
            </h3>
            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 md:gap-6">
              {[
                {
                  step: 1,
                  title: "Share Your Link",
                  description: "Copy & share your unique referral link with friends",
                  color: "from-blue-600 to-blue-700"
                },
                {
                  step: 2,
                  title: "They Join & Invest",
                  description: "Friends join via your link and make their first investment",
                  color: "from-green-600 to-green-700"
                },
                {
                  step: 3,
                  title: "Earn Commission",
                  description: "Earn from their deposits for 3 levels deep",
                  color: "from-purple-600 to-purple-700"
                }
              ].map((item, index) => (
                <div key={item.step} className="flex sm:flex-col items-start sm:items-center">
                  <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mr-3 sm:mr-0 sm:mb-3 md:mb-4`}>
                    <span className="font-bold text-white text-sm sm:text-base">{item.step}</span>
                  </div>
                  <div className="sm:text-center flex-1">
                    <h4 className="font-semibold text-white text-sm sm:text-base mb-1">{item.title}</h4>
                    <p className="text-slate-400 text-xs sm:text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips & Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-blue-700/30">
              <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-2 sm:mb-3 md:mb-4 flex items-center">
                <FiZap className="mr-2 text-blue-400" />
                Quick Tips
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  "Share on multiple platforms for better reach",
                  "Follow up with potential referrals personally",
                  "Track your team's performance regularly",
                  "Use QR codes for in-person sharing",
                  "Check your commission daily"
                ].map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2 flex-shrink-0" />
                    <span className="text-slate-300 text-xs sm:text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Performance Stats */}
            <div className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-emerald-700/30">
              <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-2 sm:mb-3 md:mb-4 flex items-center">
                <FiTarget className="mr-2 text-emerald-400" />
                Performance
              </h4>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { label: "Conversion Rate", value: "8.5%", color: "text-green-400" },
                  { label: "Avg. Member Value", value: "$2,450", color: "text-blue-400" },
                  { label: "Active Rate", value: "76%", color: "text-emerald-400" },
                  { label: "Avg. Commission", value: "$245", color: "text-purple-400" }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-slate-400 text-xs sm:text-sm">{stat.label}</span>
                    <span className={`font-bold ${stat.color} text-sm sm:text-base`}>{stat.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-emerald-700/30">
                <button className="w-full px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-lg text-white text-sm font-semibold transition-all duration-300 active:scale-95">
                  View Full Analytics
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-6 border-t border-slate-800/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-slate-400 text-xs sm:text-sm">
                Need help? Contact support@wealthbridge.com
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Terms & Conditions apply. Commission rates may vary.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 sm:px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-slate-300 text-xs sm:text-sm transition-colors">
                Terms
              </button>
              <button className="px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600/20 to-blue-700/20 hover:from-blue-700/30 hover:to-blue-800/30 rounded-lg text-blue-400 text-xs sm:text-sm transition-colors">
                Support
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @media (max-width: 640px) {
          .select-all {
            user-select: all;
            -webkit-user-select: all;
            -moz-user-select: all;
          }
        }
        
        /* Improve touch targets */
        @media (max-width: 768px) {
          button, [role="button"] {
            min-height: 44px;
            min-width: 44px;
          }
        }
      `}</style>
    </div>
  );
}