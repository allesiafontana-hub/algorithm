import React, { useState } from 'react';
import { User, Lock, ArrowRight } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [studentId, setStudentId] = useState('');
  const [otp, setOtp] = useState('');
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consent) {
      alert("Please provide consent to access camera and microphone.");
      return;
    }
    // Triggers the transition to DeviceCheck in App.jsx
    onLogin();
  };

  return (
    <div className="max-w-md w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Student Login
        </h1>
        <p className="text-gray-400 text-sm">Enter your credentials to access the exam portal</p>
      </div>

      <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student ID Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 text-center">Student ID</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter ID"
                required
                className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* OTP Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 text-center">OTP</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
              <input
                type="password"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
                className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <button type="button" className="w-full text-center mt-2 text-sm text-blue-400 hover:text-blue-300">
              Request OTP
            </button>
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="consent" className="text-xs text-gray-400">
              I consent to camera, microphone, and system access
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-lg shadow-blue-900/20"
          >
            <ArrowRight className="w-5 h-5" />
            Login & Start Verification
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
