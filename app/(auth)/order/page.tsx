'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaStar, FaUserFriends, FaDollarSign, FaCheckCircle, 
  FaLock, FaEdit, FaHistory, FaCrown, FaRocket, FaGem,
  FaShoppingCart, FaMobileAlt, FaLaptop, FaTv, FaCar,
  FaHeadphones, FaCamera, FaGamepad, FaArrowLeft, FaTimes,
  FaCalendarDay, FaChartLine, FaAward, FaShoppingBag
} from 'react-icons/fa';

// Define TypeScript interfaces
interface Review {
  id: string;
  productName: string;
  productImage: string;
  rating: number;
  comment: string;
  createdAt: Date;
  packageName: string;
}

interface Package {
  id: number;
  name: string;
  minInvestment: number;
  maxInvestment: number;
  reviewsRequired: number;
  unlocked: boolean;
  activeUsersRequired: number;
  reviewsSubmitted: number;
  lastReviewTime: Date | null;
  cooldownUntil: Date | null;
  color: string;
  gradient: string;
  icon: React.ReactNode;
}

interface User {
  id: string;
  name: string;
  investmentAmount: number;
  isActive: boolean;
}

// Predefined product options with images
const PRODUCTS = [
  { id: 1, name: 'iPhone 15 Pro', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop&crop=center', category: 'mobile' },
  { id: 2, name: 'Samsung Galaxy S23', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop&crop=center', category: 'mobile' },
  { id: 3, name: 'MacBook Pro M3', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&crop=center', category: 'laptop' },
  { id: 4, name: 'Nike Air Max', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center', category: 'fashion' },
  { id: 5, name: 'Sony WH-1000XM5', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center', category: 'audio' },
  { id: 6, name: 'Canon EOS R5', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop&crop=center', category: 'camera' },
  { id: 7, name: 'Dyson Vacuum', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center', category: 'home' },
  { id: 8, name: 'LG OLED TV', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop&crop=center', category: 'tv' },
  { id: 9, name: 'Amazon Echo', image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400&h=400&fit=crop&crop=center', category: 'smart' },
  { id: 10, name: 'Tesla Model 3', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=400&fit=crop&crop=center', category: 'car' },
];

// Package Icons and Colors
const PACKAGE_CONFIGS = [
  { id: 1, name: 'Starter', color: 'from-blue-500 to-cyan-400', icon: <FaRocket className="text-blue-400" /> },
  { id: 2, name: 'Bronze', color: 'from-amber-600 to-yellow-500', icon: <FaGem className="text-amber-400" /> },
  { id: 3, name: 'Silver', color: 'from-gray-400 to-gray-300', icon: <FaGem className="text-gray-300" /> },
  { id: 4, name: 'Gold', color: 'from-yellow-500 to-amber-400', icon: <FaCrown className="text-yellow-400" /> },
  { id: 5, name: 'Platinum', color: 'from-teal-500 to-emerald-400', icon: <FaCrown className="text-teal-400" /> },
  { id: 6, name: 'Diamond', color: 'from-indigo-500 to-purple-400', icon: <FaGem className="text-indigo-400" /> },
  { id: 7, name: 'Executive', color: 'from-red-500 to-pink-400', icon: <FaCrown className="text-red-400" /> },
  { id: 8, name: 'Premium', color: 'from-purple-600 to-pink-500', icon: <FaCrown className="text-purple-400" /> },
  { id: 9, name: 'Elite', color: 'from-rose-600 to-orange-500', icon: <FaCrown className="text-rose-400" /> },
  { id: 10, name: 'VIP', color: 'from-violet-600 to-fuchsia-500', icon: <FaCrown className="text-violet-400" /> },
];

export default function WealthBridgePremiumReviewSystem() {
  // Mock user data
  const [currentUser] = useState<User>({
    id: 'user1',
    name: 'Alex Johnson',
    investmentAmount: 750,
    isActive: true
  });

  // Package tiers with cooldown tracking
  const [packages, setPackages] = useState<Package[]>([
    { id: 1, name: 'Starter', minInvestment: 30, maxInvestment: 100, reviewsRequired: 5, unlocked: true, activeUsersRequired: 0, reviewsSubmitted: 3, lastReviewTime: null, cooldownUntil: null, color: 'blue', gradient: 'from-blue-500 to-cyan-400', icon: <FaRocket /> },
    { id: 2, name: 'Bronze', minInvestment: 101, maxInvestment: 500, reviewsRequired: 5, unlocked: false, activeUsersRequired: 10, reviewsSubmitted: 0, lastReviewTime: null, cooldownUntil: null, color: 'amber', gradient: 'from-amber-600 to-yellow-500', icon: <FaGem /> },
    { id: 3, name: 'Silver', minInvestment: 501, maxInvestment: 1000, reviewsRequired: 5, unlocked: false, activeUsersRequired: 25, reviewsSubmitted: 0, lastReviewTime: null, cooldownUntil: null, color: 'gray', gradient: 'from-gray-400 to-gray-300', icon: <FaGem /> },
    { id: 4, name: 'Gold', minInvestment: 1001, maxInvestment: 2000, reviewsRequired: 5, unlocked: false, activeUsersRequired: 50, reviewsSubmitted: 0, lastReviewTime: null, cooldownUntil: null, color: 'yellow', gradient: 'from-yellow-500 to-amber-400', icon: <FaCrown /> },
    { id: 5, name: 'Platinum', minInvestment: 2001, maxInvestment: 5000, reviewsRequired: 5, unlocked: false, activeUsersRequired: 100, reviewsSubmitted: 0, lastReviewTime: null, cooldownUntil: null, color: 'teal', gradient: 'from-teal-500 to-emerald-400', icon: <FaCrown /> },
    { id: 6, name: 'Diamond', minInvestment: 5001, maxInvestment: 10000, reviewsRequired: 5, unlocked: false, activeUsersRequired: 200, reviewsSubmitted: 0, lastReviewTime: null, cooldownUntil: null, color: 'indigo', gradient: 'from-indigo-500 to-purple-400', icon: <FaGem /> },
    { id: 7, name: 'Executive', minInvestment: 10001, maxInvestment: 25000, reviewsRequired: 5, unlocked: false, activeUsersRequired: 500, reviewsSubmitted: 0, lastReviewTime: null, cooldownUntil: null, color: 'red', gradient: 'from-red-500 to-pink-400', icon: <FaCrown /> },
    { id: 8, name: 'Premium', minInvestment: 25001, maxInvestment: 50000, reviewsRequired: 5, unlocked: false, activeUsersRequired: 1000, reviewsSubmitted: 0, lastReviewTime: null, cooldownUntil: null, color: 'purple', gradient: 'from-purple-600 to-pink-500', icon: <FaCrown /> },
    { id: 9, name: 'Elite', minInvestment: 50001, maxInvestment: 100000, reviewsRequired: 5, unlocked: false, activeUsersRequired: 2500, reviewsSubmitted: 0, lastReviewTime: null, cooldownUntil: null, color: 'rose', gradient: 'from-rose-600 to-orange-500', icon: <FaCrown /> },
    { id: 10, name: 'VIP', minInvestment: 100001, maxInvestment: 500000, reviewsRequired: 5, unlocked: false, activeUsersRequired: 5000, reviewsSubmitted: 0, lastReviewTime: null, cooldownUntil: null, color: 'violet', gradient: 'from-violet-600 to-fuchsia-500', icon: <FaCrown /> }
  ]);

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      productName: 'iPhone 15 Pro',
      productImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop&crop=center',
      rating: 5,
      comment: 'Amazing phone with excellent camera quality! The battery life is impressive.',
      createdAt: new Date('2024-01-15'),
      packageName: 'Starter'
    },
    {
      id: '2',
      productName: 'Samsung Galaxy S23',
      productImage: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop&crop=center',
      rating: 4,
      comment: 'Great performance but battery could be better. Camera is excellent though!',
      createdAt: new Date('2024-01-14'),
      packageName: 'Starter'
    },
    {
      id: '3',
      productName: 'MacBook Pro M3',
      productImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&crop=center',
      rating: 5,
      comment: 'Best laptop I have ever used. The M3 chip is blazing fast!',
      createdAt: new Date('2024-01-13'),
      packageName: 'Starter'
    }
  ]);
  
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [showProductSelection, setShowProductSelection] = useState<boolean>(false);
  const [currentPackage, setCurrentPackage] = useState<Package | null>(null);
  const [newReview, setNewReview] = useState<{ 
    productId: number | null;
    productName: string; 
    productImage: string;
    rating: number; 
    comment: string; 
    customProductName: string;
  }>({
    productId: null,
    productName: '',
    productImage: '',
    rating: 5,
    comment: '',
    customProductName: ''
  });

  // Active users count
  const [activeUsers] = useState<number>(15);

  // Check package eligibility and cooldowns
  useEffect(() => {
    const updatedPackages = packages.map(pkg => {
      if (pkg.id === 1) return { ...pkg, unlocked: true };
      
      const investmentQualifies = currentUser.investmentAmount >= pkg.minInvestment;
      const usersQualify = activeUsers >= pkg.activeUsersRequired;
      
      // Count reviews submitted for this package
      const packageReviews = reviews.filter(review => review.packageName === pkg.name);
      
      return {
        ...pkg,
        unlocked: investmentQualifies && usersQualify,
        reviewsSubmitted: packageReviews.length,
      };
    });
    
    setPackages(updatedPackages);
  }, [currentUser.investmentAmount, activeUsers, reviews]);

  // Handle opening review modal
  const handleOpenReview = (pkg: Package) => {
    if (!pkg.unlocked) return;
    
    // Check if user has already completed 5 reviews for this package
    if (pkg.reviewsSubmitted >= pkg.reviewsRequired) {
      alert(`You've already completed today's ${pkg.reviewsRequired} reviews for the ${pkg.name} package. Come back tomorrow for more reviews!`);
      return;
    }
    
    setCurrentPackage(pkg);
    setShowReviewModal(true);
    setShowProductSelection(true);
    setNewReview({
      productId: null,
      productName: '',
      productImage: '',
      rating: 5,
      comment: '',
      customProductName: ''
    });
  };

  // Handle selecting a product
  const handleSelectProduct = (product: typeof PRODUCTS[0]) => {
    setNewReview({
      ...newReview,
      productId: product.id,
      productName: product.name,
      productImage: product.image
    });
    setShowProductSelection(false);
  };

  // Handle using custom product
  const handleCustomProduct = () => {
    setNewReview({
      ...newReview,
      productId: null,
      productName: '',
      productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center'
    });
    setShowProductSelection(false);
  };

  // Handle submitting a review
  const handleSubmitReview = () => {
    const finalProductName = newReview.productId ? newReview.productName : newReview.customProductName;
    
    if (!finalProductName.trim() || !newReview.comment.trim()) {
      alert('Please fill in all fields');
      return;
    }

    if (!currentPackage) return;

    const review: Review = {
      id: Math.random().toString(36).substring(7),
      productName: finalProductName,
      productImage: newReview.productImage,
      rating: newReview.rating,
      comment: newReview.comment,
      createdAt: new Date(),
      packageName: currentPackage.name
    };

    setReviews([...reviews, review]);
    
    // Update package review count
    const updatedPackages = packages.map(pkg => 
      pkg.id === currentPackage.id ? { 
        ...pkg, 
        reviewsSubmitted: pkg.reviewsSubmitted + 1,
        lastReviewTime: new Date()
      } : pkg
    );
    
    setPackages(updatedPackages);
    setNewReview({ 
      productId: null,
      productName: '', 
      productImage: '', 
      rating: 5, 
      comment: '',
      customProductName: ''
    });
    setShowReviewModal(false);
    setShowProductSelection(false);
    
    // Check if this was the final review
    if (currentPackage.reviewsSubmitted + 1 >= currentPackage.reviewsRequired) {
      alert(`🎉 Congratulations! You've completed today's ${currentPackage.reviewsRequired} reviews for the ${currentPackage.name} package.`);
    } else {
      alert('✅ Review submitted successfully!');
    }
  };

  // Progress bar component
  const ProgressBar = ({ current, total, label, color = 'blue' }: { current: number; total: number; label: string; color?: string }) => (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-300">{label}</span>
        <span className="font-semibold text-white">{current}/{total}</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
        <motion.div 
          className={`h-full rounded-full ${color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-cyan-400' : 
            color === 'amber' ? 'bg-gradient-to-r from-amber-500 to-yellow-400' :
            color === 'green' ? 'bg-gradient-to-r from-green-500 to-emerald-400' :
            'bg-gradient-to-r from-purple-500 to-pink-400'}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min((current / total) * 100, 100)}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );

  // Package card component
  const PackageCard = ({ pkg }: { pkg: Package }) => {
    const isCompleted = pkg.reviewsSubmitted >= pkg.reviewsRequired;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: pkg.id * 0.05 }}
        whileHover={{ scale: 1.02 }}
        className={`relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 ${
          pkg.unlocked 
            ? 'cursor-pointer hover:shadow-3xl' 
            : 'opacity-90 cursor-not-allowed'
        }`}
        onClick={() => handleOpenReview(pkg)}
      >
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${pkg.gradient} opacity-20`} />
        
        {/* Main Content */}
        <div className="relative bg-gray-900/90 backdrop-blur-sm p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${pkg.gradient}`}>
                {pkg.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                <p className="text-gray-400 text-sm">
                  ${pkg.minInvestment.toLocaleString()} - ${pkg.maxInvestment.toLocaleString()}
                </p>
              </div>
            </div>
            
            {/* Status Badge */}
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${
              !pkg.unlocked ? 'bg-red-500/20 text-red-400' :
              isCompleted ? 'bg-green-500/20 text-green-400' :
              'bg-blue-500/20 text-blue-400'
            }`}>
              {!pkg.unlocked ? '🔒 Locked' :
               isCompleted ? '✅ Completed' :
               '📝 Available'}
            </div>
          </div>
          
          {/* Progress Bar */}
          <ProgressBar 
            current={pkg.reviewsSubmitted} 
            total={pkg.reviewsRequired} 
            label="Today's Progress" 
            color={pkg.color}
          />
          
          {/* Requirements */}
          <div className="space-y-3 text-sm mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-400">
                <FaUserFriends className="w-4 h-4 mr-2" />
                <span>Active Users Required</span>
              </div>
              <span className={`font-semibold ${activeUsers >= pkg.activeUsersRequired ? 'text-green-400' : 'text-red-400'}`}>
                {pkg.activeUsersRequired}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-400">
                <FaDollarSign className="w-4 h-4 mr-2" />
                <span>Min Investment</span>
              </div>
              <span className={`font-semibold ${currentUser.investmentAmount >= pkg.minInvestment ? 'text-green-400' : 'text-red-400'}`}>
                ${pkg.minInvestment.toLocaleString()}
              </span>
            </div>
          </div>
          
          {/* Action Button */}
          <button 
            className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
              !pkg.unlocked 
                ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                : isCompleted
                ? 'bg-gradient-to-r from-green-600 to-emerald-500 text-white'
                : `bg-gradient-to-r ${pkg.gradient} text-white hover:opacity-90`
            }`}
            disabled={!pkg.unlocked || isCompleted}
          >
            {!pkg.unlocked ? (
              <span className="flex items-center justify-center">
                <FaLock className="w-4 h-4 mr-2" />
                Unlock Package
              </span>
            ) : isCompleted ? (
              <span className="flex items-center justify-center">
                <FaCheckCircle className="w-5 h-5 mr-2" />
                Daily Work Completed
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <FaEdit className="w-4 h-4 mr-2" />
                Write Review ({pkg.reviewsSubmitted}/{pkg.reviewsRequired})
              </span>
            )}
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-40 lg:hidden">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <FaArrowLeft className="w-6 h-6 text-white" />
        </motion.button>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* User Info Card */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-gray-800/80 to-purple-900/80 rounded-3xl shadow-2xl p-6 lg:p-8 mb-8 backdrop-blur-sm border border-gray-700"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="text-center lg:text-left mb-6 lg:mb-0">
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Welcome back, {currentUser.name}! 👋
              </h1>
              <p className="text-gray-300 text-lg">
                Investment Portfolio: <span className="font-bold text-green-400">${currentUser.investmentAmount.toLocaleString()}</span>
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Complete daily reviews to unlock premium benefits and rewards
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 w-full lg:w-auto">
              {[
                { value: activeUsers, label: 'Active Users', icon: <FaUserFriends />, color: 'text-blue-400' },
                { value: reviews.length, label: 'Total Reviews', icon: <FaEdit />, color: 'text-purple-400' },
                { 
                  value: packages.filter(pkg => pkg.reviewsSubmitted >= pkg.reviewsRequired).length, 
                  label: 'Completed Today', 
                  icon: <FaCheckCircle />, 
                  color: 'text-green-400' 
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 text-center"
                >
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm flex items-center justify-center">
                    {stat.icon}
                    <span className="ml-2">{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Packages Grid */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-white flex items-center">
              <FaCrown className="w-6 h-6 mr-3 text-yellow-400" />
              Available Packages
            </h2>
            <div className="text-gray-400 text-sm hidden lg:block">
              <FaCalendarDay className="inline w-4 h-4 mr-2" />
              Resets daily
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>

        {/* Recent Reviews Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-gray-800/80 to-purple-900/80 rounded-3xl shadow-2xl p-6 lg:p-8 mb-8 backdrop-blur-sm border border-gray-700"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <FaHistory className="w-6 h-6 mr-3 text-blue-400" />
              Your Recent Reviews
            </h3>
            <span className="text-gray-400 text-sm">{reviews.length} reviews</span>
          </div>
          
          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                <FaEdit className="w-12 h-12 text-gray-600" />
              </div>
              <p className="text-gray-400 text-lg">No reviews yet. Start reviewing to earn rewards!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-5 border border-gray-700 hover:border-blue-500 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="relative flex-shrink-0">
                      <img 
                        src={review.productImage} 
                        alt={review.productName}
                        className="w-20 h-20 rounded-xl object-cover border-2 border-gray-600"
                      />
                      <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-bold ${
                        review.packageName === 'VIP' ? 'bg-gradient-to-r from-violet-600 to-fuchsia-500' :
                        review.packageName === 'Premium' ? 'bg-gradient-to-r from-purple-600 to-pink-500' :
                        'bg-gradient-to-r from-blue-600 to-cyan-500'
                      } text-white`}>
                        {review.packageName}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white mb-2 truncate">{review.productName}</h4>
                      <div className="flex items-center mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                          />
                        ))}
                        <span className="ml-2 text-gray-400 text-sm">{review.rating}/5</span>
                      </div>
                      <p className="text-gray-300 text-sm line-clamp-2 mb-3">{review.comment}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-xs">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                        <button className="text-blue-400 hover:text-blue-300 text-xs">
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {/* Product Selection Modal */}
        {showReviewModal && showProductSelection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full border border-gray-700 max-h-[90vh] overflow-hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">Select Product 📱</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Choose a product to review for <span className="text-blue-400 font-semibold">{currentPackage?.name}</span> package
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowReviewModal(false)}
                    className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
                  >
                    <FaTimes className="w-6 h-6" />
                  </button>
                </div>

                {/* Product Grid */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4">Popular Products</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {PRODUCTS.map((product) => (
                      <motion.button
                        key={product.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSelectProduct(product)}
                        className="group relative bg-gray-800 rounded-2xl p-4 border border-gray-700 hover:border-blue-500 hover:bg-gray-800/80 transition-all duration-300"
                      >
                        <div className="aspect-square overflow-hidden rounded-xl mb-3">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <p className="text-white text-sm font-medium text-center truncate">{product.name}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Custom Product Button */}
                <div className="border-t border-gray-700 pt-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Review Custom Product</h4>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCustomProduct}
                    className="w-full p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl border-2 border-dashed border-gray-600 hover:border-blue-500 hover:from-gray-800/80 hover:to-gray-900/80 transition-all duration-300 flex flex-col items-center justify-center group"
                  >
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4 group-hover:bg-gray-600">
                      <FaShoppingBag className="w-8 h-8 text-gray-400 group-hover:text-blue-400" />
                    </div>
                    <span className="text-white font-semibold text-lg">Add Your Own Product</span>
                    <p className="text-gray-400 text-sm mt-2">Review any product of your choice</p>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Review Modal */}
        {showReviewModal && !showProductSelection && currentPackage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl max-w-md w-full border border-gray-700"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">Write Review ✍️</h3>
                  <button 
                    onClick={() => setShowReviewModal(false)}
                    className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded-full"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Package Info */}
                <div className={`p-4 rounded-xl bg-gradient-to-r ${currentPackage.gradient} bg-opacity-20 border border-gray-700 mb-6`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {currentPackage.icon}
                      <span className="ml-2 font-semibold text-white">{currentPackage.name}</span>
                    </div>
                    <span className="text-white font-bold">
                      {currentPackage.reviewsSubmitted + 1}/{currentPackage.reviewsRequired}
                    </span>
                  </div>
                </div>
                
                {/* Product Preview */}
                <div className="mb-6 bg-gray-800/50 rounded-2xl p-4 border border-gray-700">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img 
                        src={newReview.productImage || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center'} 
                        alt="Product"
                        className="w-20 h-20 rounded-xl object-cover border-2 border-gray-600"
                      />
                    </div>
                    <div className="flex-1">
                      {newReview.productId ? (
                        <h4 className="text-white font-semibold mb-2">{newReview.productName}</h4>
                      ) : (
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">Product Name *</label>
                          <input 
                            type="text" 
                            value={newReview.customProductName}
                            onChange={(e) => setNewReview({...newReview, customProductName: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="Enter product name..."
                          />
                        </div>
                      )}
                      <button 
                        onClick={() => setShowProductSelection(true)}
                        className="text-sm text-blue-400 hover:text-blue-300 mt-3 flex items-center"
                      >
                        <FaArrowLeft className="w-4 h-4 mr-2" />
                        Change Product
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Review Form */}
                <div className="space-y-6">
                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">Your Rating</label>
                    <div className="flex justify-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button 
                          key={star}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setNewReview({...newReview, rating: star})}
                          className="focus:outline-none"
                        >
                          <FaStar 
                            className={`w-10 h-10 ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-600'} transition-colors duration-200`}
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Comment */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">Review Comment *</label>
                    <textarea 
                      value={newReview.comment}
                      onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                      placeholder="Share your honest experience with this product..."
                    />
                  </div>
                  
                  {/* Buttons */}
                  <div className="flex space-x-4 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowProductSelection(true)}
                      className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors font-semibold text-sm"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSubmitReview}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:opacity-90 transition-all font-semibold text-sm flex items-center justify-center"
                    >
                      <FaCheckCircle className="w-5 h-5 mr-2" />
                      Submit Review
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Submit Review Button for Desktop */}
      {currentPackage && !showReviewModal && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 hidden lg:block"
        >
          <button
            onClick={() => handleOpenReview(currentPackage)}
            className={`px-8 py-4 rounded-full shadow-2xl font-bold text-lg flex items-center space-x-3 ${
              currentPackage.reviewsSubmitted >= currentPackage.reviewsRequired
                ? 'bg-gradient-to-r from-green-600 to-emerald-500'
                : `bg-gradient-to-r ${currentPackage.gradient}`
            } text-white hover:shadow-3xl transition-all duration-300`}
          >
            {currentPackage.reviewsSubmitted >= currentPackage.reviewsRequired ? (
              <>
                <FaCheckCircle className="w-6 h-6" />
                <span>Daily Work Completed</span>
              </>
            ) : (
              <>
                <FaEdit className="w-6 h-6" />
                <span>
                  Write {currentPackage.name} Review ({currentPackage.reviewsSubmitted}/{currentPackage.reviewsRequired})
                </span>
              </>
            )}
          </button>
        </motion.div>
      )}

      {/* Footer */}
      <div className="text-center py-8">
        <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm px-8 py-4 rounded-full border border-gray-700">
          <FaChartLine className="w-5 h-5 text-blue-400 mr-3" />
          <span className="text-gray-300 text-sm">
            WealthBridge Premium • Complete {packages[0]?.reviewsRequired || 5} reviews daily per package
          </span>
        </div>
      </div>
    </div>
  );
}