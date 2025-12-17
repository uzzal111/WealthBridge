"use client";

import React, { useState, useEffect } from "react";
import { 
  FiDollarSign, 
  FiUsers, 
  FiCalendar, 
  FiCheckCircle, 
  FiAward,
  FiTrendingUp,
  FiHelpCircle,
  FiFileText,
  FiCheck,
  FiCopy,
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiUpload,
  FiDownload,
  FiArrowUp,
  FiArrowDown,
  FiStar,
  FiTarget,
  FiZap,
  FiBell,
  FiChevronRight,
  FiChevronLeft,
  FiPercent,
  FiBarChart2,
  FiUserCheck,
  FiUserPlus,
  FiCreditCard,
  FiShield,
  FiGlobe,
  FiVideo,
  FiMic,
  FiHeadphones,
  FiCamera,
  FiTool
} from "react-icons/fi";
import { 
  FaWhatsapp,
  FaTelegram,
  FaUserCircle,
  FaIdBadge,
  FaChartLine,
  FaMoneyBillWave,
  FaQrcode,
  FaRegCalendarCheck,
  FaCertificate,
  FaHandshake,
  FaMicrophoneAlt,
  FaVideo,
  FaChalkboardTeacher,
  FaRegFileAlt
} from "react-icons/fa";
import { 
  IoLogoWhatsapp,
  
  IoDocumentText,
  IoSchool
} from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";


export default function SalarySeminarPage() {
  const [activeTab, setActiveTab] = useState<'salary' | 'seminar'>('salary');
  const [copied, setCopied] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [supportForm, setSupportForm] = useState({
    name: "",
    email: "",
    phone: "",
    memberCount: "",
    totalDeposit: "",
    seminarTopic: "",
    expectedAttendees: "",
    documents: [] as File[]
  });
  const [submitted, setSubmitted] = useState(false);

  const referralLink = "https://wealthbridge.com/ref/aj12345";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Monthly Salary Tiers
  const salaryTiers = [
    {
      level: "A",
      activeMembers: 5,
      minDeposit: 5000,
      salary: 100,
      icon: <FiStar className="text-yellow-500" />,
      color: "from-blue-500/20 to-blue-600/10",
      border: "border-blue-500/30",
      requirements: ["5 Active Members", "$5,000 Total Team Deposit", "Minimum 30 days activity"]
    },
    {
      level: "B",
      activeMembers: 10,
      minDeposit: 10000,
      salary: 200,
      icon: <FiTrendingUp className="text-green-500" />,
      color: "from-green-500/20 to-green-600/10",
      border: "border-green-500/30",
      requirements: ["10 Active Members", "$10,000 Total Team Deposit", "Minimum 60 days activity"]
    },
    {
      level: "C",
      activeMembers: 15,
      minDeposit: 15000,
      salary: 300,
      icon: <FiAward className="text-purple-500" />,
      color: "from-purple-500/20 to-purple-600/10",
      border: "border-purple-500/30",
      requirements: ["15 Active Members", "$15,000 Total Team Deposit", "Minimum 90 days activity"]
    },
    {
      level: "D",
      activeMembers: 20,
      minDeposit: 20000,
      salary: 400,
      icon: <FiTarget className="text-orange-500" />,
      color: "from-orange-500/20 to-orange-600/10",
      border: "border-orange-500/30",
      requirements: ["20 Active Members", "$20,000 Total Team Deposit", "Minimum 120 days activity"]
    },
    {
      level: "E",
      activeMembers: 25,
      minDeposit: 30000,
      salary: 500,
      icon: <FiZap className="text-red-500" />,
      color: "from-red-500/20 to-red-600/10",
      border: "border-red-500/30",
      requirements: ["25 Active Members", "$30,000 Total Team Deposit", "Minimum 150 days activity"]
    }
  ];

  // User's current stats
  const userStats = {
    activeMembers: 18,
    totalDeposit: 14500,
    daysActive: 85,
    currentTier: "C",
    nextTier: "D",
    progressToNext: 75,
    monthlyEarnings: 300
  };

  // Seminar Requirements
  const seminarRequirements = [
    { requirement: "Minimum 10 Active Members", icon: <FiUserCheck />, met: userStats.activeMembers >= 10 },
    { requirement: "Minimum $100 Deposit per Member", icon: <FiCreditCard />, met: userStats.totalDeposit >= 1000 },
    { requirement: "Active for 30+ Days", icon: <FiCalendar />, met: userStats.daysActive >= 30 },
    { requirement: "Clean Account Status", icon: <FiShield />, met: true }
  ];

  const seminarSupportOptions = [
    { 
      type: "Marketing Support", 
      icon: <FiGlobe />,
      details: ["Social Media Promotion", "Email Campaign", "Flyer Design", "Event Page Creation"]
    },
    { 
      type: "Technical Support", 
      icon: <FiVideo />,
      details: ["Zoom/Webinar Platform", "Audio/Visual Setup", "Recording Service", "Live Streaming"]
    },
    { 
      type: "Content Support", 
      icon: <FiFileText />,
      details: ["Presentation Templates", "Marketing Materials", "Training Guides", "Certificate Design"]
    },
    { 
      type: "Financial Support", 
      icon: <FiDollarSign />,
      details: ["Event Budget Planning", "Sponsorship Matching", "Attraction Budget", "Prize Pool Contribution"]
    }
  ];

  // Calculate next salary progress
  const calculateNextTier = () => {
    const currentIndex = salaryTiers.findIndex(tier => tier.level === userStats.currentTier);
    if (currentIndex < salaryTiers.length - 1) {
      const nextTier = salaryTiers[currentIndex + 1];
      const membersProgress = (userStats.activeMembers / nextTier.activeMembers) * 100;
      const depositProgress = (userStats.totalDeposit / nextTier.minDeposit) * 100;
      return Math.min(membersProgress, depositProgress, 100);
    }
    return 100;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSupportForm({
        ...supportForm,
        documents: Array.from(e.target.files)
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, send to backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-gray-950 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Monthly Salary & Seminar Program
              </h1>
              <p className="text-slate-400 text-sm md:text-base">
                Earn monthly salary and host seminars with company support
              </p>
            </div>
            
            {/* Stats Summary */}
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-3 md:p-4 border border-blue-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Current Monthly Salary</p>
                  <p className="text-xl md:text-2xl font-bold text-white">
                    ${userStats.monthlyEarnings}
                  </p>
                </div>
                <div className="p-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg">
                  <FaMoneyBillWave className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-slate-800/50 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('salary')}
              className={`flex-1 sm:flex-none px-4 py-2 sm:py-3 rounded-md transition-all flex items-center justify-center gap-2 ${
                activeTab === 'salary' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <FiDollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Monthly Salary</span>
            </button>
            <button
              onClick={() => setActiveTab('seminar')}
              className={`flex-1 sm:flex-none px-4 py-2 sm:py-3 rounded-md transition-all flex items-center justify-center gap-2 ${
                activeTab === 'seminar' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <FaChalkboardTeacher className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Seminar Program</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        {activeTab === 'salary' ? (
          <div className="space-y-6 md:space-y-8">
            {/* Current Status */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-bold text-white flex items-center">
                  <FiAward className="mr-2 text-blue-400" />
                  Your Current Status
                </h2>
                <span className="px-3 py-1 bg-gradient-to-r from-blue-600/20 to-blue-700/20 rounded-full border border-blue-600/30 text-blue-400 text-sm font-semibold">
                  Tier {userStats.currentTier}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="bg-slate-800/30 rounded-lg p-3 md:p-4">
                  <div className="flex items-center mb-2">
                    <div className="p-1.5 bg-blue-600/20 rounded-lg mr-2">
                      <FiUsers className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                    </div>
                    <p className="text-slate-400 text-xs md:text-sm">Active Members</p>
                  </div>
                  <p className="text-lg md:text-xl font-bold text-white">{userStats.activeMembers}</p>
                </div>
                
                <div className="bg-slate-800/30 rounded-lg p-3 md:p-4">
                  <div className="flex items-center mb-2">
                    <div className="p-1.5 bg-green-600/20 rounded-lg mr-2">
                      <FiDollarSign className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                    </div>
                    <p className="text-slate-400 text-xs md:text-sm">Team Deposit</p>
                  </div>
                  <p className="text-lg md:text-xl font-bold text-white">${userStats.totalDeposit.toLocaleString()}</p>
                </div>
                
                <div className="bg-slate-800/30 rounded-lg p-3 md:p-4">
                  <div className="flex items-center mb-2">
                    <div className="p-1.5 bg-purple-600/20 rounded-lg mr-2">
                      <FiCalendar className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                    </div>
                    <p className="text-slate-400 text-xs md:text-sm">Days Active</p>
                  </div>
                  <p className="text-lg md:text-xl font-bold text-white">{userStats.daysActive}</p>
                </div>
                
                <div className="bg-slate-800/30 rounded-lg p-3 md:p-4">
                  <div className="flex items-center mb-2">
                    <div className="p-1.5 bg-yellow-600/20 rounded-lg mr-2">
                      <FaMoneyBillWave className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                    </div>
                    <p className="text-slate-400 text-xs md:text-sm">Monthly Salary</p>
                  </div>
                  <p className="text-lg md:text-xl font-bold text-green-400">${userStats.monthlyEarnings}</p>
                </div>
              </div>

              {/* Progress to Next Tier */}
              <div className="mb-4 md:mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm md:text-base font-semibold text-white">
                    Progress to Tier {userStats.nextTier}
                  </h3>
                  <span className="text-slate-400 text-xs md:text-sm">
                    {Math.round(calculateNextTier())}%
                  </span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2 md:h-3">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${calculateNextTier()}%` }}
                    transition={{ duration: 1 }}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 md:h-3 rounded-full"
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-slate-400">Current: Tier {userStats.currentTier}</span>
                  <span className="text-xs text-blue-400">Next: Tier {userStats.nextTier}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 active:scale-95">
                  <FiTrendingUp className="w-4 h-4" />
                  <span>Boost My Team</span>
                </button>
                <button 
                  onClick={() => setShowRequirements(!showRequirements)}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 active:scale-95"
                >
                  <FiHelpCircle className="w-4 h-4" />
                  <span>View Requirements</span>
                </button>
              </div>
            </div>

            {/* Salary Tiers */}
            <div>
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-bold text-white">Monthly Salary Tiers</h2>
                <div className="flex items-center text-slate-400 text-sm">
                  <FiInfo className="w-4 h-4 mr-1" />
                  <span>Click tier for details</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {salaryTiers.map((tier, index) => (
                  <motion.div
                    key={tier.level}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedTier(selectedTier === tier.level ? null : tier.level)}
                    className={`bg-gradient-to-br ${tier.color} rounded-xl p-4 md:p-6 border ${tier.border} cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
                      userStats.currentTier === tier.level ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="p-2 bg-white/10 rounded-lg mr-3">
                          {tier.icon}
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-white">Tier {tier.level}</h3>
                          <div className="flex items-center">
                            {userStats.currentTier === tier.level && (
                              <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full mr-2">
                                Current
                              </span>
                            )}
                            {userStats.nextTier === tier.level && (
                              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                                Next Goal
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl md:text-3xl font-bold text-white">${tier.salary}</p>
                        <p className="text-slate-400 text-sm">Monthly</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-sm">Active Members</span>
                        <span className={`font-semibold ${
                          userStats.activeMembers >= tier.activeMembers ? 'text-green-400' : 'text-slate-300'
                        }`}>
                          {userStats.activeMembers}/{tier.activeMembers}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-sm">Min Deposit</span>
                        <span className={`font-semibold ${
                          userStats.totalDeposit >= tier.minDeposit ? 'text-green-400' : 'text-slate-300'
                        }`}>
                          ${userStats.totalDeposit.toLocaleString()}/${tier.minDeposit.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {[...Array(Math.min(tier.activeMembers, 5))].map((_, i) => (
                          <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-slate-800" />
                        ))}
                      </div>
                      <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-slate-300 text-sm transition-colors">
                        View Details
                      </button>
                    </div>

                    {/* Requirements Dropdown */}
                    <AnimatePresence>
                      {selectedTier === tier.level && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <h4 className="text-sm font-semibold text-white mb-2">Requirements:</h4>
                            <ul className="space-y-2">
                              {tier.requirements.map((req, idx) => (
                                <li key={idx} className="flex items-center text-slate-300 text-sm">
                                  <FiCheckCircle className="w-3 h-3 text-green-400 mr-2" />
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl md:rounded-2xl p-4 md:p-6 border border-blue-500/30">
              <h3 className="text-lg md:text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg p-3 md:p-4 border border-slate-700/50 hover:border-blue-500/50 transition-colors">
                  <div className="flex flex-col items-center">
                    <FiUserPlus className="w-6 h-6 md:w-8 md:h-8 text-blue-400 mb-2" />
                    <span className="text-white text-sm font-medium">Add Member</span>
                  </div>
                </button>
                <button className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg p-3 md:p-4 border border-slate-700/50 hover:border-green-500/50 transition-colors">
                  <div className="flex flex-col items-center">
                    <FiTrendingUp className="w-6 h-6 md:w-8 md:h-8 text-green-400 mb-2" />
                    <span className="text-white text-sm font-medium">Boost Deposit</span>
                  </div>
                </button>
                <button className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg p-3 md:p-4 border border-slate-700/50 hover:border-purple-500/50 transition-colors">
                  <div className="flex flex-col items-center">
                    <FiBarChart2 className="w-6 h-6 md:w-8 md:h-8 text-purple-400 mb-2" />
                    <span className="text-white text-sm font-medium">View Report</span>
                  </div>
                </button>
                <button className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg p-3 md:p-4 border border-slate-700/50 hover:border-orange-500/50 transition-colors">
                  <div className="flex flex-col items-center">
                    <FaQrcode className="w-6 h-6 md:w-8 md:h-8 text-orange-400 mb-2" />
                    <span className="text-white text-sm font-medium">Share QR</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 md:space-y-8">
            {/* Seminar Requirements */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-bold text-white flex items-center">
                  <IoSchool className="mr-2 text-blue-400" />
                  Seminar Program Requirements
                </h2>
                <div className="flex items-center">
                  {seminarRequirements.every(req => req.met) ? (
                    <span className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-full border border-green-500/30 text-green-400 text-sm font-semibold">
                      Eligible ✓
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-full border border-orange-500/30 text-orange-400 text-sm font-semibold">
                      Requirements Pending
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
                {seminarRequirements.map((req, index) => (
                  <div key={index} className={`rounded-lg p-3 md:p-4 border ${
                    req.met 
                      ? 'bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/30' 
                      : 'bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/30'
                  }`}>
                    <div className="flex items-center mb-2">
                      <div className={`p-1.5 rounded-lg mr-2 ${
                        req.met ? 'bg-green-500/20' : 'bg-red-500/20'
                      }`}>
                        <div className={req.met ? 'text-green-400' : 'text-red-400'}>
                          {req.icon}
                        </div>
                      </div>
                      <span className={`text-sm font-medium ${req.met ? 'text-green-400' : 'text-red-400'}`}>
                        {req.met ? '✓ Met' : '✗ Pending'}
                      </span>
                    </div>
                    <p className="text-white text-sm">{req.requirement}</p>
                  </div>
                ))}
              </div>

              {/* Eligibility Status */}
              <div className={`rounded-lg p-4 mb-6 ${
                seminarRequirements.every(req => req.met)
                  ? 'bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/30'
                  : 'bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/30'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      {seminarRequirements.every(req => req.met)
                        ? 'You are eligible to host seminars!'
                        : 'Complete requirements to unlock seminar hosting'}
                    </h3>
                    <p className="text-slate-300 text-sm">
                      {seminarRequirements.every(req => req.met)
                        ? 'Contact support to start planning your seminar with company assistance.'
                        : 'You need to meet all requirements to access seminar support.'}
                    </p>
                  </div>
                  {seminarRequirements.every(req => req.met) ? (
                    <FaCertificate className="w-8 h-8 text-green-400" />
                  ) : (
                    <FiHelpCircle className="w-8 h-8 text-orange-400" />
                  )}
                </div>
              </div>

              {/* Support Options */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-4">Company Support Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {seminarSupportOptions.map((support, index) => (
                    <div key={index} className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-gradient-to-r from-blue-600/20 to-blue-700/20 rounded-lg mr-3">
                          <div className="text-blue-400">
                            {support.icon}
                          </div>
                        </div>
                        <h4 className="text-white font-semibold">{support.type}</h4>
                      </div>
                      <ul className="space-y-2">
                        {support.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center text-slate-300 text-sm">
                            <FiChevronRight className="w-3 h-3 text-blue-400 mr-2" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Support Request Form */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-bold text-white flex items-center">
                  <FiMail className="mr-2 text-blue-400" />
                  Request Seminar Support
                </h2>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-full border border-green-500/30 text-green-400 text-sm"
                  >
                    Request Submitted!
                  </motion.div>
                )}
              </div>

              {seminarRequirements.every(req => req.met) ? (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 text-sm mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        value={supportForm.name}
                        onChange={(e) => setSupportForm({...supportForm, name: e.target.value})}
                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-sm mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        value={supportForm.email}
                        onChange={(e) => setSupportForm({...supportForm, email: e.target.value})}
                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-sm mb-2">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={supportForm.phone}
                        onChange={(e) => setSupportForm({...supportForm, phone: e.target.value})}
                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-sm mb-2">Seminar Topic</label>
                      <input
                        type="text"
                        required
                        value={supportForm.seminarTopic}
                        onChange={(e) => setSupportForm({...supportForm, seminarTopic: e.target.value})}
                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="e.g., Investment Strategies 2024"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-sm mb-2">Active Members</label>
                      <input
                        type="number"
                        required
                        value={supportForm.memberCount}
                        onChange={(e) => setSupportForm({...supportForm, memberCount: e.target.value})}
                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Number of active members"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-sm mb-2">Total Team Deposit ($)</label>
                      <input
                        type="number"
                        required
                        value={supportForm.totalDeposit}
                        onChange={(e) => setSupportForm({...supportForm, totalDeposit: e.target.value})}
                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Total deposit amount"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Expected Attendees</label>
                    <input
                      type="number"
                      required
                      value={supportForm.expectedAttendees}
                      onChange={(e) => setSupportForm({...supportForm, expectedAttendees: e.target.value})}
                      className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Estimated number of attendees"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Supporting Documents</label>
                    <div className="border-2 border-dashed border-slate-700/50 rounded-lg p-4 md:p-6 text-center hover:border-blue-500/50 transition-colors">
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <FiUpload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                        <p className="text-slate-400 text-sm mb-1">
                          Click to upload documents (ID, Proof, etc.)
                        </p>
                        <p className="text-slate-500 text-xs">
                          PDF, JPG, PNG up to 5MB each
                        </p>
                      </label>
                    </div>
                    {supportForm.documents.length > 0 && (
                      <div className="mt-2">
                        <p className="text-slate-400 text-sm mb-1">Selected files:</p>
                        <div className="space-y-1">
                          {supportForm.documents.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-slate-800/30 rounded px-3 py-2">
                              <span className="text-slate-300 text-sm truncate">{file.name}</span>
                              <span className="text-slate-500 text-xs">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 active:scale-95"
                    >
                      <FiMail className="w-4 h-4" />
                      <span>Submit Request</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => window.open('https://wa.me/1234567890', '_blank')}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 active:scale-95"
                    >
                      <IoLogoWhatsapp className="w-4 h-4" />
                      <span>Contact Support</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8 md:py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-full flex items-center justify-center">
                    <FiHelpCircle className="w-8 h-8 text-orange-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                    Requirements Not Met
                  </h3>
                  <p className="text-slate-400 mb-6">
                    You need to meet all seminar requirements before requesting support.
                  </p>
                  <button
                    onClick={() => setActiveTab('salary')}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 mx-auto"
                  >
                    <FiTrendingUp className="w-4 h-4" />
                    <span>Boost My Team</span>
                  </button>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 rounded-xl p-4 border border-blue-500/30">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-blue-600/20 rounded-lg mr-3">
                    <FiPhone className="w-5 h-5 text-blue-400" />
                  </div>
                  <h4 className="text-white font-semibold">Phone Support</h4>
                </div>
                <p className="text-slate-400 text-sm mb-2">Available 24/7</p>
                <button 
                  onClick={() => copyToClipboard("+1 234 567 8900")}
                  className="text-blue-400 text-lg font-semibold hover:text-blue-300 transition-colors"
                >
                  +1 234 567 8900
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-xl p-4 border border-green-500/30">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-green-600/20 rounded-lg mr-3">
                    <IoLogoWhatsapp className="w-5 h-5 text-green-400" />
                  </div>
                  <h4 className="text-white font-semibold">WhatsApp</h4>
                </div>
                <p className="text-slate-400 text-sm mb-2">Quick responses</p>
                <button 
                  onClick={() => window.open('https://wa.me/1234567890', '_blank')}
                  className="text-green-400 text-lg font-semibold hover:text-green-300 transition-colors"
                >
                  Chat Now
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 rounded-xl p-4 border border-purple-500/30">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-purple-600/20 rounded-lg mr-3">
                    <FiMail className="w-5 h-5 text-purple-400" />
                  </div>
                  <h4 className="text-white font-semibold">Email</h4>
                </div>
                <p className="text-slate-400 text-sm mb-2">For detailed inquiries</p>
                <button 
                  onClick={() => copyToClipboard("support@wealthbridge.com")}
                  className="text-purple-400 text-lg font-semibold hover:text-purple-300 transition-colors"
                >
                  support@wealthbridge.com
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-6 md:mt-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-700/50">
          <h3 className="text-lg md:text-xl font-bold text-white mb-4">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {[
              {
                q: "How is monthly salary calculated?",
                a: "Salary is based on your team's active members and total deposits. Each tier has specific requirements that must be met continuously."
              },
              {
                q: "When will I receive my salary?",
                a: "Monthly salaries are processed on the 5th of every month for the previous month's performance."
              },
              {
                q: "What documents are needed for seminar support?",
                a: "You'll need identification, proof of team size and deposits, and a detailed seminar proposal."
              },
              {
                q: "How long does it take to get seminar approval?",
                a: "Approval typically takes 3-5 business days after submitting all required documents."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-slate-800/30 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2 flex items-center">
                  <FiHelpCircle className="w-4 h-4 text-blue-400 mr-2" />
                  {faq.q}
                </h4>
                <p className="text-slate-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FiInfo Icon Component */}
      <svg className="hidden">
        <symbol id="info-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </symbol>
      </svg>
      
      <style jsx>{`
        @media (max-width: 640px) {
          button, [role="button"] {
            min-height: 44px;
          }
        }
      `}</style>
    </div>
  );
}

// Helper component for info icon
const FiInfo = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
  </svg>
);