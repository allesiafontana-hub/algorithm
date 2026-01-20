import React from 'react';
import { 
  BookOpen, 
  FileCheck, 
  Search, 
  ShieldAlert, 
  LayoutDashboard, 
  Fingerprint, 
  BrainCircuit 
} from 'lucide-react';

const Dashboard = ({ userRole, onSelectAssignment, onSelectTest, onSelectPlagiarism }) => {
  return (
    <div className="w-full max-w-6xl animate-in fade-in zoom-in duration-500">
      
      {/* 🟢 DASHBOARD HEADER */}
      <div className="flex items-center justify-between mb-10 px-4">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl ${userRole === 'teacher' ? 'bg-purple-600/20' : 'bg-blue-600/20'}`}>
            <LayoutDashboard className={userRole === 'teacher' ? 'text-purple-400' : 'text-blue-400'} size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase">
              {userRole === 'teacher' ? 'Proctor Dashboard' : 'Student Portal'}
            </h2>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
              Welcome back, {userRole}
            </p>
          </div>
        </div>
      </div>

      {/* 🔵 GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        
        {/* --- STUDENT VIEW --- */}
        {userRole === 'student' && (
          <>
            <div 
              onClick={onSelectAssignment}
              className="group cursor-pointer bg-slate-900/50 p-10 rounded-[3rem] border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/50 transition-all duration-300 shadow-xl"
            >
              <div className="bg-blue-600/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="text-blue-500" size={32} />
              </div>
              <h3 className="text-2xl font-black italic text-white mb-2">Assignments</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Access your pending essay tasks and course writing submissions.
              </p>
            </div>

            <div 
              onClick={onSelectTest}
              className="group cursor-pointer bg-slate-900/50 p-10 rounded-[3rem] border border-slate-800 hover:border-green-500/50 hover:bg-slate-800/50 transition-all duration-300 shadow-xl"
            >
              <div className="bg-green-600/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileCheck className="text-green-500" size={32} />
              </div>
              <h3 className="text-2xl font-black italic text-white mb-2">Secure Examination</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Complete hardware verification and enter proctored test sessions.
              </p>
            </div>
          </>
        )}

        {/* --- TEACHER VIEW --- */}
        {userRole === 'teacher' && (
          <>
            {/* AI + PLAGIARISM INTEGRITY SCANNER */}
            <div 
              onClick={() => {
                console.log("Teacher: Initializing Integrity Scanner");
                onSelectPlagiarism();
              }}
              className="group cursor-pointer bg-gradient-to-br from-purple-900/40 to-blue-900/20 p-10 rounded-[3rem] border border-purple-500/30 hover:border-blue-400 transition-all duration-300 shadow-2xl relative overflow-hidden"
            >
              {/* Decorative Background Icons */}
              <Fingerprint className="absolute -bottom-4 -right-4 w-32 h-32 text-purple-500/5 rotate-12" />
              
              <div className="flex gap-4 mb-6">
                <div className="bg-purple-600/20 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform border border-purple-500/30">
                  <Search className="text-purple-400" size={32} />
                </div>
                <div className="bg-blue-600/20 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform border border-blue-500/30">
                  <BrainCircuit className="text-blue-400" size={32} />
                </div>
              </div>

              <h3 className="text-2xl font-black italic text-white mb-2">Integrity Shield</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Comprehensive audit tool: Scan for database matches and AI-generated language patterns (ChatGPT/Claude/Gemini).
              </p>
              
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-purple-500/20 rounded-full text-[9px] font-black text-purple-400 uppercase tracking-tighter border border-purple-500/30">
                  Plagiarism Match
                </span>
                <span className="px-3 py-1 bg-blue-500/20 rounded-full text-[9px] font-black text-blue-400 uppercase tracking-tighter border border-blue-500/30">
                  AI Probability
                </span>
              </div>
            </div>

            {/* LOCKED PROCTOR LOGS */}
            <div 
              className="cursor-not-allowed bg-slate-900/30 p-10 rounded-[3rem] border border-slate-800/50 opacity-50 relative overflow-hidden"
            >
              <div className="bg-red-600/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <ShieldAlert className="text-red-500/50" size={32} />
              </div>
              <h3 className="text-2xl font-black italic text-slate-500 mb-2">Proctor Logs</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Review security flags, screen violations, and AI behavior reports from live exam sessions.
              </p>
              <div className="absolute top-6 right-6 bg-slate-800 text-slate-500 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter">
                Coming Soon
              </div>
            </div>
          </>
        )}
      </div>

      {/* 📊 SYSTEM FOOTER STATS */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {[
          { label: 'Integrity Engine', val: 'v2.4.0', color: 'text-purple-500' },
          { label: 'DB Latency', val: '18ms', color: 'text-slate-400' },
          { label: 'AI Accuracy', val: '99.2%', color: 'text-blue-400' },
          { label: 'Verified Today', val: '432 Papers', color: 'text-slate-400' }
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900/30 border border-slate-800 p-4 rounded-2xl text-center">
            <p className="text-[8px] uppercase font-black text-slate-600 mb-1">{stat.label}</p>
            <p className={`text-xs font-bold ${stat.color}`}>{stat.val}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;