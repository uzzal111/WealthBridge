"use client";

import React, { useState } from "react";
import { 
  FiDownload, 
  FiUpload, 
  FiSearch, 
  FiCheckCircle, 
  FiXCircle, 
  FiClock,
  FiGrid 
} from "react-icons/fi";
import { FaCoins, FaPercentage } from "react-icons/fa";

type TransactionType = 'deposit' | 'withdraw' | 'commission' | 'bonus' | 'reward' | 'profit';
type StatusType = 'completed' | 'pending' | 'failed';
type FilterType = 'all' | TransactionType;

interface Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  status: StatusType;
  date: string;
  description: string;
}

export default function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

  const transactions: Transaction[] = [
    { id: 1, type: 'deposit', amount: 5000, status: 'completed', date: '2024-02-20', description: 'USDT Deposit' },
    { id: 2, type: 'withdraw', amount: 1500, status: 'completed', date: '2024-02-19', description: 'Withdrawal to Bank' },
    { id: 3, type: 'commission', amount: 250, status: 'completed', date: '2024-02-22', description: 'Daily Commission' },
    { id: 4, type: 'bonus', amount: 500, status: 'completed', date: '2024-02-19', description: 'Generation Bonus' },
    { id: 5, type: 'bonus', amount: 300, status: 'completed', date: '2024-02-20', description: 'Deposit Bonus' },
    { id: 6, type: 'profit', amount: 450, status: 'completed', date: '2024-02-22', description: 'Investment Profit' },
    { id: 7, type: 'reward', amount: 100, status: 'completed', date: '2024-02-22', description: 'Login Reward' },
    { id: 8, type: 'deposit', amount: 3000, status: 'pending', date: '2024-02-22', description: 'Processing' },
    { id: 9, type: 'withdraw', amount: 2000, status: 'failed', date: '2024-02-17', description: 'Failed' },
  ];

  const typeConfig: Record<TransactionType, { label: string; icon: React.ReactNode; color: string; bgColor: string }> = {
    deposit: { label: 'Deposit', icon: <FiDownload className="w-5 h-5" />, color: 'text-emerald-400', bgColor: 'bg-emerald-900/40' },
    withdraw: { label: 'Withdraw', icon: <FiUpload className="w-5 h-5" />, color: 'text-amber-400', bgColor: 'bg-amber-900/40' },
    commission: { label: 'Commission', icon: <FaCoins className="w-5 h-5" />, color: 'text-blue-400', bgColor: 'bg-blue-900/40' },
    bonus: { label: 'Bonus', icon: <FaPercentage className="w-5 h-5" />, color: 'text-purple-400', bgColor: 'bg-purple-900/40' },
    profit: { label: 'Profit', icon: <FiDownload className="w-5 h-5" />, color: 'text-green-400', bgColor: 'bg-green-900/40' },
    reward: { label: 'Reward', icon: <FaCoins className="w-5 h-5" />, color: 'text-orange-400', bgColor: 'bg-orange-900/40' },
  };

  const statusConfig: Record<StatusType, { label: string; color: string; icon: React.ReactNode }> = {
    completed: { label: 'Completed', color: 'text-green-400', icon: <FiCheckCircle className="w-4 h-4" /> },
    pending: { label: 'Pending', color: 'text-yellow-400', icon: <FiClock className="w-4 h-4" /> },
    failed: { label: 'Failed', color: 'text-red-400', icon: <FiXCircle className="w-4 h-4" /> },
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || transaction.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getTypeInfo = (type: TransactionType) => typeConfig[type];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search */}
          <div className="relative max-w-2xl mx-auto lg:mx-0">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-slate-800/60 rounded-2xl border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Filter Chips - Horizontal scroll on mobile */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {/* All Button */}
            <button
              onClick={() => setSelectedFilter('all')}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                selectedFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <FiGrid className="w-5 h-5" />
              All
            </button>

            {/* Other Filters */}
            {Object.entries(typeConfig).map(([type, config]) => (
              <button
                key={type}
                onClick={() => setSelectedFilter(type as TransactionType)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                  selectedFilter === type
                    ? `${config.bgColor} ${config.color} border border-current/40 shadow-lg shadow-current/20`
                    : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {config.icon}
                {config.label}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-800/50 flex items-center justify-center">
                <FiSearch className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">No transactions found</h3>
              <p className="text-slate-400">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredTransactions.map((transaction) => {
              const typeInfo = getTypeInfo(transaction.type);
              const statusInfo = statusConfig[transaction.status];

              return (
                <div
                  key={transaction.id}
                  className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl p-5 border border-slate-700/60 hover:border-slate-600 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                    <div className="flex items-start sm:items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl ${typeInfo.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <div className={typeInfo.color}>{typeInfo.icon}</div>
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-bold text-white text-lg">{typeInfo.label}</span>
                          <span className={`text-xs px-3 py-1.5 rounded-full ${statusInfo.color} bg-current/10`}>
                            {statusInfo.label}
                          </span>
                        </div>
                        <p className="text-slate-300 mt-1">{transaction.description}</p>
                        <p className="text-slate-500 text-sm mt-2">{transaction.date}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        transaction.type === 'withdraw' ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {transaction.type === 'withdraw' ? '-' : '+'}${transaction.amount.toLocaleString()}
                      </div>
                      <div className={`text-sm mt-2 flex items-center justify-end gap-1.5 ${statusInfo.color}`}>
                        {statusInfo.icon}
                        {statusInfo.label}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}