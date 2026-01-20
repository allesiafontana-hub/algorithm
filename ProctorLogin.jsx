import React, { useState } from 'react';
import { Mail, Lock, LogIn, Loader2, ShieldCheck } from 'lucide-react';

const ProctorLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success'

  const handleTeacherLogin = (e) => {
    e.preventDefault();
    
    // 1. Start the loading state
    setStatus('loading');

    // 2. Simulate Authentication & Security Handshake
    setTimeout(() => {
      setStatus('success');
      
      // 3. This is the CRITICAL line that tells App.jsx to change the view
      setTimeout(() => {
        onLogin();
      }, 800);
    }, 1500);
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <div className="inline-flex p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20 mb-4">
          <ShieldCheck className="text-purple-400 w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-white italic tracking-tight">TEACHER PORTAL</h2>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Authorized Personnel Only</p>
      </div>

      <form onSubmit={handleTeacherLogin} className="space-y-5">
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Institutional Email"
            className="w-full bg-black/40 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
          />
        </div>

        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Access Password"
            className="w-full bg-black/40 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={status !== 'idle'}
          className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
            status === 'idle' 
              ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20' 
              : 'bg-slate-800 text-slate-400 cursor-not-allowed'
          }`}
        >
          {status === 'idle' && (
            <>
              Initialize Session <LogIn className="w-4 h-4" />
            </>
          )}
          {status === 'loading' && (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> 
              Verifying Credentials...
            </>
          )}
          {status === 'success' && (
            <>
              <ShieldCheck className="w-4 h-4 text-green-400" /> 
              Access Granted
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-800/50 text-center">
        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter leading-relaxed">
          By logging in, you agree to the <br /> 
          <span className="text-slate-400 hover:underline cursor-pointer">Security & Privacy Protocol</span>
        </p>
      </div>
    </div>
  );
};

export default ProctorLogin;