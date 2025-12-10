'use client';

import { useState, useEffect } from 'react';
import { 
  FiDollarSign, 
  FiCopy, 
  FiCheck,
  FiMail,
  FiLock,
  FiRefreshCw
} from 'react-icons/fi';
import { MdTimer } from 'react-icons/md';

export default function WithdrawPage() {
  const [withdrawAmount, setWithdrawAmount] = useState<string>('30');
  const [trc20Address, setTrc20Address] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [availableBalance] = useState<number>(8450.75);
  const [processing, setProcessing] = useState<boolean>(false);
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);
  
  // Calculate fees
  const calculateFees = () => {
    const amount = parseFloat(withdrawAmount) || 0;
    const withdrawalFee = amount * 0.07;
    const netAmount = amount - withdrawalFee;
    return { withdrawalFee, netAmount };
  };

  const { withdrawalFee, netAmount } = calculateFees();

  // Handle amount input
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 1)) {
      setWithdrawAmount(value);
    }
  };

  // Send verification code
  const sendVerificationCode = () => {
    if (!trc20Address) {
      alert('Enter TRC20 address first');
      return;
    }

    setCodeSent(true);
    setCountdown(60);
    alert('Code sent to email');
  };

  // Handle countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Handle withdraw
  const handleWithdraw = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) < 30) {
      alert('Min: 30 USDT');
      return;
    }

    if (!trc20Address) {
      alert('Enter TRC20 address');
      return;
    }

    if (!verificationCode) {
      alert('Enter verification code');
      return;
    }

    if (parseFloat(withdrawAmount) > availableBalance) {
      alert('Insufficient balance');
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      alert(`Withdrawal: ${withdrawAmount} USDT\nNet: ${netAmount.toFixed(2)} USDT`);
      setWithdrawAmount('30');
      setVerificationCode('');
    }, 2000);
  };

  // Quick amounts
  const quickAmounts = [30, 50, 100, 200, 500];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 py-4 px-3 sm:py-8 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Withdraw USDT</h1>
          <p className="text-blue-300 mt-1 text-xs sm:text-sm">Withdraw to TRC20 wallet</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Balance Card */}
            <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-700/50">
              <div className="text-center">
                <h2 className="text-base sm:text-lg font-bold text-white mb-2">Available Balance</h2>
                <div className="flex items-center justify-center">
                  <FiDollarSign className="text-green-400 text-2xl sm:text-3xl mr-2" />
                  <div>
                    <p className="text-green-300 text-xs sm:text-sm">Balance</p>
                    <p className="text-2xl sm:text-4xl md:text-5xl font-bold text-white">${availableBalance.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Amount Section */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center">
                <FiDollarSign className="mr-2 text-green-400 w-4 h-4 sm:w-5 sm:h-5" />
                Amount
              </h2>

              {/* Amount Input */}
              <div className="mb-4">
                <label className="block text-slate-300 text-xs sm:text-sm font-medium mb-2">
                  Amount (Min: 30 USDT)
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 font-bold text-lg">
                    $
                  </div>
                  <input
                    type="text"
                    value={withdrawAmount}
                    onChange={handleAmountChange}
                    className="w-full pl-10 pr-10 sm:pl-12 sm:pr-12 py-3 bg-slate-800 border-2 border-slate-700 rounded-lg sm:rounded-xl text-white text-xl sm:text-2xl font-bold focus:outline-none focus:border-green-500 transition-colors text-center"
                    placeholder="30"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 font-semibold text-sm">
                    USDT
                  </div>
                </div>
                
                {/* Quick Amounts */}
                <div className="mt-3">
                  <p className="text-slate-400 text-xs mb-2">Quick:</p>
                  <div className="grid grid-cols-5 gap-1 sm:gap-2">
                    {quickAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setWithdrawAmount(amount.toString())}
                        className={`py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 ${
                          withdrawAmount === amount.toString()
                            ? 'bg-gradient-to-r from-green-600 to-green-700 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Fee Summary */}
              <div className="bg-blue-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-700/50">
                <h4 className="text-white font-semibold text-sm sm:text-base mb-2">
                  Summary
                </h4>
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-300">Amount:</span>
                    <span className="text-white font-bold">${parseFloat(withdrawAmount) || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">Fee (7%):</span>
                    <span className="text-red-400 font-bold">-${withdrawalFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-blue-700/50">
                    <span className="text-green-300 font-semibold">You get:</span>
                    <span className="text-green-400 font-bold text-sm sm:text-base">${netAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Address & Verification */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center">
                <FiCopy className="mr-2 text-blue-400 w-4 h-4 sm:w-5 sm:h-5" />
                TRC20 Address
              </h2>

              {/* Address Input */}
              <div className="mb-4">
                <label className="block text-slate-300 text-xs sm:text-sm font-medium mb-2">
                  Your TRC20 Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={trc20Address}
                    onChange={(e) => setTrc20Address(e.target.value)}
                    placeholder="Enter TRC20 address"
                    className="w-full pl-10 sm:pl-12 pr-4 py-3 bg-slate-800 border-2 border-slate-700 rounded-lg sm:rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <FiCopy className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                </div>
              </div>

              {/* Verification */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center">
                    <FiMail className="mr-2 text-yellow-400 w-4 h-4" />
                    Verification
                  </h3>
                  <button
                    onClick={sendVerificationCode}
                    disabled={!trc20Address || codeSent}
                    className={`px-3 py-1.5 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center ${
                      !trc20Address || codeSent
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                    }`}
                  >
                    {codeSent ? (
                      <>
                        <FiRefreshCw className={`mr-1 ${countdown > 0 ? 'animate-spin' : ''} w-3 h-3`} />
                        {countdown > 0 ? `${countdown}s` : 'Resend'}
                      </>
                    ) : (
                      'Send Code'
                    )}
                  </button>
                </div>

                {/* Code Input */}
                <div className="mb-4">
                  <label className="block text-slate-300 text-xs sm:text-sm font-medium mb-2">
                    6-digit Code
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="Enter code"
                      className="w-full pl-10 sm:pl-12 pr-4 py-3 bg-slate-800 border-2 border-slate-700 rounded-lg sm:rounded-xl text-white text-center text-lg sm:text-xl font-bold tracking-widest focus:outline-none focus:border-yellow-500 transition-colors"
                      maxLength={6}
                    />
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 w-4 h-4" />
                  </div>
                </div>

                {/* Withdraw Button */}
                <button
                  onClick={handleWithdraw}
                  disabled={processing || !verificationCode || !trc20Address || parseFloat(withdrawAmount) < 30}
                  className={`w-full py-3 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center ${
                    processing || !verificationCode || !trc20Address || parseFloat(withdrawAmount) < 30
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
                  }`}
                >
                  {processing ? (
                    <>
                      <FiRefreshCw className="animate-spin mr-2 w-4 h-4" />
                      Processing...
                    </>
                  ) : (
                    `Withdraw $${netAmount.toFixed(2)}`
                  )}
                </button>

                <p className="text-center text-slate-400 text-xs mt-2">
                  You get: ${netAmount.toFixed(2)} USDT
                </p>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-yellow-700/30">
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 flex items-center">
                <MdTimer className="mr-2 text-yellow-400 w-4 h-4 sm:w-5 sm:h-5" />
                Info
              </h3>
              
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-start">
                  <div className="text-green-400 mr-2 mt-0.5">✓</div>
                  <div>
                    <p className="text-white font-semibold">Min: 30 USDT</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-red-400 mr-2 mt-0.5">⚠</div>
                  <div>
                    <p className="text-white font-semibold">Fee: 7%</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-blue-400 mr-2 mt-0.5">⏰</div>
                  <div>
                    <p className="text-white font-semibold">Time: 0-24h</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-purple-400 mr-2 mt-0.5">🔗</div>
                  <div>
                    <p className="text-white font-semibold">Network: TRC20</p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="pt-3 mt-3 border-t border-yellow-700/30">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 text-xs">Status:</span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                    Active 24/7
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
            <p className="text-slate-400 text-xs">
              Funds sent within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}