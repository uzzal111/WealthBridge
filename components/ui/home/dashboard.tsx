'use client';

import { FiTrendingUp, FiDollarSign, FiUsers, FiPieChart, FiClock, FiArrowUpRight, FiShield, FiStar, FiActivity, FiAward, FiTarget, FiCheckCircle } from 'react-icons/fi';
import { MdOutlineDashboard, MdAccountBalanceWallet, MdWorkspacePremium, MdSecurity, MdOutlineShowChart } from 'react-icons/md';
import { RiTeamFill } from 'react-icons/ri';
import { IoRocketOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AuthHomePage(){
  const [time, setTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  
  // User stats
  const userStats = {
    totalBalance: 8450.75,
    todayEarnings: 1250,
    totalEarnings: 48250,
    activeInvestments: 8,
    teamMembers: 48,
    level: 5,
    rank: 'Gold Elite',
    streakDays: 7,
    nextLevelProgress: 78
  };

  // Quick actions
  const quickActions = [
    { icon: <MdAccountBalanceWallet className="text-2xl" />, title: 'Deposit', desc: 'Add Funds', link: '/deposit', color: 'from-blue-600 to-blue-800' },
    { icon: <FiDollarSign className="text-2xl" />, title: 'Withdraw', desc: 'Get Earnings', link: '/withdraw', color: 'from-green-600 to-green-800' },
    { icon: <RiTeamFill className="text-2xl" />, title: 'Team', desc: 'View Network', link: '/team', color: 'from-purple-600 to-purple-800' },
    { icon: <FiPieChart className="text-2xl" />, title: 'Invest', desc: 'New Package', link: '/packages', color: 'from-amber-600 to-orange-700' },
  ];

  // Recent earnings
  const recentEarnings = [
    { type: 'Commission', amount: 250, time: '2 min ago', icon: '💰', color: 'text-blue-400 bg-blue-900/30' },
    { type: 'Bonus', amount: 150, time: '1 hour ago', icon: '🎁', color: 'text-purple-400 bg-purple-900/30' },
    { type: 'Investment', amount: 100, time: '3 hours ago', icon: '📈', color: 'text-green-400 bg-green-900/30' },
    { type: 'Reward', amount: 75, time: '1 day ago', icon: '🏆', color: 'text-amber-400 bg-amber-900/30' },
  ];

  // Investment packages
  const packages = [
    { name: 'Starter', amount: 30, users: 0, status: 'active' },
    { name: 'Bronze', amount: 100, users: 10, status: 'active' },
    { name: 'Silver', amount: 500, users: 25, status: 'active' },
    { name: 'Gold', amount: 1000, users: 50, status: 'locked' },
    { name: 'Platinum', amount: 2000, users: 100, status: 'locked' },
  ];

  // Set greeting based on time
  useEffect(() => {
    const hour = time.getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-to-r from-blue-900/20 to-transparent rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-gradient-to-l from-purple-900/20 to-transparent rounded-full blur-3xl opacity-10"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-blue-900/50 p-6 shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl">
                <FiDollarSign className="h-6 w-6 text-white" />
              </div>
              <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm font-semibold">
                +12.5%
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-1">Available Balance</p>
            <p className="text-3xl font-bold text-white mb-2">${userStats.totalBalance.toLocaleString()}</p>
            <div className="h-2 w-full bg-blue-900/30 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-green-900/50 p-6 shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-green-600 to-emerald-800 rounded-xl">
                <FiActivity className="h-6 w-6 text-white" />
              </div>
              <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-semibold">
                Today
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-1">Today's Earnings</p>
            <p className="text-3xl font-bold text-white mb-2">+${userStats.todayEarnings}</p>
            <p className="text-sm text-slate-400">From commissions & bonuses</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-purple-900/50 p-6 shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-800 rounded-xl">
                <RiTeamFill className="h-6 w-6 text-white" />
              </div>
              <span className="px-3 py-1 bg-purple-900/30 text-purple-400 rounded-full text-sm font-semibold">
                +24%
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-1">Team Members</p>
            <p className="text-3xl font-bold text-white mb-2">{userStats.teamMembers}</p>
            <div className="flex items-center text-sm text-slate-400">
              <FiUsers className="mr-2" />
              <span>Active network</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-amber-900/50 p-6 shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-amber-600 to-orange-800 rounded-xl">
                <MdWorkspacePremium className="h-6 w-6 text-white" />
              </div>
              <span className="px-3 py-1 bg-amber-900/30 text-amber-400 rounded-full text-sm font-semibold">
                Level {userStats.level}
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-1">Your Rank</p>
            <p className="text-3xl font-bold text-white mb-2">{userStats.rank}</p>
            <div className="h-2 w-full bg-amber-900/30 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full" style={{ width: `${userStats.nextLevelProgress}%` }}></div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700 p-6 shadow-lg backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Quick Actions</h2>
                <Link href="/dashboard" className="text-blue-400 text-sm font-medium hover:text-blue-300">
                  View All →
                </Link>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.link}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`bg-gradient-to-br ${action.color} rounded-2xl p-5 text-white cursor-pointer group relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative z-10">
                        <div className="mb-4">
                          {action.icon}
                        </div>
                        <h3 className="font-bold text-lg mb-1">{action.title}</h3>
                        <p className="text-white/90 text-sm">{action.desc}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-white/80 text-xs">Click to access</span>
                          <FiArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Earnings */}
          <div>
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700 p-6 shadow-lg backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Recent Earnings</h2>
                <FiClock className="text-slate-400" />
              </div>
              
              <div className="space-y-4">
                {recentEarnings.map((earning, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-2xl mr-4 ${earning.color}`}>
                      {earning.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{earning.type}</p>
                      <p className="text-sm text-slate-400">{earning.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-400 text-lg">+${earning.amount}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Today</span>
                  <span className="text-2xl font-bold text-white">+$550</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Packages */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700 p-6 mb-8 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Investment Packages</h2>
            <div className="flex items-center text-sm text-slate-400">
              <FiTarget className="mr-2" />
              <span>Complete 5 reviews daily</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl p-4 text-center ${
                  pkg.status === 'active' 
                    ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-700/50' 
                    : 'bg-gradient-to-br from-slate-800 to-slate-900/80 border border-slate-700'
                }`}
              >
                <div className={`h-10 w-10 mx-auto rounded-full flex items-center justify-center mb-3 ${
                  pkg.status === 'active' ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white' : 'bg-slate-700 text-slate-400'
                }`}>
                  {index + 1}
                </div>
                <h3 className="font-bold text-white mb-1">{pkg.name}</h3>
                <p className="text-2xl font-bold text-white mb-2">${pkg.amount}</p>
                <div className="text-sm text-slate-400 mb-3">
                  {pkg.users} users required
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  pkg.status === 'active' 
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white' 
                    : 'bg-gradient-to-r from-slate-700 to-slate-800 text-slate-400'
                }`}>
                  {pkg.status === 'active' ? 'Active' : 'Locked'}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-green-900/50 p-6 backdrop-blur-sm">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-gradient-to-br from-green-600 to-emerald-800 rounded-xl mr-4">
                <IoRocketOutline className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Active Streak</p>
                <p className="text-2xl font-bold text-white">{userStats.streakDays} days</p>
              </div>
            </div>
            <p className="text-sm text-slate-400">Keep your daily activity to maintain streak</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-purple-900/50 p-6 backdrop-blur-sm">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-800 rounded-xl mr-4">
                <FiAward className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Earnings</p>
                <p className="text-2xl font-bold text-white">${userStats.totalEarnings.toLocaleString()}</p>
              </div>
            </div>
            <p className="text-sm text-slate-400">Lifetime earnings from all sources</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-cyan-900/50 p-6 backdrop-blur-sm">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-gradient-to-br from-cyan-600 to-blue-800 rounded-xl mr-4">
                <FiShield className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Account Security</p>
                <p className="text-2xl font-bold text-white">100% Safe</p>
              </div>
            </div>
            <p className="text-sm text-slate-400">Your funds are protected and secured</p>
          </div>
        </div>
      </div>
    </div>
  );
}