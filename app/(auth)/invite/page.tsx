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
  FiGlobe,
  FiChevronDown,
  FiChevronUp,
  FiPlus,
  FiMinus
} from "react-icons/fi";
import { 
  FaWhatsapp, 
  FaTelegram, 
  FaCopy, 
  FaLink,
  FaUserCircle,
  FaChartLine,
  FaLevelUpAlt,
  FaLevelDownAlt
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const [expandedLevel, setExpandedLevel] = useState<number | null>(1); // First level expanded by default
  const referralLink = "https://wealthbridge.com/ref/aj12345";
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Level wise members data
  const levelData = [
    {
      level: 1,
      commission: "10%",
      icon: <FaLevelUpAlt className="text-green-400" />,
      color: "from-green-900/30 to-emerald-900/20",
      border: "border-green-700/30",
      members: [
        { id: 1, name: "John Smith", phone: "+1 (555) 123-4567", status: "active", deposit: 2500, withdraw: 1200, joinDate: "2024-01-15", profit: 450 },
        { id: 2, name: "Sarah Johnson", phone: "+1 (555) 987-6543", status: "active", deposit: 3500, withdraw: 2000, joinDate: "2024-01-20", profit: 620 },
        { id: 3, name: "Mike Williams", phone: "+1 (555) 456-7890", status: "inactive", deposit: 1500, withdraw: 800, joinDate: "2024-02-01", profit: 230 },
        { id: 4, name: "Emma Davis", phone: "+1 (555) 789-0123", status: "active", deposit: 5000, withdraw: 3000, joinDate: "2024-02-10", profit: 890 },
        { id: 5, name: "Robert Brown", phone: "+1 (555) 234-5678", status: "active", deposit: 2800, withdraw: 1500, joinDate: "2024-02-15", profit: 510 },
      ]
    },
    {
      level: 2,
      commission: "5%",
      icon: <FaLevelUpAlt className="text-blue-400" />,
      color: "from-blue-900/30 to-cyan-900/20",
      border: "border-blue-700/30",
      members: [
        { id: 6, name: "Lisa Wilson", phone: "+1 (555) 345-6789", status: "active", deposit: 4200, withdraw: 2500, joinDate: "2024-01-25", profit: 680 },
        { id: 7, name: "David Miller", phone: "+1 (555) 567-8901", status: "inactive", deposit: 1800, withdraw: 900, joinDate: "2024-02-05", profit: 290 },
        { id: 8, name: "Jennifer Taylor", phone: "+1 (555) 678-9012", status: "active", deposit: 3200, withdraw: 1800, joinDate: "2024-02-12", profit: 520 },
      ]
    },
    {
      level: 3,
      commission: "2%",
      icon: <FaLevelDownAlt className="text-purple-400" />,
      color: "from-purple-900/30 to-pink-900/20",
      border: "border-purple-700/30",
      members: [
        { id: 9, name: "Thomas Anderson", phone: "+1 (555) 789-0123", status: "active", deposit: 2900, withdraw: 1600, joinDate: "2024-02-18", profit: 480 },
        { id: 10, name: "Sophia Martinez", phone: "+1 (555) 890-1234", status: "active", deposit: 4100, withdraw: 2200, joinDate: "2024-02-20", profit: 670 },
      ]
    }
  ];

  // Top stats
  const topStats = {
    totalMembers: 48,
    activeMembers: 32,
    totalDeposit: 85450,
    totalWithdraw: 45200,
    totalEarned: 12500,
    referralBonus: 3250
  };

  // Share options
  const shareOptions = [
    { platform: "WhatsApp", icon: <FaWhatsapp className="text-green-500" />, color: "bg-green-500/10 hover:bg-green-500/20" },
    { platform: "Telegram", icon: <FaTelegram className="text-blue-500" />, color: "bg-blue-500/10 hover:bg-blue-500/20" },
    { platform: "Facebook", icon: <FiFacebook className="text-blue-600" />, color: "bg-blue-600/10 hover:bg-blue-600/20" },
    { platform: "Twitter", icon: <FiTwitter className="text-sky-500" />, color: "bg-sky-500/10 hover:bg-sky-500/20" },
    { platform: "Messenger", icon: <FiMessageSquare className="text-blue-400" />, color: "bg-blue-400/10 hover:bg-blue-400/20" },
    { platform: "Email", icon: <FiMail className="text-red-500" />, color: "bg-red-500/10 hover:bg-red-500/20" },
    { platform: "SMS", icon: <FiMessageSquare className="text-green-600" />, color: "bg-green-600/10 hover:bg-green-600/20" },
    { platform: "Copy Link", icon: <FiCopy className="text-purple-500" />, color: "bg-purple-500/10 hover:bg-purple-500/20" },
  ];

  const toggleLevel = (level: number) => {
    if (expandedLevel === level) {
      setExpandedLevel(null);
    } else {
      setExpandedLevel(level);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Referral Program</h1>
          <p className="text-slate-400">Invite friends & earn commission from their investments</p>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-2xl p-6 border border-blue-700/30"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-600/20 rounded-xl">
                <FiUsers className="w-6 h-6 text-blue-400" />
              </div>
              <FiTrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-slate-400 text-sm mb-1">Total Team</p>
            <p className="text-2xl font-bold text-white">{topStats.totalMembers} Members</p>
            <div className="mt-3 text-sm text-blue-400">
              <span className="flex items-center">
                <FiActivity className="mr-1" /> {topStats.activeMembers} Active
              </span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 rounded-2xl p-6 border border-emerald-700/30"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-600/20 rounded-xl">
                <FiArrowUp className="w-6 h-6 text-emerald-400" />
              </div>
              <FiDollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-slate-400 text-sm mb-1">Total Deposit</p>
            <p className="text-2xl font-bold text-white">${topStats.totalDeposit.toLocaleString()}</p>
            <div className="mt-3 text-sm text-emerald-400">
              <span className="flex items-center">
                <FiStar className="mr-1" /> Team Investment
              </span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 rounded-2xl p-6 border border-amber-700/30"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-600/20 rounded-xl">
                <FiArrowDown className="w-6 h-6 text-amber-400" />
              </div>
              <FiDownload className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-slate-400 text-sm mb-1">Total Withdraw</p>
            <p className="text-2xl font-bold text-white">${topStats.totalWithdraw.toLocaleString()}</p>
            <div className="mt-3 text-sm text-amber-400">
              <span className="flex items-center">
                <FiUser className="mr-1" /> Team Earnings
              </span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-2xl p-6 border border-purple-700/30"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-600/20 rounded-xl">
                <FiAward className="w-6 h-6 text-purple-400" />
              </div>
              <FiTrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-slate-400 text-sm mb-1">Your Earnings</p>
            <p className="text-2xl font-bold text-white">${topStats.totalEarned.toLocaleString()}</p>
            <div className="mt-3 text-sm text-purple-400">
              <span className="flex items-center">
                <FaChartLine className="mr-1" /> ${topStats.referralBonus} Bonus
              </span>
            </div>
          </motion.div>
        </div>

        {/* Referral Link Section */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 mb-8 border border-slate-700/50">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-2 flex items-center">
                <FiShare2 className="mr-3 text-blue-400" />
                Your Referral Link
              </h2>
              <p className="text-slate-400 mb-4">
                Share this link with friends and earn 10% commission from their deposits
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 bg-slate-800/70 rounded-xl p-4 border border-slate-700">
                  <div className="flex items-center">
                    <FiLink className="text-blue-400 mr-3" />
                    <code className="text-slate-300 font-mono text-sm truncate">{referralLink}</code>
                  </div>
                </div>
                
                <button
                  onClick={copyToClipboard}
                  className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300"
                >
                  {copied ? (
                    <>
                      <FiCheck className="w-5 h-5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <FiCopy className="w-5 h-5" />
                      Copy Link
                    </>
                  )}
                </button>
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-xl p-5 border border-blue-700/30">
                <h3 className="text-lg font-bold text-white mb-3">Commission Levels</h3>
                <ul className="space-y-3">
                  {levelData.map((level) => (
                    <li key={level.level} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${level.level === 1 ? 'bg-green-500' : level.level === 2 ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                        <span className="text-slate-300">Level {level.level}</span>
                      </div>
                      <span className={`font-bold ${level.level === 1 ? 'text-green-400' : level.level === 2 ? 'text-blue-400' : 'text-purple-400'}`}>
                        {level.commission}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Share Options */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 mb-8 border border-slate-700/50">
          <h2 className="text-xl font-bold text-white mb-6">Share Via</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
            {shareOptions.map((option, index) => (
              <motion.button
                key={option.platform}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center justify-center p-4 rounded-xl ${option.color} border border-slate-700/50 transition-all duration-300`}
              >
                <div className="text-2xl mb-2">
                  {option.icon}
                </div>
                <span className="text-sm font-medium text-slate-300">{option.platform}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Team Levels - Collapsible Boxes */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Team Levels</h2>
          
          {levelData.map((level, levelIndex) => {
            const isExpanded = expandedLevel === level.level;
            const totalDeposit = level.members.reduce((sum, member) => sum + member.deposit, 0);
            const totalWithdraw = level.members.reduce((sum, member) => sum + member.withdraw, 0);
            const activeMembers = level.members.filter(m => m.status === "active").length;
            const yourCommission = totalDeposit * (level.level === 1 ? 0.1 : level.level === 2 ? 0.05 : 0.02);

            return (
              <motion.div 
                key={level.level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: levelIndex * 0.1 }}
                className={`bg-gradient-to-br ${level.color} rounded-2xl border ${level.border} overflow-hidden`}
              >
                {/* Level Header - Clickable */}
                <button
                  onClick={() => toggleLevel(level.level)}
                  className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
                        {level.icon}
                      </div>
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-white flex items-center">
                        Level {level.level} Team
                        <span className="ml-3 px-3 py-1 text-xs rounded-full bg-white/10 text-slate-300">
                          {level.members.length} members
                        </span>
                      </h3>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center text-slate-400">
                          <FiDollarSign className="mr-1" />
                          <span className="text-sm">Commission: {level.commission}</span>
                        </div>
                        <div className="flex items-center text-slate-400">
                          <FiUsers className="mr-1" />
                          <span className="text-sm">{activeMembers} Active</span>
                        </div>
                        <div className="flex items-center text-emerald-400">
                          <FiArrowUp className="mr-1" />
                          <span className="text-sm font-semibold">${totalDeposit.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* Your Commission Badge */}
                    <div className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-blue-700/20 rounded-lg border border-blue-600/30">
                      <span className="text-blue-400 font-semibold">
                        Your: ${yourCommission.toFixed(2)}
                      </span>
                    </div>
                    
                    {/* Expand/Collapse Icon */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-slate-400"
                    >
                      {isExpanded ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
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
                      <div className="px-6 pb-6 border-t border-white/10 pt-6">
                        {/* Quick Stats Row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="bg-black/20 rounded-xl p-4">
                            <p className="text-slate-400 text-sm mb-1">Active Members</p>
                            <p className="text-2xl font-bold text-white">{activeMembers}</p>
                          </div>
                          <div className="bg-black/20 rounded-xl p-4">
                            <p className="text-slate-400 text-sm mb-1">Total Deposit</p>
                            <p className="text-2xl font-bold text-emerald-400">${totalDeposit.toLocaleString()}</p>
                          </div>
                          <div className="bg-black/20 rounded-xl p-4">
                            <p className="text-slate-400 text-sm mb-1">Total Withdraw</p>
                            <p className="text-2xl font-bold text-amber-400">${totalWithdraw.toLocaleString()}</p>
                          </div>
                          <div className="bg-black/20 rounded-xl p-4">
                            <p className="text-slate-400 text-sm mb-1">Your Commission</p>
                            <p className="text-2xl font-bold text-blue-400">${yourCommission.toFixed(2)}</p>
                          </div>
                        </div>

                        {/* Members Table */}
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-white/10">
                                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Member</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Phone</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Status</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Deposit</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Withdraw</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Profit</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Join Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {level.members.map((member, memberIndex) => (
                                <motion.tr 
                                  key={member.id}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: memberIndex * 0.05 }}
                                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                >
                                  <td className="py-4 px-4">
                                    <div className="flex items-center">
                                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mr-3">
                                        <FaUserCircle className="w-6 h-6 text-white" />
                                      </div>
                                      <div>
                                        <p className="font-medium text-white">{member.name}</p>
                                        <p className="text-xs text-slate-400">ID: REF{member.id}</p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="flex items-center text-slate-300">
                                      <FiPhone className="mr-2 text-slate-400" />
                                      <span className="text-sm">{member.phone}</span>
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                      member.status === "active" 
                                        ? "bg-green-500/20 text-green-400" 
                                        : "bg-red-500/20 text-red-400"
                                    }`}>
                                      {member.status === "active" ? "Active" : "Inactive"}
                                    </span>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="flex items-center text-emerald-400 font-semibold">
                                      <FiArrowUp className="mr-2" />
                                      ${member.deposit.toLocaleString()}
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="flex items-center text-amber-400 font-semibold">
                                      <FiArrowDown className="mr-2" />
                                      ${member.withdraw.toLocaleString()}
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="flex items-center text-blue-400 font-semibold">
                                      <FiTrendingUp className="mr-2" />
                                      ${member.profit.toLocaleString()}
                                    </div>
                                  </td>
                                  <td className="py-4 px-4 text-slate-300 text-sm">
                                    {member.joinDate}
                                  </td>
                                </motion.tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Info */}
        <div className="mt-8 p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50">
          <h3 className="text-lg font-bold text-white mb-6">How Referral Program Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-4">
                <span className="font-bold text-white text-xl">1</span>
              </div>
              <h4 className="font-semibold text-white mb-2">Share Your Link</h4>
              <p className="text-slate-400 text-sm">Copy and share your unique referral link with friends</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center mb-4">
                <span className="font-bold text-white text-xl">2</span>
              </div>
              <h4 className="font-semibold text-white mb-2">They Join & Invest</h4>
              <p className="text-slate-400 text-sm">Your friends join using your link and start investing</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center mb-4">
                <span className="font-bold text-white text-xl">3</span>
              </div>
              <h4 className="font-semibold text-white mb-2">Earn Commission</h4>
              <p className="text-slate-400 text-sm">Earn commission from their deposits for 3 levels</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}