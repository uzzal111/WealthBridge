'use client';

import { useState, useEffect } from 'react';

// Define TypeScript interfaces
interface BonusTier {
  id: string;
  name: string;
  targetMembers: number;
  bonusAmount: number;
  unlocked: boolean;
  claimed: boolean;
  currentProgress: number;
  claimDate: Date | null;
}

interface User {
  id: string;
  name: string;
  mainBalance: number;
  activeMembers: number;
  totalBonusEarned: number;
}

export default function ActiveMemberBonusSystem() {
  // User state
  const [user, setUser] = useState<User>({
    id: 'user1',
    name: 'Alex Johnson',
    mainBalance: 1250.75,
    activeMembers: 32,
    totalBonusEarned: 90
  });

  // Bonus tiers state
  const [bonusTiers, setBonusTiers] = useState<BonusTier[]>([
    { id: 'A', name: 'Tier A', targetMembers: 10, bonusAmount: 30, unlocked: false, claimed: false, currentProgress: 0, claimDate: null },
    { id: 'B', name: 'Tier B', targetMembers: 20, bonusAmount: 60, unlocked: false, claimed: false, currentProgress: 0, claimDate: null },
    { id: 'C', name: 'Tier C', targetMembers: 30, bonusAmount: 100, unlocked: false, claimed: false, currentProgress: 0, claimDate: null },
    { id: 'D', name: 'Tier D', targetMembers: 40, bonusAmount: 150, unlocked: false, claimed: false, currentProgress: 0, claimDate: null },
    { id: 'E', name: 'Tier E', targetMembers: 50, bonusAmount: 200, unlocked: false, claimed: false, currentProgress: 0, claimDate: null },
  ]);

  // Notification state
  const [notifications, setNotifications] = useState<string[]>([]);

  // Update tiers based on user's active members
  useEffect(() => {
    const updatedTiers = bonusTiers.map(tier => {
      const currentProgress = Math.min(user.activeMembers, tier.targetMembers);
      const unlocked = user.activeMembers >= tier.targetMembers;
      
      // Check if newly unlocked to show notification
      if (unlocked && !tier.unlocked && !tier.claimed) {
        addNotification(`🎉 Congratulations! You've unlocked ${tier.name} bonus! Claim $${tier.bonusAmount} now!`);
      }
      
      return {
        ...tier,
        currentProgress,
        unlocked,
        progressPercentage: (currentProgress / tier.targetMembers) * 100
      };
    });
    
    setBonusTiers(updatedTiers);
  }, [user.activeMembers]);

  // Add notification
  const addNotification = (message: string) => {
    setNotifications(prev => [message, ...prev]);
    
    // Auto remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(msg => msg !== message));
    }, 5000);
  };

  // Handle claiming bonus
  const handleClaimBonus = (tier: BonusTier) => {
    if (!tier.unlocked || tier.claimed) return;

    // Update the tier as claimed
    const updatedTiers = bonusTiers.map(t => 
      t.id === tier.id 
        ? { ...t, claimed: true, claimDate: new Date() }
        : t
    );

    // Update user balance
    setUser(prev => ({
      ...prev,
      mainBalance: prev.mainBalance + tier.bonusAmount,
      totalBonusEarned: prev.totalBonusEarned + tier.bonusAmount
    }));

    // Update tiers state
    setBonusTiers(updatedTiers);

    // Show success notification
    addNotification(`💰 $${tier.bonusAmount} bonus claimed! Added to your main balance.`);
  };

  // Add mock members (for testing)
  const addMockMembers = () => {
    setUser(prev => ({
      ...prev,
      activeMembers: prev.activeMembers + 5
    }));
    addNotification(`👥 5 new active members added!`);
  };

  // Calculate total available bonus
  const totalAvailableBonus = bonusTiers
    .filter(tier => tier.unlocked && !tier.claimed)
    .reduce((sum, tier) => sum + tier.bonusAmount, 0);

  // Find next target tier
  const nextTargetTier = bonusTiers.find(tier => !tier.claimed) || bonusTiers[bonusTiers.length - 1];
  const membersNeededForNextTier = Math.max(0, nextTargetTier.targetMembers - user.activeMembers);

  // Tier Card Component
  const TierCard = ({ tier }: { tier: BonusTier }) => {
    const progressPercentage = Math.min((tier.currentProgress / tier.targetMembers) * 100, 100);
    
    return (
      <div className={`relative rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
        tier.claimed 
          ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-green-500/30' 
          : tier.unlocked 
          ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-blue-500/50' 
          : 'bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700'
      }`}>
        
        {/* Claimed Ribbon */}
        {tier.claimed && (
          <div className="absolute top-0 right-0 z-10">
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white text-xs font-bold px-4 py-1.5 transform rotate-45 translate-x-10 -translate-y-2 shadow-lg">
              CLAIMED
            </div>
          </div>
        )}

        {/* Tier Header */}
        <div className={`p-5 text-white ${
          tier.id === 'A' ? 'bg-gradient-to-r from-emerald-700 to-emerald-800' :
          tier.id === 'B' ? 'bg-gradient-to-r from-blue-700 to-blue-800' :
          tier.id === 'C' ? 'bg-gradient-to-r from-purple-700 to-purple-800' :
          tier.id === 'D' ? 'bg-gradient-to-r from-amber-700 to-amber-800' :
          'bg-gradient-to-r from-rose-700 to-rose-800'
        }`}>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">{tier.name}</h3>
              <p className="text-sm opacity-90">Active Member Bonus</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">${tier.bonusAmount}</div>
              <div className="text-xs opacity-90">Reward</div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="p-5">
          <div className="mb-5">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Target: {tier.targetMembers} Members</span>
              <span className={`font-semibold ${
                tier.unlocked ? 'text-green-400' : 'text-blue-400'
              }`}>
                {tier.currentProgress}/{tier.targetMembers}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full transition-all duration-700 ${
                  tier.unlocked 
                    ? tier.claimed ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-green-500 to-emerald-500'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600'
                }`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Status Info */}
          <div className="mb-5">
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
              tier.claimed 
                ? 'bg-green-900/50 text-green-400 border border-green-700/50' 
                : tier.unlocked 
                ? 'bg-blue-900/50 text-blue-400 border border-blue-700/50' 
                : 'bg-gray-800 text-gray-400 border border-gray-700'
            }`}>
              {tier.claimed ? (
                <>
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2.5 animate-pulse"></span>
                  Claimed {tier.claimDate && tier.claimDate.toLocaleDateString()}
                </>
              ) : tier.unlocked ? (
                <>
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2.5 animate-pulse"></span>
                  Ready to Claim!
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-2.5"></span>
                  Need {tier.targetMembers - tier.currentProgress} more members
                </>
              )}
            </div>
          </div>

          {/* Claim Button (Appears when target is reached) */}
          {tier.unlocked && !tier.claimed && (
            <button
              onClick={() => handleClaimBonus(tier)}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              Claim ${tier.bonusAmount} Bonus
            </button>
          )}

          {/* Locked Message */}
          {!tier.unlocked && (
            <div className="text-center py-3 text-gray-500 text-sm bg-gray-800/50 rounded-lg border border-gray-700">
              Complete {tier.targetMembers - tier.currentProgress} more active members
            </div>
          )}

          {/* Claimed Message */}
          {tier.claimed && (
            <div className="text-center py-3 text-green-500 text-sm font-medium bg-green-900/20 rounded-lg border border-green-800/50">
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Bonus added to main balance
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 md:p-8 mb-8 border border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl font-bold text-white mb-2">
                Active Member Bonus System 👥
              </h1>
              <p className="text-gray-300">
                Welcome back, <span className="font-semibold text-blue-400">{user.name}</span>
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Invite members, reach targets, and claim your rewards!
              </p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
                <div className="text-2xl font-bold text-blue-400">{user.activeMembers}</div>
                <div className="text-gray-300 text-sm font-medium">Active Members</div>
              </div>
              <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 hover:border-green-500 transition-colors">
                <div className="text-2xl font-bold text-green-400">${user.mainBalance.toFixed(2)}</div>
                <div className="text-gray-300 text-sm font-medium">Main Balance</div>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="mb-6 space-y-2">
            {notifications.map((notification, index) => (
              <div 
                key={index}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-xl shadow-lg animate-fade-in border border-blue-500/30"
              >
                <div className="flex items-center">
                  <div className="mr-3 text-xl">🎉</div>
                  <div className="font-medium">{notification}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Next Goal Card */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl shadow-2xl p-6 mb-8 border border-blue-500/20 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-white mb-2">🎯 Your Next Goal</h3>
              <p className="text-gray-300">
                {membersNeededForNextTier > 0 ? (
                  <>
                    You need <span className="font-bold text-yellow-400">{membersNeededForNextTier}</span> more active members 
                    to unlock <span className="font-bold text-white">{nextTargetTier.name}</span> tier 
                    and earn <span className="font-bold text-green-400">${nextTargetTier.bonusAmount}</span> bonus!
                  </>
                ) : (
                  <>
                    <span className="font-bold text-green-400">Congratulations!</span> You've reached all targets!
                  </>
                )}
              </p>
            </div>
            
            {totalAvailableBonus > 0 && (
              <div className="bg-gradient-to-r from-green-600/30 to-emerald-600/30 backdrop-blur-sm px-6 py-4 rounded-xl border border-green-500/30">
                <div className="text-center">
                  <div className="text-sm text-green-300">Available to Claim</div>
                  <div className="text-2xl font-bold text-white">${totalAvailableBonus}</div>
                  <div className="text-xs text-green-400 mt-1">Click on tier cards to claim</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bonus Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {bonusTiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>

        {/* How It Works Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 md:p-8 mb-8 border border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="mr-3 text-blue-400">📚</span>
            How It Works
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
              <div className="text-3xl mb-4 text-blue-400">👥</div>
              <h4 className="text-lg font-semibold text-white mb-2">1. Build Your Team</h4>
              <p className="text-gray-400 text-sm">
                Invite members to join your team. Each active member with minimum investment counts toward your target.
              </p>
            </div>
            
            <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300">
              <div className="text-3xl mb-4 text-green-400">🎯</div>
              <h4 className="text-lg font-semibold text-white mb-2">2. Reach Targets</h4>
              <p className="text-gray-400 text-sm">
                Achieve specific member count targets (10, 20, 30, 40, 50) to unlock bonus tiers.
              </p>
            </div>
            
            <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
              <div className="text-3xl mb-4 text-purple-400">💰</div>
              <h4 className="text-lg font-semibold text-white mb-2">3. Claim Rewards</h4>
              <p className="text-gray-400 text-sm">
                Click "Claim Bonus" when target is reached. Bonus instantly adds to your main balance.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Stats */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 p-4 rounded-xl shadow border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="text-2xl font-bold text-blue-400">
                {bonusTiers.filter(t => t.claimed).length}
              </div>
              <div className="text-gray-400 text-sm">Tiers Claimed</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl shadow border border-gray-700 hover:border-green-500 transition-colors">
              <div className="text-2xl font-bold text-green-400">
                {bonusTiers.filter(t => t.unlocked && !t.claimed).length}
              </div>
              <div className="text-gray-400 text-sm">Ready to Claim</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl shadow border border-gray-700 hover:border-purple-500 transition-colors">
              <div className="text-2xl font-bold text-purple-400">
                {bonusTiers.filter(t => !t.unlocked).length}
              </div>
              <div className="text-gray-400 text-sm">Locked Tiers</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl shadow border border-gray-700 hover:border-yellow-500 transition-colors">
              <div className="text-2xl font-bold text-yellow-400">
                ${bonusTiers.reduce((sum, t) => sum + t.bonusAmount, 0)}
              </div>
              <div className="text-gray-400 text-sm">Total Bonus Pool</div>
            </div>
          </div>

          {/* Quick Action */}
        
        </div>

        {/* Transaction History */}
        

        {/* Footer */}
        <div className="text-center mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm">
            Active Member Bonus System • Invite members, earn rewards, grow together!
          </p>
          <p className="text-gray-500 text-xs mt-2">
            All bonuses are instantly credited to your main balance upon claim
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}