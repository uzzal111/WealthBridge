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

export default function ForgotPassword() {
  const router = useRouter();
  const dispatch = useDispatch();

  /* ===================== API mutations ===================== */
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

  /* ===================== State ===================== */
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(30);
  const [send, setSend] = useState(false);
  const [sendError, setSendError] = useState(false);

  /* ===================== Handlers ===================== */
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
    verifySecurityCode({
      email,
      code: verificationCode,
      url: '/',
    });
  };

  /* ===================== Timer ===================== */
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (timer > 0 && resendDisabled) {
      intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [timer, resendDisabled]);

  /* ===================== Resend result ===================== */
  useEffect(() => {
    if (isResendSuccess) {
      toast.success('Email sent successfully');
      setSend(true);
    }

    if (isResendError && resendError) {
      toast.error(
        (resendError as fetchBaseQueryError).data?.message ||
          'Failed to send email'
      );
      setSendError(true);
    }
  }, [isResendSuccess, isResendError, resendError]);

  /* ===================== Verify result ===================== */
  useEffect(() => {
    if (isVerifySuccess) {
      toast.success('Verification successful');
      dispatch(addEmail(email));
      router.push('/reset-password');
    }

    if (isVerifyError && verifyError) {
      toast.error(
        (verifyError as fetchBaseQueryError).data?.message ||
          'Invalid verification code'
      );
      setCodeError(true);
    }
  }, [isVerifySuccess, isVerifyError, verifyError, dispatch, email, router]);

  /* ===================== UI ===================== */
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {send ? (
          <>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Check Your Email
              </h1>
              <p className="text-sm text-gray-600 mt-2">
                We sent a verification code to{' '}
                <span className="font-semibold text-blue-600">{email}</span>
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <FiKey className="mr-2" /> Verification Code
                </label>
                <input
                  type="text"
                  required
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border rounded-md"
                  placeholder="Enter 6-digit code"
                />
                {codeError && (
                  <p className="text-xs text-red-500 mt-1">
                    Invalid verification code
                  </p>
                )}
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <span className="flex items-center">
                  <FiClock className="mr-1" />
                  Expires in {timer}s
                </span>
                <button
                  type="button"
                  disabled={resendDisabled}
                  onClick={handleResend}
                  className="text-blue-600 disabled:opacity-50"
                >
                  Resend
                </button>
              </div>

              <button
                type="submit"
                disabled={isVerifyLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-md flex justify-center items-center"
              >
                {isVerifyLoading ? (
                  <PulseLoader size={8} color="#fff" />
                ) : (
                  <>
                    Verify <FiArrowRight className="ml-2" />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center mb-2">
              Forgot Password?
            </h1>
            <p className="text-sm text-gray-600 text-center mb-6">
              Enter your email to receive a verification code
            </p>

            <form onSubmit={handleResend} className="space-y-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <FiMail className="mr-2" /> Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={handleChangeEmail}
                  className="w-full mt-1 px-4 py-2 border rounded-md"
                  placeholder="example@email.com"
                />
                {sendError && (
                  <p className="text-xs text-red-500 mt-1">
                    Failed to send email
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isResendLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-md flex justify-center items-center"
              >
                {isResendLoading ? (
                  <PulseLoader size={8} color="#fff" />
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
                className="text-sm text-blue-600"
              >
                Back to Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
