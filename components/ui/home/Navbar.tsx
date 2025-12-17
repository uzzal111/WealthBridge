'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiTrendingUp, FiMenu, FiX, FiArrowRight, FiUser } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const HomeNavbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleJoinNowClick = () => {
    router.push('/register');
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    router.push('/login');
    setIsMenuOpen(false);
  };

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/98 backdrop-blur-xl shadow-lg border-b border-gray-100/80 py-2' 
            : 'bg-white/95 backdrop-blur-lg border-b border-gray-100/60 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo & Brand - Mobile Optimized */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleHomeClick}
              className="flex items-center space-x-2 sm:space-x-3 group min-w-0"
            >
              {/* Enhanced Logo Container */}
              <div className="relative">
                {/* Logo for different screen sizes */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg overflow-hidden flex items-center justify-center">
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20"></div>
                  
                  {/* Logo Icon */}
                  <FiTrendingUp className="text-white text-sm sm:text-lg md:text-xl relative z-10" />
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-1 left-1 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/40 rounded-full"></div>
                  <div className="absolute bottom-1 right-1 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/30 rounded-full"></div>
                </div>
                
                {/* Floating Animation - Only on desktop */}
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border border-white hidden sm:block"
                />
              </div>
              
              {/* Brand Name - Responsive text sizes */}
              <div className="flex flex-col items-start min-w-0">
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent whitespace-nowrap overflow-hidden text-ellipsis">
                  WealthBridge
                </span>
                <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-500 font-medium tracking-wider hidden xs:block">
                  Intelligent Investing
                </span>
              </div>
            </motion.button>

            {/* Desktop Navigation Actions */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
              {/* Login Button */}
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLoginClick}
                className="flex items-center space-x-2 px-3 py-1.5 lg:px-4 lg:py-2.5 text-sm lg:text-base text-gray-700 hover:text-cyan-600 font-medium rounded-lg lg:rounded-xl hover:bg-gray-50/80 transition-all duration-200 border border-gray-200"
              >
                <FiUser className="text-cyan-500 text-sm lg:text-base" />
                <span>Login</span>
              </motion.button>
              
              {/* Join Now Button */}
              <motion.button
                whileHover={{ 
                  scale: 1.03,
                  y: -1,
                  boxShadow: "0 8px 20px -5px rgba(6, 182, 212, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                onClick={handleJoinNowClick}
                className="relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                <span className="relative flex items-center space-x-1 lg:space-x-2 text-white px-3 py-1.5 lg:px-5 lg:py-2.5 text-sm lg:text-base font-bold rounded-lg lg:rounded-xl shadow-md">
                  <span>Join Free</span>
                  <FiArrowRight className="group-hover:translate-x-0.5 lg:group-hover:translate-x-1 transition-transform text-xs lg:text-sm" />
                </span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-center shadow-sm hover:shadow transition-all"
            >
              {isMenuOpen ? (
                <FiX className="text-gray-700 w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <FiMenu className="text-gray-700 w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </motion.button>
          </div>
        </div>
        
        {/* Bottom Gradient Line - Responsive height */}
        <div className="h-0.5 w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 mt-1 sm:mt-2"></div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white/98 backdrop-blur-xl shadow-2xl z-50 md:hidden flex flex-col"
            >
              {/* Menu Header */}
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <FiTrendingUp className="text-white text-lg sm:text-xl" />
                    </div>
                    <div>
                      <span className="text-lg sm:text-xl font-bold text-gray-900">WealthBridge</span>
                      <p className="text-xs text-gray-500">Smart Investing</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-100 flex items-center justify-center"
                  >
                    <FiX className="text-gray-700 w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                
                {/* User Info */}
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">Start your investment journey</p>
                  <p className="text-base sm:text-lg font-bold text-gray-900">Join 500K+ Investors</p>
                </div>
              </div>
              
              {/* Menu Items */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                {/* Quick Actions */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 sm:mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handleLoginClick}
                      className="w-full flex items-center justify-between p-3 sm:p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors active:scale-95"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-lg flex items-center justify-center">
                          <FiUser className="text-cyan-600 text-sm sm:text-base" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-gray-900 text-sm sm:text-base">Login</p>
                          <p className="text-xs text-gray-500">Access your account</p>
                        </div>
                      </div>
                      <FiArrowRight className="text-gray-400 text-sm sm:text-base" />
                    </motion.button>
                    
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handleJoinNowClick}
                      className="w-full flex items-center justify-between p-3 sm:p-4 rounded-xl bg-gradient-to-r from-cyan-500/5 to-blue-600/5 hover:from-cyan-500/10 hover:to-blue-600/10 transition-all active:scale-95"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                          <FiTrendingUp className="text-cyan-600 text-sm sm:text-base" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-gray-900 text-sm sm:text-base">Join Free</p>
                          <p className="text-xs text-gray-500">Start investing today</p>
                        </div>
                      </div>
                      <FiArrowRight className="text-cyan-600 text-sm sm:text-base" />
                    </motion.button>
                  </div>
                </div>

                {/* Features List */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 sm:mb-4">Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'AI Investing', color: 'from-cyan-500/10 to-cyan-600/10' },
                      { label: 'Portfolio', color: 'from-blue-500/10 to-blue-600/10' },
                      { label: 'Real-time', color: 'from-green-500/10 to-green-600/10' },
                      { label: 'Secure', color: 'from-purple-500/10 to-purple-600/10' },
                    ].map((item, index) => (
                      <div key={index} className={`bg-gradient-to-r ${item.color} rounded-lg p-3 text-center`}>
                        <p className="text-xs font-medium text-gray-800">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Statistics */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <p className="text-lg sm:text-xl font-bold text-gray-900">18.2%</p>
                      <p className="text-xs text-gray-600">Avg Return</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg sm:text-xl font-bold text-gray-900">500K+</p>
                      <p className="text-xs text-gray-600">Investors</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mobile CTA Button */}
              <div className="p-4 border-t border-gray-100">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleJoinNowClick}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center space-x-2"
                >
                  <span>Get Started Free</span>
                  <FiArrowRight className="text-white" />
                </motion.button>
                <p className="text-center text-xs text-gray-500 mt-2">No fees, no minimum balance</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-16 sm:h-20"></div>
    </>
  );
};

export default HomeNavbar;