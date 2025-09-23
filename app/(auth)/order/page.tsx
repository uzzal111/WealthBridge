'use client';

import { useState, useEffect } from 'react';

// Define TypeScript interfaces
interface Review {
  id: string;
  productName: string;
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
}

interface User {
  id: string;
  name: string;
  investmentAmount: number;
  isActive: boolean;
}

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
    { id: 1, name: 'Starter', minInvestment: 30, maxInvestment: 100, reviewsRequired: 5, unlocked: true, activeUsersRequired: 0, reviewsSubmitted: 0, lastReviewTime: null, cooldownUntil: null },
    { id: 2, name: 'Bronze', minInvestment: 101, maxInvestment: 500, reviewsRequired: 5, unlocked: false, activeUsersRequired: 10, reviewsSubmitted: 0, lastReviewTime: null, cooldownUntil: null },
    { id: 3, name: 'Silver', minInvestment: 501, maxInvestment: 1000, reviewsRequired: 5, unlocked: false, activeUsersRequired: 25, reviewsSubmitted: 0, lastReviewTime: null, cooldownUntil: null },
    { id: 4, name: 'Gold', minInvestment: 1001, maxInvestment: 2000, reviewsRequired: 5, unlocked: false, activeUsersRequired: 50, reviewsSubmitted: 0, lastReviewTime: null, cooldownUntil: null },
    { id: 5, name: 'Platinum', minInvestment: 2001, maxInvestment: 5000, reviewsRequired: 5, unlocked: false, activeUsersRequired: 100, reviewsSubmitted: 0, lastReviewTime: null, cooldownUntil: null },
    { id: 6, name: 'Diamond', minInvestment: 5001, maxInvestment: 10000, reviewsRequired: 5, unlocked: false, activeUsersRequired: 200, reviewsSubmitted: 0, lastReviewTime: null, cooldownUntil: null },
    { id: 7, name: 'Executive', minInvestment: 10001, maxInvestment: 25000, reviewsRequired: 5, unlocked: false, activeUsersRequired: 500, reviewsSubmitted: 0, lastReviewTime: null, cooldownUntil: null },
    { id: 8, name: 'Premium', minInvestment: 25001, maxInvestment: 50000, reviewsRequired: 5, unlocked: false, activeUsersRequired: 1000, reviewsSubmitted: 0, lastReviewTime: null, cooldownUntil: null },
    { id: 9, name: 'Elite', minInvestment: 50001, maxInvestment: 100000, reviewsRequired: 5, unlocked: false, activeUsersRequired: 2500, reviewsSubmitted: 0, lastReviewTime: null, cooldownUntil: null },
    { id: 10, name: 'VIP', minInvestment: 100001, maxInvestment: 500000, reviewsRequired: 5, unlocked: false, activeUsersRequired: 5000, reviewsSubmitted: 0, lastReviewTime: null, cooldownUntil: null }
  ]);

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [currentPackage, setCurrentPackage] = useState<Package | null>(null);
  const [newReview, setNewReview] = useState<{ productName: string; rating: number; comment: string }>({
    productName: '',
    rating: 5,
    comment: ''
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
  };

  // Handle submitting a review
  const handleSubmitReview = () => {
    if (!newReview.productName.trim() || !newReview.comment.trim()) {
      alert('Please fill in all fields');
      return;
    }

    if (!currentPackage) return;

    const review: Review = {
      id: Math.random().toString(36).substring(7),
      productName: newReview.productName,
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
    setNewReview({ productName: '', rating: 5, comment: '' });
    setShowReviewModal(false);
    
    // Check if this was the final review
    if (currentPackage.reviewsSubmitted + 1 >= currentPackage.reviewsRequired) {
      alert(`Congratulations! You've completed today's ${currentPackage.reviewsRequired} reviews for the ${currentPackage.name} package. Come back tomorrow for more opportunities!`);
    } else {
      alert('Review submitted successfully!');
    }
  };

  // Progress bar component
  const ProgressBar = ({ current, total, label }: { current: number; total: number; label: string }) => (
    <div className="mb-3">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>{label}</span>
        <span>{current}/{total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${Math.min((current / total) * 100, 100)}%` }}
        ></div>
      </div>
    </div>
  );

  // Package card component
  const PackageCard = ({ pkg }: { pkg: Package }) => {
    const isCompleted = pkg.reviewsSubmitted >= pkg.reviewsRequired;
    
    return (
      <div 
        className={`relative rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform ${
          pkg.unlocked 
            ? 'bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-blue-200' 
            : 'bg-gradient-to-br from-gray-100 to-gray-200 opacity-80'
        } ${isCompleted ? 'ring-2 ring-green-400' : ''}`}
        onClick={() => handleOpenReview(pkg)}
      >
        {/* Premium Badge */}
        {pkg.id >= 8 && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              PREMIUM
            </span>
          </div>
        )}
        
        {/* Completed Overlay */}
        {isCompleted && (
          <div className="absolute inset-0 bg-green-400 bg-opacity-10 z-20 flex items-center justify-center">
            <div className="bg-green-500 text-white px-4 py-2 rounded-lg text-center">
              <div className="text-sm font-semibold">✅ Today's Work Completed</div>
              <div className="text-xs">Come back tomorrow</div>
            </div>
          </div>
        )}
        
        {/* Package Header */}
        <div className={`relative p-6 text-white ${getPackageGradient(pkg.id)}`}>
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-white"></div>
          <h3 className="text-2xl font-bold relative z-10">{pkg.name}</h3>
          <p className="text-blue-100 text-sm mt-1 relative z-10">
            ${pkg.minInvestment.toLocaleString()} - ${pkg.maxInvestment.toLocaleString()}
          </p>
          
          {/* Status Indicator */}
          <div className="absolute bottom-4 right-4">
            {!pkg.unlocked ? (
              <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">🔒 Locked</div>
            ) : isCompleted ? (
              <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">✅ Completed</div>
            ) : (
              <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">📝 Available</div>
            )}
          </div>
        </div>
        
        {/* Package Content */}
        <div className="p-6">
          <ProgressBar 
            current={pkg.reviewsSubmitted} 
            total={pkg.reviewsRequired} 
            label="Review Progress" 
          />
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
                Active Users
              </span>
              <span className={`font-semibold ${activeUsers >= pkg.activeUsersRequired ? 'text-green-600' : 'text-red-600'}`}>
                {pkg.activeUsersRequired}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                Min Investment
              </span>
              <span className={`font-semibold ${currentUser.investmentAmount >= pkg.minInvestment ? 'text-green-600' : 'text-red-600'}`}>
                ${pkg.minInvestment.toLocaleString()}
              </span>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="mt-6">
            {pkg.unlocked ? (
              <button 
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-lg cursor-default' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                }`}
                disabled={isCompleted}
              >
                {isCompleted ? (
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Today's Work Completed
                  </span>
                ) : (
                  <span>Write Review ({pkg.reviewsSubmitted}/{pkg.reviewsRequired})</span>
                )}
              </button>
            ) : (
              <div className="text-center py-3 text-gray-500 text-sm bg-gray-100 rounded-xl">
                {currentUser.investmentAmount < pkg.minInvestment ? (
                  <span>Invest ${pkg.minInvestment.toLocaleString()}+ to unlock</span>
                ) : (
                  <span>Need {pkg.activeUsersRequired - activeUsers} more active users</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Helper function for package gradients
  const getPackageGradient = (id: number) => {
    const gradients = [
      'bg-gradient-to-r from-blue-400 to-blue-600',
      'bg-gradient-to-r from-green-400 to-green-600',
      'bg-gradient-to-r from-gray-400 to-gray-600',
      'bg-gradient-to-r from-yellow-400 to-yellow-600',
      'bg-gradient-to-r from-purple-400 to-purple-600',
      'bg-gradient-to-r from-pink-400 to-pink-600',
      'bg-gradient-to-r from-red-400 to-red-600',
      'bg-gradient-to-r from-indigo-400 to-indigo-600',
      'bg-gradient-to-r from-teal-400 to-teal-600',
      'bg-gradient-to-r from-orange-400 to-orange-600'
    ];
    return gradients[id - 1] || gradients[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* User Info Card */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl shadow-2xl p-8 mb-12 border border-slate-600">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome back, {currentUser.name}! 👋</h2>
              <p className="text-blue-200 text-lg">
                Your Investment Portfolio: <span className="font-bold text-green-400">${currentUser.investmentAmount.toLocaleString()}</span>
              </p>
              <p className="text-blue-300 text-sm mt-2">
                Complete 5 reviews per package daily to maximize your benefits
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 lg:mt-0">
              <div className="bg-slate-900 px-6 py-3 rounded-xl border border-slate-600 text-center">
                <div className="text-2xl font-bold text-green-400">{activeUsers}</div>
                <div className="text-blue-300 text-sm">Active Users</div>
              </div>
              <div className="bg-slate-900 px-6 py-3 rounded-xl border border-slate-600 text-center">
                <div className="text-2xl font-bold text-purple-400">{reviews.length}</div>
                <div className="text-blue-300 text-sm">Total Reviews</div>
              </div>
              <div className="bg-slate-900 px-6 py-3 rounded-xl border border-slate-600 text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {packages.filter(pkg => pkg.reviewsSubmitted >= pkg.reviewsRequired).length}
                </div>
                <div className="text-blue-300 text-sm">Completed Today</div>
              </div>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-16">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
 {/* Premium Review Modal */}
{showReviewModal && currentPackage && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl max-w-md w-full border border-slate-600 animate-modal-in">
      <div className="p-6">
        {/* Compact Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Share Experience ✨</h3>
          <button 
            onClick={() => setShowReviewModal(false)}
            className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-700 rounded-full"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Compact Package Info */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-3 rounded-lg mb-4 border border-blue-700">
          <p className="text-blue-200 text-xs text-center">
            <span className="font-semibold text-white">{currentPackage.name}</span> • 
            Progress: <span className="font-semibold text-white">{currentPackage.reviewsSubmitted + 1}/{currentPackage.reviewsRequired}</span>
          </p>
        </div>
        
        {/* Compact Review Form */}
        <div className="space-y-4">
          {/* Product Name Input */}
          <div>
            <label className="block text-xs font-semibold text-blue-300 mb-1">Product Name *</label>
            <input 
              type="text" 
              value={newReview.productName}
              onChange={(e) => setNewReview({...newReview, productName: e.target.value})}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              placeholder="Enter product name..."
            />
          </div>
          
          {/* Rating Stars */}
          <div>
            <label className="block text-xs font-semibold text-blue-300 mb-1">Your Rating *</label>
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star}
                  type="button"
                  onClick={() => setNewReview({...newReview, rating: star})}
                  className="focus:outline-none transform hover:scale-110 transition-transform duration-200"
                >
                  <svg 
                    className={`w-8 h-8 ${star <= newReview.rating ? 'text-yellow-400 drop-shadow-lg' : 'text-slate-600'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          
          {/* Comment Textarea */}
          <div>
            <label className="block text-xs font-semibold text-blue-300 mb-1">Review Comment *</label>
            <textarea 
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              placeholder="Share your experience..."
            />
          </div>
          
          {/* ✅ COMPACT SUBMIT BUTTON */}
          <div className="flex justify-end space-x-2 pt-2">
            <button 
              onClick={() => setShowReviewModal(false)}
              className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors font-semibold text-sm"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmitReview}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold text-sm flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

      {/* Premium Footer */}
      <div className="text-center mt-16">
        <div className="inline-flex items-center bg-slate-800 px-6 py-3 rounded-full border border-slate-600">
          <span className="text-blue-300 text-sm">WealthBridge Premium Review System • Complete 5 reviews daily per package</span>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @keyframes modal-in {
          from { 
            opacity: 0; 
            transform: scale(0.9) translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        
        .animate-modal-in {
          animation: modal-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}