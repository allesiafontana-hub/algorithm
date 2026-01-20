import React, { useState } from 'react';
import { 
  Search, FileText, AlertTriangle, CheckCircle, 
  ArrowLeft, RefreshCw, ShieldCheck, BrainCircuit, Fingerprint
} from 'lucide-react';

const PlagiarismCheck = ({ onBack }) => {
  const [text, setText] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);

  const runAnalysis = () => {
    if (text.length < 50) {
      alert("Please enter at least 50 characters for an accurate AI & Plagiarism scan.");
      return;
    }
    
    setIsScanning(true);
    setResult(null);

    // Simulated Deep Scan Logic
    setTimeout(() => {
      const plagiarismScore = Math.floor(Math.random() * 30); 
      const aiScore = Math.floor(Math.random() * 90); // Higher range for AI simulation
      
      setResult({
        plagiarism: plagiarismScore,
        aiContent: aiScore,
        wordCount: text.trim().split(/\s+/).length,
        verdict: aiScore > 60 ? "Likely AI Generated" : "Likely Human Written",
        sources: [
          { site: "open-web-archive.org", match: "12%" },
          { site: "student-repo-v4", match: "5%" }
        ]
      });
      setIsScanning(false);
    }, 3000);
  };

  return (
    <div className="w-full max-w-5xl animate-in fade-in duration-700">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 uppercase font-black text-xs tracking-widest group">
        <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-purple-600 transition-all">
          <ArrowLeft className="w-4 h-4 text-white" />
        </div>
        Back to Dashboard
      </button>

      <div className="bg-[#1e293b] rounded-[3rem] border border-slate-700 p-10 shadow-2xl relative overflow-hidden">
        {/* Decorative AI Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px]" />

        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
          <div className="p-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl shadow-lg shadow-purple-500/20">
            <BrainCircuit className="text-white w-10 h-10" />
          </div>
          <div>
            <h2 className="text-4xl font-black italic text-white tracking-tighter uppercase">Integrity Scan</h2>
            <p className="text-slate-400 font-bold text-[10px] tracking-[0.3em]">Plagiarism + AI Content Detector</p>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste student submission (min 50 words) to check for plagiarism and AI-generated patterns..."
          className="w-full h-72 bg-slate-900/80 border-2 border-slate-800 rounded-[2.5rem] p-8 text-white focus:outline-none focus:border-blue-500 transition-all mb-6 shadow-inner text-lg leading-relaxed"
        />

        <button
          onClick={runAnalysis}
          disabled={isScanning}
          className={`w-full py-6 rounded-2xl font-black text-xl uppercase tracking-tighter transition-all flex items-center justify-center gap-4 ${
            isScanning ? 'bg-slate-800 text-slate-500' : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-[1.01] text-white shadow-xl'
          }`}
        >
          {isScanning ? <><RefreshCw className="animate-spin w-6 h-6" /> Deep-Scanning Content...</> : 'Perform Comprehensive Audit'}
        </button>

        {result && (
          <div className="mt-12 space-y-8 animate-in slide-in-from-bottom-6 duration-500">
            
            {/* --- RESULTS GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Plagiarism Gauge */}
              <div className="bg-slate-900/60 p-8 rounded-[2.5rem] border border-slate-800 flex flex-col items-center">
                <Fingerprint className="text-purple-400 mb-2" size={24} />
                <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-2">Plagiarism Score</span>
                <span className={`text-6xl font-black ${result.plagiarism > 20 ? 'text-red-500' : 'text-green-500'}`}>
                  {result.plagiarism}%
                </span>
                <p className="text-slate-400 text-xs mt-4">Matches found in database</p>
              </div>

              {/* AI Detection Gauge */}
              <div className="bg-slate-900/60 p-8 rounded-[2.5rem] border border-slate-800 flex flex-col items-center">
                <BrainCircuit className="text-blue-400 mb-2" size={24} />
                <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-2">AI Probability</span>
                <span className={`text-6xl font-black ${result.aiContent > 50 ? 'text-orange-500' : 'text-blue-400'}`}>
                  {result.aiContent}%
                </span>
                <p className={`text-xs mt-4 font-bold uppercase ${result.aiContent > 50 ? 'text-orange-400' : 'text-blue-400'}`}>
                   {result.verdict}
                </p>
              </div>
            </div>

            {/* Source Breakdown */}
            <div className="bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-800">
               <div className="flex items-center gap-2 mb-6">
                 <FileText className="text-slate-400" size={18} />
                 <h4 className="text-white font-black uppercase text-xs tracking-widest">Matched Source Fragments</h4>
               </div>
               <div className="space-y-3">
                 {result.sources.map((src, i) => (
                   <div key={i} className="flex justify-between items-center bg-slate-800/40 p-4 rounded-2xl border border-white/5">
                     <span className="text-sm text-gray-300 font-bold">{src.site}</span>
                     <span className="text-sm font-black text-purple-400">{src.match} Match</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlagiarismCheck;