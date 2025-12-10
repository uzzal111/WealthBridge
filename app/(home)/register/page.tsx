"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiMail, FiKey, FiSend, FiPhone, FiCheck, FiGlobe, FiLogIn, FiEye, FiEyeOff } from 'react-icons/fi';

// Country code options
const countryCodes = [
  { code: '+1', name: 'USA', flag: '🇺🇸' },
  { code: '+44', name: 'UK', flag: '🇬🇧' },
  { code: '+91', name: 'IN', flag: '🇮🇳' },
  { code: '+86', name: 'CN', flag: '🇨🇳' },
  { code: '+81', name: 'JP', flag: '🇯🇵' },
  { code: '+49', name: 'DE', flag: '🇩🇪' },
  { code: '+33', name: 'FR', flag: '🇫🇷' },
  { code: '+61', name: 'AU', flag: '🇦🇺' },
  { code: '+971', name: 'UAE', flag: '🇦🇪' },
  { code: '+92', name: 'PK', flag: '🇵🇰' },
  { code: '+94', name: 'LK', flag: '🇱🇰' },
  { code: '+880', name: 'BD', flag: '🇧🇩' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    verificationCode: '',
    password: '',
    confirmPassword: '',
    partnerCode: '',
    phone: '',
    countryCode: '+1',
    terms: false
  });
  const [codeSent, setCodeSent] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountExists, setAccountExists] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Check if account exists (simulated logic)
    if (name === 'email' && value) {
      // In real app, make API call here
      const existingAccounts = ['test@example.com', 'user@gmail.com'];
      setAccountExists(existingAccounts.includes(value));
    }
  };

  const handleCountryCodeChange = (code: string) => {
    setFormData(prev => ({
      ...prev,
      countryCode: code
    }));
    setShowCountryDropdown(false);
  };

  const sendVerificationCode = () => {
    if (!formData.email) {
      alert('Please enter email first');
      return;
    }
    if (accountExists) {
      alert('Account already exists. Please login instead.');
      return;
    }
    // Implement your code sending logic here
    setCodeSent(true);
    alert('Verification code sent to your email');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (accountExists) {
      alert('Account already exists. Please login.');
      router.push('/login');
      return;
    }
    
    // Add form validation here
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (!formData.terms) {
      alert("Please accept the terms and conditions");
      return;
    }
    router.push('/dashboard');
  };

  const handleLoginRedirect = () => {
    if (formData.email) {
      // Store email for login page
      localStorage.setItem('rememberEmail', formData.email);
    }
    router.push('/login');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-600 mt-2">Join us today!</p>
          </div>

          {/* Account exists notification */}
          {accountExists && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FiKey className="mr-3 text-yellow-600" />
                  <p className="text-yellow-700 font-medium">
                    Account already exists with this email
                  </p>
                </div>
                <button
                  onClick={handleLoginRedirect}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <FiLogIn className="mr-2" />
                  Login
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FiMail className="mr-2 text-gray-500" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-lg border ${
                  accountExists ? 'border-yellow-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                required
              />
            </div>

            {/* Verification Code */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <FiSend className="mr-2 text-gray-500" />
                  Verification Code
                </label>
                <button
                  type="button"
                  onClick={sendVerificationCode}
                  disabled={!formData.email || codeSent || accountExists}
                  className={`text-sm font-medium ${
                    codeSent 
                      ? 'text-green-600' 
                      : accountExists 
                        ? 'text-gray-400' 
                        : 'text-blue-600 hover:text-blue-800'
                  } transition-colors disabled:cursor-not-allowed`}
                >
                  {codeSent ? 'Code Sent' : 'Send Code'}
                </button>
              </div>
              <input
                type="text"
                name="verificationCode"
                value={formData.verificationCode}
                onChange={handleChange}
                placeholder="Enter verification code"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500">
                Check your email, including spam folder, for the code
              </p>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FiKey className="mr-2 text-gray-500" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password (min 8 characters)"
                  minLength={8}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              <div className="text-xs text-gray-500 flex items-center">
                <FiCheck className="mr-1" /> At least one uppercase letter
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FiKey className="mr-2 text-gray-500" />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Partner Code */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FiKey className="mr-2 text-gray-500" />
                Partner Code (Optional)
              </label>
              <input
                type="text"
                name="partnerCode"
                value={formData.partnerCode}
                onChange={handleChange}
                placeholder="Enter partner code if you have one"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Phone Number with Country Code - Compact Version */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FiPhone className="mr-2 text-gray-500" />
                Phone Number
              </label>
              <div className="flex space-x-2">
                {/* Compact Country Code Selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className="flex items-center justify-center w-20 px-3 py-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <span className="flex items-center text-sm">
                      <FiGlobe className="mr-1 text-gray-500" />
                      {formData.countryCode}
                    </span>
                  </button>
                  
                  {showCountryDropdown && (
                    <div className="absolute z-10 mt-1 w-48 max-h-60 overflow-y-auto bg-white rounded-lg border border-gray-200 shadow-lg">
                      {countryCodes.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => handleCountryCodeChange(country.code)}
                          className={`w-full px-3 py-2 text-left hover:bg-blue-50 flex items-center justify-between ${formData.countryCode === country.code ? 'bg-blue-50 text-blue-600' : ''}`}
                        >
                          <div className="flex items-center">
                            <span className="text-base mr-2">{country.flag}</span>
                            <span className="text-sm font-medium">{country.name}</span>
                          </div>
                          <span className="text-xs text-gray-600">{country.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Phone Number Input */}
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="flex-1 min-w-0 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start mt-4">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="mt-1 mr-3 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                required
              />
              <label htmlFor="terms" className="block text-sm text-gray-700">
                I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              CREATE ACCOUNT
            </button>

            {/* Already have account link */}
            <div className="text-center mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={handleLoginRedirect}
                  className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}