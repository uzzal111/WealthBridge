'use client';

import { FiTrendingUp, FiDollarSign, FiUser, FiPieChart, FiBarChart2, FiBell, FiSettings, FiLogOut } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function AuthHomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      

      {/* Welcome Section */}
      <header className="py-12 px-4 text-center bg-gray-50 border-b border-gray-200">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome back, Investor 👋</h1>
          <p className="text-gray-600 text-lg">Here’s an overview of your portfolio and performance</p>
        </motion.div>
      </header>

      {/* Portfolio Overview */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <DashboardCard 
            icon={<FiDollarSign size={28} />} 
            title="Portfolio Value" 
            value="$42,869.42" 
            change="+2.98% today" 
            changeType="positive" 
            delay={0.1} 
          />
          <DashboardCard 
            icon={<FiPieChart size={28} />} 
            title="Active Investments" 
            value="12" 
            change="+2 this week" 
            changeType="positive" 
            delay={0.2} 
          />
          <DashboardCard 
            icon={<FiBarChart2 size={28} />} 
            title="Avg. Return" 
            value="18.2%" 
            change="YTD" 
            changeType="neutral" 
            delay={0.3} 
          />
        </div>
      </section>

      {/* Investment Breakdown */}
      <section className="py-12 px-4 border-t border-b bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Investments</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <InvestmentTile name="Tech Growth Portfolio" value="$18,200" change="+5.2%" />
            <InvestmentTile name="Dividend Income Fund" value="$9,450" change="+1.8%" />
            <InvestmentTile name="Global Opportunities" value="$15,219" change="+3.4%" />
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <ActionCard icon={<FiTrendingUp size={24} />} title="Invest More" desc="Add funds to your portfolio" />
          <ActionCard icon={<FiPieChart size={24} />} title="Rebalance" desc="Adjust portfolio allocation" />
          <ActionCard icon={<FiUser size={24} />} title="Profile" desc="Manage your account details" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-500 py-6 text-center mt-12 border-t">
        <p>© {new Date().getFullYear()} WealthBridge. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Dashboard card component
function DashboardCard({ icon, title, value, change, changeType, delay = 0 }: {
  icon: React.ReactNode,
  title: string,
  value: string,
  change: string,
  changeType: 'positive' | 'negative' | 'neutral',
  delay?: number
}) {
  const changeColor = changeType === 'positive' ? 'text-green-600' : changeType === 'negative' ? 'text-red-600' : 'text-gray-500';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
    >
      <div className="flex items-center justify-between mb-4 text-blue-600">{icon}</div>
      <h3 className="text-gray-500 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className={`text-sm mt-2 ${changeColor}`}>{change}</p>
    </motion.div>
  );
}

// Investment tile
function InvestmentTile({ name, value, change }: { name: string, value: string, change: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="font-bold text-lg mb-2 text-gray-800">{name}</h3>
      <p className="text-gray-600">{value}</p>
      <p className="text-green-600 text-sm font-medium">{change}</p>
    </div>
  );
}

// Quick Action card
function ActionCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer">
      <div className="text-blue-600 mb-3">{icon}</div>
      <h3 className="font-bold mb-1 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}
