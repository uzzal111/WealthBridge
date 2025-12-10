'use client';

import { useState, useEffect } from 'react';
import { 
  FiUsers, 
  FiDollarSign, 
  FiAward, 
  FiCalendar, 
  FiTrendingUp,
  FiUserCheck,
  FiStar,
  FiPackage,
  FiMessageCircle,
  FiCheckCircle,
  FiPercent
} from 'react-icons/fi';

interface TeamMember {
  id: string;
  name: string;
  level: 1 | 2 | 3;
  depositAmount: number;
  isActive: boolean;
  joinDate: string;
  commissionEarned: number;
  avatar: string;
}

interface CommissionEarning {
  level: number;
  percentage: number;
  fromMember: string;
  amount: number;
  date: string;
}

interface BonusReward {
  id: string;
  name: string;
  requiredMembers: number;
  bonusAmount: number;
  achieved: boolean;
  claimed: boolean;
}

interface MonthlySalary {
  id: string;
  tier: string;
  requiredActiveMembers: number;
  requiredTotalDeposit: number;
  salaryAmount: number;
  eligible: boolean;
}

interface SeminarSupport {
  id: string;
  requirement: string;
  description: string;
  status: string;
}

export default function TeamCommissionPage() {
  // Team data
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: '1', name: 'John Smith', level: 1, depositAmount: 100, isActive: true, joinDate: '2024-01-15', commissionEarned: 20, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center' },
    { id: '2', name: 'Sarah Johnson', level: 1, depositAmount: 100, isActive: true, joinDate: '2024-01-16', commissionEarned: 20, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=center' },
    { id: '3', name: 'Mike Wilson', level: 2, depositAmount: 100, isActive: true, joinDate: '2024-01-10', commissionEarned: 15, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=center' },
    { id: '4', name: 'Emma Davis', level: 2, depositAmount: 100, isActive: true, joinDate: '2024-01-12', commissionEarned: 15, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=center' },
    { id: '5', name: 'David Brown', level: 3, depositAmount: 100, isActive: true, joinDate: '2024-01-05', commissionEarned: 10, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=center' },
    { id: '6', name: 'Lisa Miller', level: 3, depositAmount: 100, isActive: true, joinDate: '2024-01-08', commissionEarned: 10, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=center' },
    { id: '7', name: 'Robert Taylor', level: 1, depositAmount: 100, isActive: true, joinDate: '2024-01-20', commissionEarned: 20, avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005-128?w=100&h=100&fit=crop&crop=center' },
    { id: '8', name: 'Jennifer Lee', level: 2, depositAmount: 100, isActive: false, joinDate: '2024-01-18', commissionEarned: 0, avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=center' },
  ]);

  // Commission earnings
  const [commissionEarnings, setCommissionEarnings] = useState<CommissionEarning[]>([
    { level: 1, percentage: 20, fromMember: 'John Smith', amount: 20, date: '2024-01-15' },
    { level: 1, percentage: 20, fromMember: 'Sarah Johnson', amount: 20, date: '2024-01-16' },
    { level: 2, percentage: 15, fromMember: 'Mike Wilson', amount: 15, date: '2024-01-10' },
    { level: 2, percentage: 15, fromMember: 'Emma Davis', amount: 15, date: '2024-01-12' },
    { level: 3, percentage: 10, fromMember: 'David Brown', amount: 10, date: '2024-01-05' },
    { level: 3, percentage: 10, fromMember: 'Lisa Miller', amount: 10, date: '2024-01-08' },
  ]);

  // Bonus and rewards
  const [bonusRewards, setBonusRewards] = useState<BonusReward[]>([
    { id: '1', name: '10 Active Members', requiredMembers: 10, bonusAmount: 30, achieved: false, claimed: false },
    { id: '2', name: '20 Active Members', requiredMembers: 20, bonusAmount: 60, achieved: false, claimed: false },
    { id: '3', name: '30 Active Members', requiredMembers: 30, bonusAmount: 100, achieved: false, claimed: false },
    { id: '4', name: '40 Active Members', requiredMembers: 40, bonusAmount: 150, achieved: false, claimed: false },
    { id: '5', name: '50 Active Members', requiredMembers: 50, bonusAmount: 200, achieved: false, claimed: false },
  ]);

  // Monthly salary tiers
  const [monthlySalaries, setMonthlySalaries] = useState<MonthlySalary[]>([
    { id: 'A', tier: 'A', requiredActiveMembers: 5, requiredTotalDeposit: 5000, salaryAmount: 100, eligible: false },
    { id: 'B', tier: 'B', requiredActiveMembers: 10, requiredTotalDeposit: 10000, salaryAmount: 200, eligible: false },
    { id: 'C', tier: 'C', requiredActiveMembers: 15, requiredTotalDeposit: 15000, salaryAmount: 300, eligible: false },
    { id: 'D', tier: 'D', requiredActiveMembers: 20, requiredTotalDeposit: 20000, salaryAmount: 400, eligible: false },
    { id: 'E', tier: 'E', requiredActiveMembers: 25, requiredTotalDeposit: 30000, salaryAmount: 500, eligible: false },
  ]);

  // Seminar support
  const [seminarSupport, setSeminarSupport] = useState<SeminarSupport[]>([
    { 
      id: '1', 
      requirement: 'Minimum 10 Active Members with $100 Deposit', 
      description: 'সেমিনার বা প্রোগ্রাম করার জন্য মিনিমাম ১০ টা ১০০ ডলার ডিপোজিট একটিভ মেম্বার থাকতে হবে',
      status: 'Check Eligibility'
    }
  ]);

  // Stats
  const [stats, setStats] = useState({
    totalTeamMembers: 0,
    activeMembers: 0,
    totalCommission: 0,
    totalDeposit: 0,
    availableBonus: 0,
    monthlySalary: 0,
  });

  // Calculate stats
  useEffect(() => {
    const activeMembers = teamMembers.filter(member => member.isActive).length;
    const totalCommission = commissionEarnings.reduce((sum, earning) => sum + earning.amount, 0);
    const totalDeposit = teamMembers.reduce((sum, member) => sum + member.depositAmount, 0);
    
    // Calculate achieved bonuses
    const updatedBonuses = bonusRewards.map(bonus => ({
      ...bonus,
      achieved: activeMembers >= bonus.requiredMembers
    }));
    setBonusRewards(updatedBonuses);
    
    const availableBonus = updatedBonuses
      .filter(bonus => bonus.achieved && !bonus.claimed)
      .reduce((sum, bonus) => sum + bonus.bonusAmount, 0);
    
    // Calculate eligible salaries
    const updatedSalaries = monthlySalaries.map(salary => ({
      ...salary,
      eligible: activeMembers >= salary.requiredActiveMembers && totalDeposit >= salary.requiredTotalDeposit
    }));
    setMonthlySalaries(updatedSalaries);
    
    const currentSalary = updatedSalaries
      .filter(salary => salary.eligible)
      .reduce((max, salary) => Math.max(max, salary.salaryAmount), 0);
    
    setStats({
      totalTeamMembers: teamMembers.length,
      activeMembers,
      totalCommission,
      totalDeposit,
      availableBonus,
      monthlySalary: currentSalary,
    });
  }, [teamMembers, commissionEarnings]);

  const handleClaimBonus = (bonusId: string) => {
    setBonusRewards(bonuses =>
      bonuses.map(bonus =>
        bonus.id === bonusId ? { ...bonus, claimed: true } : bonus
      )
    );
    alert('Bonus claimed successfully!');
  };

  const handleContactSupport = () => {
    alert('Contacting customer support... Please provide your documents for seminar support verification.');
  };

  const getLevelColor = (level: number) => {
    switch(level) {
      case 1: return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 2: return 'bg-gradient-to-r from-green-500 to-green-600';
      case 3: return 'bg-gradient-to-r from-purple-500 to-purple-600';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const getLevelName = (level: number) => {
    switch(level) {
      case 1: return '1st Level';
      case 2: return '2nd Level';
      case 3: return '3rd Level';
      default: return 'Unknown';
    }
  };

  const getLevelPercentage = (level: number) => {
    switch(level) {
      case 1: return '20%';
      case 2: return '15%';
      case 3: return '10%';
      default: return '0%';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">Team Commission & Bonus System</h1>
          <p className="text-blue-200 text-lg">Maximize your earnings through team building and active participation</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-800/50 to-blue-900/50 rounded-2xl p-6 border border-blue-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm">Total Team Members</p>
                <p className="text-3xl font-bold text-white">{stats.totalTeamMembers}</p>
              </div>
              <FiUsers className="w-10 h-10 text-blue-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-800/50 to-green-900/50 rounded-2xl p-6 border border-green-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm">Active Members</p>
                <p className="text-3xl font-bold text-white">{stats.activeMembers}</p>
              </div>
              <FiUserCheck className="w-10 h-10 text-green-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-800/50 to-purple-900/50 rounded-2xl p-6 border border-purple-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm">Total Commission</p>
                <p className="text-3xl font-bold text-white">${stats.totalCommission}</p>
              </div>
              <FiDollarSign className="w-10 h-10 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Team Commission Structure */}
          <div className="lg:col-span-2 space-y-8">
            {/* Commission Structure */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FiPercent className="mr-3 text-blue-400" />
                Team Commission Structure (3 Levels)
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Level 1 */}
                <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 rounded-xl p-6 border border-blue-700/50">
                  <div className={`w-16 h-16 rounded-full ${getLevelColor(1)} flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-white text-xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-white text-center mb-2">1st Level</h3>
                  <p className="text-blue-300 text-center text-2xl font-bold mb-4">20% Commission</p>
                  <div className="text-center">
                    <p className="text-blue-200 text-sm">For each active member with $100 deposit</p>
                    <p className="text-white font-semibold mt-2">Earn: $20 per member</p>
                  </div>
                </div>

                {/* Level 2 */}
                <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 rounded-xl p-6 border border-green-700/50">
                  <div className={`w-16 h-16 rounded-full ${getLevelColor(2)} flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-white text-xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-white text-center mb-2">2nd Level</h3>
                  <p className="text-green-300 text-center text-2xl font-bold mb-4">15% Commission</p>
                  <div className="text-center">
                    <p className="text-green-200 text-sm">For each active member with $100 deposit</p>
                    <p className="text-white font-semibold mt-2">Earn: $15 per member</p>
                  </div>
                </div>

                {/* Level 3 */}
                <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 rounded-xl p-6 border border-purple-700/50">
                  <div className={`w-16 h-16 rounded-full ${getLevelColor(3)} flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-white text-xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-white text-center mb-2">3rd Level</h3>
                  <p className="text-purple-300 text-center text-2xl font-bold mb-4">10% Commission</p>
                  <div className="text-center">
                    <p className="text-purple-200 text-sm">For each active member with $100 deposit</p>
                    <p className="text-white font-semibold mt-2">Earn: $10 per member</p>
                  </div>
                </div>
              </div>

              {/* Recent Commission Earnings */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Recent Commission Earnings</h3>
                <div className="space-y-3">
                  {commissionEarnings.map((earning, index) => (
                    <div key={index} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full ${getLevelColor(earning.level)} flex items-center justify-center mr-3`}>
                            <span className="text-white font-bold">{earning.level}</span>
                          </div>
                          <div>
                            <p className="text-white font-semibold">{getLevelName(earning.level)} ({earning.percentage}%)</p>
                            <p className="text-blue-300 text-sm">From: {earning.fromMember}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-bold text-lg">+${earning.amount}</p>
                          <p className="text-slate-400 text-sm">{earning.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Team Members */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FiUsers className="mr-3 text-blue-400" />
                Your Team Members
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-blue-300">Member</th>
                      <th className="text-left py-3 px-4 text-blue-300">Level</th>
                      <th className="text-left py-3 px-4 text-blue-300">Deposit</th>
                      <th className="text-left py-3 px-4 text-blue-300">Status</th>
                      <th className="text-left py-3 px-4 text-blue-300">Commission</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <img 
                              src={member.avatar} 
                              alt={member.name}
                              className="w-10 h-10 rounded-full mr-3 border-2 border-slate-600"
                            />
                            <div>
                              <p className="text-white font-semibold">{member.name}</p>
                              <p className="text-slate-400 text-sm">Joined: {member.joinDate}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getLevelColor(member.level)} text-white`}>
                            {getLevelName(member.level)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-white">${member.depositAmount}</p>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${member.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {member.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-green-400 font-semibold">${member.commissionEarned}</p>
                          <p className="text-slate-400 text-xs">{getLevelPercentage(member.level)} Commission</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Bonuses & Salaries */}
          <div className="space-y-8">
            {/* Active Member Bonus */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FiAward className="mr-3 text-yellow-400" />
                Active Member Bonus
              </h2>
              
              <div className="space-y-4">
                {bonusRewards.map((bonus) => (
                  <div 
                    key={bonus.id} 
                    className={`rounded-xl p-4 border ${bonus.achieved ? 'border-green-500/50 bg-green-500/10' : 'border-slate-700 bg-slate-800/50'}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-semibold">{bonus.name}</p>
                        <p className="text-slate-400 text-sm">Requires: {bonus.requiredMembers} active members</p>
                      </div>
                      <div className="text-right">
                        <p className="text-yellow-400 font-bold text-lg">${bonus.bonusAmount}</p>
                        {bonus.achieved ? (
                          <button
                            onClick={() => handleClaimBonus(bonus.id)}
                            disabled={bonus.claimed}
                            className={`mt-2 px-4 py-1 rounded-full text-sm font-semibold ${bonus.claimed ? 'bg-green-500/50 text-green-300' : 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:opacity-90'}`}
                          >
                            {bonus.claimed ? 'Claimed' : 'Claim Bonus'}
                          </button>
                        ) : (
                          <p className="text-red-400 text-sm mt-2">Not achieved</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${bonus.achieved ? 'bg-green-500' : 'bg-blue-500'}`}
                          style={{ width: `${Math.min((stats.activeMembers / bonus.requiredMembers) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-slate-400 text-xs mt-1 text-center">
                        {stats.activeMembers}/{bonus.requiredMembers} Active Members
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-900/30 to-yellow-800/30 rounded-xl border border-yellow-700/50">
                <p className="text-yellow-300 text-sm text-center">
                  Total Available Bonus: <span className="font-bold text-white">${stats.availableBonus}</span>
                </p>
              </div>
            </div>

            {/* Monthly Salary */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FiCalendar className="mr-3 text-green-400" />
                Monthly Salary Tiers
              </h2>
              
              <div className="space-y-4">
                {monthlySalaries.map((salary) => (
                  <div 
                    key={salary.id} 
                    className={`rounded-xl p-4 border ${salary.eligible ? 'border-green-500/50 bg-green-500/10' : 'border-slate-700 bg-slate-800/50'}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${salary.eligible ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                            {salary.tier}
                          </span>
                          <div>
                            <p className="text-white font-semibold">Tier {salary.tier}</p>
                            <p className="text-slate-400 text-sm">${salary.salaryAmount}/month</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {salary.eligible ? (
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                            ✅ Eligible
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-semibold">
                            Requirements
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <p className="text-slate-400 text-xs">Active Members</p>
                        <p className={`text-sm font-semibold ${stats.activeMembers >= salary.requiredActiveMembers ? 'text-green-400' : 'text-white'}`}>
                          {stats.activeMembers}/{salary.requiredActiveMembers}
                        </p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <p className="text-slate-400 text-xs">Total Deposit</p>
                        <p className={`text-sm font-semibold ${stats.totalDeposit >= salary.requiredTotalDeposit ? 'text-green-400' : 'text-white'}`}>
                          ${stats.totalDeposit.toLocaleString()}/${salary.requiredTotalDeposit.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-green-800/30 rounded-xl border border-green-700/50">
                <p className="text-green-300 text-center">
                  Your Current Monthly Salary: <span className="font-bold text-white text-xl">${stats.monthlySalary}</span>
                </p>
              </div>
            </div>

            {/* Seminar Support */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FiMessageCircle className="mr-3 text-blue-400" />
                Seminar/Program Support
              </h2>
              
              <div className="space-y-6">
                {seminarSupport.map((support) => (
                  <div key={support.id} className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 rounded-xl p-6 border border-blue-700/50">
                    <div className="flex items-start mb-4">
                      <FiCheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-white font-semibold mb-2">Requirements:</h3>
                        <p className="text-blue-300">{support.requirement}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-white font-semibold mb-2">Description:</h4>
                      <p className="text-slate-300 text-sm">{support.description}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-2">Your Current Status:</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 rounded-lg p-3">
                          <p className="text-slate-400 text-xs">Active Members</p>
                          <p className={`text-lg font-bold ${stats.activeMembers >= 10 ? 'text-green-400' : 'text-white'}`}>
                            {stats.activeMembers}/10
                          </p>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-3">
                          <p className="text-slate-400 text-xs">$100 Deposit Members</p>
                          <p className={`text-lg font-bold ${teamMembers.filter(m => m.depositAmount >= 100).length >= 10 ? 'text-green-400' : 'text-white'}`}>
                            {teamMembers.filter(m => m.depositAmount >= 100).length}/10
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleContactSupport}
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center"
                    >
                      <FiMessageCircle className="mr-2" />
                      Contact Customer Support
                    </button>
                    
                    <p className="text-slate-400 text-xs mt-3 text-center">
                      কোম্পানি কাস্টমার সাপোর্টে ডকুমেন্টসহ কথা বলতে হবে
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="mt-12 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Total Earning Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700">
              <p className="text-blue-300 text-sm">Commission Earnings</p>
              <p className="text-3xl font-bold text-green-400">${stats.totalCommission}</p>
              <p className="text-slate-400 text-sm mt-2">From team members</p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700">
              <p className="text-yellow-300 text-sm">Available Bonus</p>
              <p className="text-3xl font-bold text-yellow-400">${stats.availableBonus}</p>
              <p className="text-slate-400 text-sm mt-2">From active members</p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700">
              <p className="text-green-300 text-sm">Monthly Salary</p>
              <p className="text-3xl font-bold text-green-400">${stats.monthlySalary}</p>
              <p className="text-slate-400 text-sm mt-2">Current eligible tier</p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700">
              <p className="text-purple-300 text-sm">Potential Monthly</p>
              <p className="text-3xl font-bold text-purple-400">${stats.totalCommission + stats.availableBonus + stats.monthlySalary}</p>
              <p className="text-slate-400 text-sm mt-2">Total potential earnings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}