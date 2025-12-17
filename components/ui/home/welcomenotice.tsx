'use client';

import { FiTrendingUp, FiDollarSign,FiEye,FiUser, FiUsers, FiPieChart, FiClock, FiAward, FiBarChart2, FiShield, FiGlobe, FiSmartphone, FiArrowRight, FiCheck, FiPlay, FiStar, FiHome } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WealthBridgeHomepage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('stocks');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle Signup Navigation
  const handleSignup = () => {
    router.push('/register');
  };

  // Handle Login Navigation
  const handleLogin = () => {
    router.push('/login');
  };

  // Handle View Success Stories
  const handleViewSuccessStories = () => {
    // Scroll to success section or navigate
    const element = document.getElementById('success-stories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <header className="relative py-28 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <FiTrendingUp className="text-white text-xl" />
            </div>
            <span className="text-3xl font-bold text-white">WealthBridge</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">Smart Investing, <span className="text-green-400">Exceptional Returns</span></h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-blue-100">
            Start your investment journey with our AI-powered platform and maximize your earnings potential
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignup}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold shadow-lg text-lg flex items-center justify-center space-x-2"
            >
              <span>Start Investing Now</span>
              <FiArrowRight />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignup}
              className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2"
            >
              <FiPlay className="text-white" />
              <span>Watch Demo</span>
            </motion.button>
          </div>
        </motion.div>
      </header>

      {/* Stats Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard 
            icon={<FiTrendingUp size={32} />} 
            value="18.2%" 
            label="Avg. Annual Return" 
            delay={0.1} 
            onClick={handleSignup}
          />
          <StatCard 
            icon={<FiUsers size={32} />} 
            value="500K+" 
            label="Active Investors" 
            delay={0.2} 
            onClick={handleSignup}
          />
          <StatCard 
            icon={<FiDollarSign size={32} />} 
            value="$4.2B+" 
            label="Assets Managed" 
            delay={0.3} 
            onClick={handleSignup}
          />
          <StatCard 
            icon={<FiAward size={32} />} 
            value="24/7" 
            label="Award-Winning Support" 
            delay={0.4} 
            onClick={handleSignup}
          />
        </div>
      </section>

      {/* Investment Options */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Investment Options</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Diversify your portfolio with our carefully curated investment opportunities</p>
          </div>
          
          <div className="flex justify-center mb-12">
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button 
                className={`px-6 py-3 font-medium rounded-lg transition-all ${activeTab === 'stocks' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:text-blue-600'}`}
                onClick={() => setActiveTab('stocks')}
              >
                Stocks
              </button>
              <button 
                className={`px-6 py-3 font-medium rounded-lg transition-all ${activeTab === 'crypto' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:text-blue-600'}`}
                onClick={() => setActiveTab('crypto')}
              >
                Crypto
              </button>
              <button 
                className={`px-6 py-3 font-medium rounded-lg transition-all ${activeTab === 'realestate' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:text-blue-600'}`}
                onClick={() => setActiveTab('realestate')}
              >
                Real Estate
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <InvestmentCard 
              name="Tech Growth Portfolio"
              returnRate="22.4%"
              riskLevel="Medium"
              minInvestment="$500"
              type={activeTab}
              delay={0.1}
              onClick={handleSignup}
            />
            <InvestmentCard 
              name="Dividend Income Fund"
              returnRate="8.7%"
              riskLevel="Low"
              minInvestment="$250"
              type={activeTab}
              delay={0.2}
              onClick={handleSignup}
            />
            <InvestmentCard 
              name="Global Opportunities"
              returnRate="16.9%"
              riskLevel="High"
              minInvestment="$1000"
              type={activeTab}
              delay={0.3}
              onClick={handleSignup}
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Start Investing in 3 Simple Steps</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our streamlined process makes investing accessible to everyone</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard 
              number={1} 
              title="Create Account" 
              description="Sign up and complete your investor profile in minutes" 
              icon={<FiSmartphone size={24} />}
              delay={0.1}
              onClick={handleSignup}
            />
            <StepCard 
              number={2} 
              title="Choose Strategy" 
              description="Select from curated portfolios or build your own" 
              icon={<FiPieChart size={24} />}
              delay={0.2}
              onClick={handleSignup}
            />
            <StepCard 
              number={3} 
              title="Track & Grow" 
              description="Monitor performance and adjust your portfolio easily" 
              icon={<FiTrendingUp size={24} />}
              delay={0.3}
              onClick={handleSignup}
            />
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="success-stories" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">See how our investors are achieving their financial goals</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <EarningCard 
              name="Michael R." 
              amount="$42,580" 
              activity="Tech stock portfolio" 
              time="2 years investing"
              delay={0.1}
              onClick={handleSignup}
            />
            <EarningCard 
              name="Sarah J." 
              amount="$28,950" 
              activity="Crypto investments" 
              time="18 months investing"
              delay={0.2}
              onClick={handleSignup}
            />
            <EarningCard 
              name="David L." 
              amount="$67,200" 
              activity="Real estate & stocks" 
              time="3 years investing"
              delay={0.3}
              onClick={handleSignup}
            />
          </div>
          <div className="text-center mt-8">
            <button 
              onClick={handleSignup}
              className="text-blue-600 font-bold hover:underline flex items-center justify-center space-x-2 mx-auto"
            >
              <span>View More Success Stories</span>
              <FiArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Bank-Level Security</h2>
            <p className="text-blue-200 max-w-2xl mx-auto">Your investments and personal data are protected with the highest security standards</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <SecurityCard 
              title="256-bit Encryption"
              description="Military-grade encryption protects all your data and transactions"
              icon={<FiShield size={32} />}
              delay={0.1}
              onClick={handleSignup}
            />
            <SecurityCard 
              title="Regulated & Licensed"
              description="Fully compliant with financial regulations in all operating regions"
              icon={<FiAward size={32} />}
              delay={0.2}
              onClick={handleSignup}
            />
            <SecurityCard 
              title="Insurance Protection"
              description="Up to $500,000 protection on cash balances with partner banks"
              icon={<FiDollarSign size={32} />}
              delay={0.3}
              onClick={handleSignup}
            />
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-6">Invest On The Go</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Our award-winning mobile app lets you manage your investments from anywhere, with real-time alerts and market insights.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <FiSmartphone className="text-green-600" />
                </div>
                <span>Real-time portfolio tracking</span>
              </li>
              <li className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <FiBarChart2 className="text-blue-600" />
                </div>
                <span>Advanced charting tools</span>
              </li>
              <li className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <FiClock className="text-purple-600" />
                </div>
                <span>Instant trade execution</span>
              </li>
            </ul>
            
          </div>
          <div className="md:w-1/2 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 w-72 h-[500px] shadow-2xl flex flex-col">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-bold">Portfolio Value</h3>
                    <FiEye className="text-blue-200" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">$42,869.42</h4>
                  <p className="text-green-300 text-sm">+$1,243.23 (2.98%) Today</p>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-200 text-sm">Tech Growth</span>
                    <span className="text-green-300 text-sm">+5.2%</span>
                  </div>
                  <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 w-3/5"></div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-200 text-sm">Dividend Income</span>
                    <span className="text-green-300 text-sm">+1.8%</span>
                  </div>
                  <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                    <div className="h-full bg-green-400 w-1/4"></div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-200 text-sm">Global Funds</span>
                    <span className="text-green-300 text-sm">+3.4%</span>
                  </div>
                  <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-400 w-2/5"></div>
                  </div>
                </div>
                
                <div className="mt-auto flex justify-between">
                  <button 
                    onClick={handleSignup}
                    className="bg-white/10 text-white p-3 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <FiHome size={20} />
                  </button>
                  <button 
                    onClick={handleSignup}
                    className="bg-white/10 text-white p-3 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <FiPieChart size={20} />
                  </button>
                  <button 
                    onClick={handleSignup}
                    className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    <FiDollarSign size={20} />
                  </button>
                  <button 
                    onClick={handleSignup}
                    className="bg-white/10 text-white p-3 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <FiBarChart2 size={20} />
                  </button>
                  <button 
                    onClick={handleLogin}
                    className="bg-white/10 text-white p-3 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <FiUser size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Investors Say</h2>
            <p className="text-blue-200 max-w-2xl mx-auto">Hear from our community of successful investors</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard 
              name="Alex Johnson"
              role="Software Engineer"
              text="WealthBridge has completely transformed how I manage my investments. The platform is intuitive and the returns have been outstanding."
              rating={5}
              delay={0.1}
              onClick={handleSignup}
            />
            <TestimonialCard 
              name="Maria Rodriguez"
              role="Business Owner"
              text="As someone new to investing, I appreciated the educational resources and guidance. My portfolio has grown 34% in just 18 months."
              rating={5}
              delay={0.2}
              onClick={handleSignup}
            />
            <TestimonialCard 
              name="James Wilson"
              role="Retired Teacher"
              text="The dividend investment strategies have provided a steady income stream for my retirement. I couldn't be happier with the results."
              rating={5}
              delay={0.3}
              onClick={handleSignup}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900 to-indigo-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mix-blend-overlay opacity-10"></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <FiTrendingUp className="text-white text-xl" />
            </div>
            <span className="text-3xl font-bold text-white">WealthBridge</span>
          </div>
          
          <h2 className="text-3xl font-bold mb-6">Ready to Grow Your Wealth?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-blue-200">
            Join thousands of investors who are already building their financial future with our platform
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-4">Get started with just $100</h3>
            <p className="text-blue-200 mb-6">No account fees or hidden charges</p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white/5 p-4 rounded-xl">
                <FiCheck className="text-green-400 mx-auto mb-2" size={20} />
                <p className="text-sm">No commission fees</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl">
                <FiCheck className="text-green-400 mx-auto mb-2" size={20} />
                <p className="text-sm">24/7 support</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl">
                <FiCheck className="text-green-400 mx-auto mb-2" size={20} />
                <p className="text-sm">SSL encryption</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignup}
                className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-lg font-bold text-lg flex-1"
              >
                Create Your Account
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogin}
                className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-lg font-bold text-lg border border-white/30 transition-colors"
              >
                Login
              </motion.button>
            </div>
            <p className="text-blue-200 text-sm mt-4">Get your first month free</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        
          
          
          
          
          
        
          
         
        
        <div className="max-w-6xl mx-auto border-t border-gray-800 mt-8 pt-8 text-center">
          <p>© {new Date().getFullYear()} WealthBridge. All rights reserved.</p>
         
        </div>
      </footer>
    </div>
  );
}

// Component for stat cards
function StatCard({ icon, value, label, delay = 0, onClick }: { 
  icon: React.ReactNode, 
  value: string, 
  label: string, 
  delay?: number,
  onClick?: () => void 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="text-blue-600 mb-3 flex justify-center">{icon}</div>
      <h3 className="text-2xl font-bold mb-2">{value}</h3>
      <p className="text-gray-600">{label}</p>
    </motion.div>
  );
}

// Component for steps
function StepCard({ number, title, description, icon, delay = 0, onClick }: { 
  number: number, 
  title: string, 
  description: string, 
  icon: React.ReactNode,
  delay?: number,
  onClick?: () => void
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
      className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4 mx-auto">
        {icon}
      </div>
      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold -mt-11 mb-2 mx-auto">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </motion.div>
  );
}

// Component for investment cards
function InvestmentCard({ name, returnRate, riskLevel, minInvestment, type, delay = 0, onClick }: { 
  name: string, 
  returnRate: string, 
  riskLevel: string,
  minInvestment: string,
  type: string,
  delay?: number,
  onClick?: () => void
}) {
  const getRiskColor = (level: string) => {
    switch(level.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'stocks': return <FiTrendingUp size={48} className="text-blue-600" />;
      case 'crypto': return <FiGlobe size={48} className="text-purple-600" />;
      case 'realestate': return <FiBarChart2 size={48} className="text-green-600" />;
      default: return <FiTrendingUp size={48} className="text-blue-600" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow-md border border-gray-100 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="h-40 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg mb-4 flex items-center justify-center">
        {getTypeIcon(type)}
      </div>
      <h3 className="font-bold text-lg mb-2">{name}</h3>
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-gray-500 text-sm">Annual Return</p>
          <p className="text-green-600 font-bold">{returnRate}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Risk Level</p>
          <span className={`px-2 py-1 rounded-full text-xs font-bold ${getRiskColor(riskLevel)}`}>
            {riskLevel}
          </span>
        </div>
      </div>
      <div className="bg-gray-100 p-3 rounded-lg mb-4">
        <p className="text-gray-500 text-sm">Minimum Investment</p>
        <p className="font-bold">{minInvestment}</p>
      </div>
      <button 
        onClick={onClick}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
      >
        Invest Now
      </button>
    </motion.div>
  );
}

// Component for earning cards
function EarningCard({ name, amount, activity, time, delay = 0, onClick }: { 
  name: string, 
  amount: string, 
  activity: string, 
  time: string,
  delay?: number,
  onClick?: () => void
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow-md border border-gray-100 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-lg">{name}</h3>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
          +{amount}
        </span>
      </div>
      <p className="text-gray-600 mb-2">{activity}</p>
      <p className="text-gray-400 text-sm">{time}</p>
    </motion.div>
  );
}

// Component for security cards
function SecurityCard({ title, description, icon, delay = 0, onClick }: { 
  title: string, 
  description: string, 
  icon: React.ReactNode,
  delay?: number,
  onClick?: () => void
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
      className="bg-gray-800 p-6 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors"
    >
      <div className="text-blue-400 mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
      <p className="text-gray-300 text-center">{description}</p>
    </motion.div>
  );
}

// Component for testimonial cards
function TestimonialCard({ name, role, text, rating, delay = 0, onClick }: { 
  name: string, 
  role: string, 
  text: string,
  rating: number,
  delay?: number,
  onClick?: () => void
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
      className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10 cursor-pointer hover:bg-white/15 transition-colors"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
          {name.charAt(0)}
        </div>
        <div>
          <h3 className="font-bold text-lg text-white">{name}</h3>
          <p className="text-blue-200">{role}</p>
        </div>
      </div>
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <FiStar 
            key={i} 
            className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"} 
            size={18} 
          />
        ))}
      </div>
      <p className="text-blue-100 italic">"{text}"</p>
    </motion.div>
  );
}