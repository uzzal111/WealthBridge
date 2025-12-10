'use client';

import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

const TRC20_ADDRESS = "TJxZ9jVk6nCvXz8eYwLpA7bQmN3sRt4Uv5";

export default function DepositPage() {
  const [copied, setCopied] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('30');

  // Copy address to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(TRC20_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle confirm deposit
  const handleConfirm = () => {
    if (!amount || parseInt(amount) < 30) {
      alert('Minimum deposit amount is 30 USDT');
      return;
    }
    alert(`Please send ${amount} USDT to the TRC20 address provided`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 py-4 px-3 sm:py-8 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Deposit USDT (TRC20)</h1>
          <p className="text-blue-300 mt-1 text-sm sm:text-base">Send USDT to the address below</p>
        </div>

        {/* Main Content */}
        <div className="max-w-md mx-auto">
          {/* QR Code Section */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-4 sm:p-6 md:p-8 border border-slate-700 mb-6">
            <div className="text-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-white">Scan QR Code</h2>
              <p className="text-slate-400 mt-1 text-xs sm:text-sm">Use your wallet to scan</p>
            </div>

            {/* QR Code Image */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 sm:border-4 border-green-500/20">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`tron:${TRC20_ADDRESS}?amount=${amount}&token=USDT`)}`}
                  alt="USDT TRC20 QR Code"
                  className="w-48 h-48 sm:w-56 sm:h-56"
                />
              </div>
            </div>

            {/* Amount Input */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-slate-300 text-xs sm:text-sm font-medium mb-2">
                Amount (Min: 30 USDT)
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 font-bold sm:text-xl">
                  $
                </div>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || (/^\d+$/.test(value))) {
                      setAmount(value);
                    }
                  }}
                  className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-slate-800 border-2 border-slate-700 rounded-lg sm:rounded-xl text-white text-lg sm:text-2xl font-bold focus:outline-none focus:border-green-500 transition-colors text-center"
                  placeholder="30"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 font-semibold text-sm">
                  USDT
                </div>
              </div>
            </div>

            {/* TRC20 Address */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base sm:text-lg font-bold text-white">TRC20 Address</h3>
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center text-xs sm:text-sm font-semibold"
                >
                  {copied ? (
                    <>
                      <FiCheck className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <FiCopy className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              {/* Address Display */}
              <div className="bg-slate-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-700 mb-4 sm:mb-6">
                <div className="font-mono text-xs sm:text-sm md:text-base text-white break-all text-center leading-tight">
                  {TRC20_ADDRESS}
                </div>
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirm}
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg sm:rounded-xl font-bold text-base sm:text-lg hover:from-green-700 hover:to-green-800 transition-all duration-300"
              >
                Confirm ${amount || '0'} USDT
              </button>

              {/* Minimum Info */}
              <div className="text-center mt-3">
                <p className="text-slate-400 text-xs sm:text-sm">
                  Min: <span className="text-green-400 font-bold">30 USDT</span>
                </p>
              </div>
            </div>
          </div>

          {/* Simple Info Box */}
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-700/50">
            <h3 className="text-base sm:text-lg font-bold text-white mb-3">Important Notes</h3>
            <ul className="space-y-2 text-blue-200 text-xs sm:text-sm">
              <li className="flex items-start">
                <span className="text-green-400 mr-2 mt-0.5">✓</span>
                Send only <span className="text-white font-bold">USDT on TRC20</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 mt-0.5">✓</span>
                Minimum: <span className="text-white font-bold ml-1">30 USDT</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 mt-0.5">✓</span>
                Double-check address before sending
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}