'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import PulseLoader from 'react-spinners/PulseLoader';
import { useRouter } from 'next/navigation';
import {
  useResendVerificationEmailMutation,
  useSecurityVerifyMutation,
} from '@/redux/features/auth/authApi';
import { addEmail } from '@/redux/resetPassSlice';
import { useDispatch } from 'react-redux';
import { FiMail, FiKey, FiArrowRight, FiClock } from 'react-icons/fi';

const ForgotPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // API mutations
  const [
    resendVerificationEmail,
    {
      isLoading: isResendLoading,
      isSuccess: isResendSuccess,
      isError: isResendError,
      error: resendError,
    },
  ] = useResendVerificationEmailMutation();

  const [
    verifySecurityCode,
    {
      isLoading: isVerifyLoading,
      isSuccess: isVerifySuccess,
      isError: isVerifyError,
      error: verifyError,
    },
  ] = useSecurityVerifyMutation();

  // State variables
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(30);
  const [send, setSend] = useState(false);
  const [sendError, setSendError] = useState(false);

  // Handlers
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setSendError(false);
  };

  const handleResend = (e: React.FormEvent) => {
    e.preventDefault();
    resendVerificationEmail({ email });
    setResendDisabled(true);
    setTimer(60);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      email,
      code: verificationCode,
      url: '/',
    };
    verifySecurityCode(data);
  };

  // Effects
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (timer > 0 && resendDisabled) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearInterval(intervalId);
  }, [timer, resendDisabled]);

  useEffect(() => {
    if (isResendSuccess) {
      toast.success('Email sent successfully');
      setSend(true);
    }
    if (resendError) {
      if (isResendError) {
        toast.error((resendError as fetchBaseQueryError).data?.message);
        setSendError(true);
      }
    }
  }, [isResendSuccess, resendError, isResendError]);

  useEffect(() => {
    if (isVerifySuccess) {
      toast.success('Verification successful');
      dispatch(addEmail(email));
      router.push('/reset-password');
    }
    if (verifyError) {
      if (isVerifyError) {
        toast.error((verifyError as fetchBaseQueryError).data?.message);
        setCodeError(true);
      }
    }
  }, [isVerifySuccess, verifyError, isVerifyError, dispatch, email, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {send ? (
          <>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Check Your Email</h1>
              <p className="text-sm text-gray-600 mt-2">
                We've sent a verification code to{' '}
                <span className="font-semibold text-blue-600">{email}</span>
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <FiKey className="text-gray-500 mr-2" />
                  <label className="block font-medium text-gray-700">Verification Code</label>
                </div>
                <input
                  type="text"
                  required
                  placeholder="Enter your 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {codeError && (
                  <p className="text-xs text-red-500 mt-1">Please enter the correct code</p>
                )}
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center text-gray-500">
                  <FiClock className="mr-1" />
                  <span>Code expires in {timer} seconds</span>
                </div>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendDisabled}
                  className={`text-blue-600 hover:text-blue-800 font-medium ${
                    resendDisabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Resend Code
                </button>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out flex items-center justify-center"
                disabled={isVerifyLoading}
              >
                {isVerifyLoading ? (
                  <PulseLoader color="#fff" size={8} margin={2} />
                ) : (
                  <>
                    Verify Code <FiArrowRight className="ml-2" />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Forgot Password?</h1>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Enter your email to receive a password reset link
            </p>

            <form onSubmit={handleResend} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <FiMail className="text-gray-500 mr-2" />
                  <label className="block font-medium text-gray-700">Email Address</label>
                </div>
                <input
                  type="email"
                  placeholder="example@email.com"
                  required
                  value={email}
                  onChange={handleChangeEmail}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {sendError && (
                  <p className="text-xs text-red-500 mt-1">
                    We're having trouble sending the email. Please try again.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out flex items-center justify-center"
                disabled={isResendLoading}
              >
                {isResendLoading ? (
                  <PulseLoader color="#fff" size={8} margin={2} />
                ) : (
                  <>
                    Continue <FiArrowRight className="ml-2" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => router.back()}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Back to Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;