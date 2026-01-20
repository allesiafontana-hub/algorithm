import React from 'react';
import { ArrowLeft, CheckCircle, FileText } from 'lucide-react';

const Instructions = ({ onStartAssignment, onBack }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center py-10 px-4 animate-in fade-in duration-700">
      
      {/* 🔙 Back Navigation */}
      <div className="w-full max-w-2xl mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-[#1a2a6c] transition-colors font-black uppercase tracking-tighter text-sm group"
        >
          <div className="p-2 bg-gray-200 rounded-lg group-hover:bg-[#1a2a6c] group-hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back
        </button>
      </div>

      {/* 📄 Main Instructions Card */}
      <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden relative border border-gray-100">
        <div className="p-12 flex flex-col items-center text-center">
          
          <h2 className="text-5xl font-black text-[#1a2a6c] mb-2 tracking-tighter italic">
            Exam Instructions
          </h2>
          
          {/* Forced Black for the subheading */}
          <p className="font-bold mb-8 uppercase tracking-widest text-xs" style={{ color: '#000000' }}>
            Please read carefully before proceeding
          </p>
          
          <div className="w-24 h-1.5 bg-blue-600 rounded-full mb-12"></div>

          {/* Rules List */}
          <div className="w-full space-y-6 text-left mb-12 bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-inner">
            
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <p className="font-bold text-lg leading-tight" style={{ color: '#000000' }}>
                Read the <span className="text-blue-600 font-extrabold">question carefully</span> before answering.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <p className="font-bold text-lg leading-tight" style={{ color: '#000000' }}>
                The essay must not exceed <span className="text-blue-600 font-black underline">200 words</span>.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <p className="font-bold text-lg leading-tight" style={{ color: '#000000' }}>
                Do <span className="text-blue-600 font-black">not refresh</span> or close the browser during the test.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <p className="font-bold text-lg leading-tight" style={{ color: '#000000' }}>
                Provide <span className="text-blue-600 font-extrabold">evidence</span> and <span className="text-blue-600 font-extrabold">sample</span>.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <p className="font-bold text-lg leading-tight" style={{ color: '#000000' }}>
                Click <span className="text-blue-600 font-black underline uppercase tracking-tighter">SUBMIT</span> once you finish writing.
              </p>
            </div>

          </div>

          {/* Start Button */}
          <button 
            onClick={onStartAssignment}
            className="group flex items-center gap-4 bg-[#1a2a6c] text-white px-14 py-6 rounded-full font-black text-xl shadow-2xl hover:bg-blue-700 hover:scale-105 transition-all active:scale-95 uppercase tracking-tighter"
          >
            Start Exam
            <FileText className="w-6 h-6 group-hover:animate-bounce" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
