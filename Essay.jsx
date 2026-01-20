import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

const Essay = ({ onSubmitSuccess }) => {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [text]);

  const handleSubmit = () => {
    if (text.trim().length === 0) {
      alert('Please write your essay before submitting.');
      return;
    }
    setIsModalOpen(true);
  };

  const confirmSubmit = () => {
    setIsSubmitted(true);
    setIsModalOpen(false);
    // No window.alert() here - the UI handles the message below
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-10 px-4 animate-in fade-in duration-700">
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-gray-100">
        
        {/* 🏆 IN-UI SUCCESS MESSAGE (Replaces the Popup) */}
        {isSubmitted && (
          <div className="bg-green-600 p-6 flex items-center justify-center gap-4 animate-in slide-in-from-top duration-500">
            <CheckCircle className="text-white w-8 h-8" />
            <div className="text-center">
              <h3 className="text-white font-black text-xl italic uppercase tracking-tight">
                Essay Submitted Successfully!
              </h3>
              <p className="text-green-100 text-sm font-bold">
                Your response has been locked and sent for evaluation.
              </p>
            </div>
          </div>
        )}

        <div className="p-8 md:p-12">
          {/* Question Section */}
          <div className="bg-slate-50 border-l-8 border-[#2d4a8a] rounded-2xl p-8 mb-8">
            <div className="text-[#1a2a6c] text-xs font-black uppercase tracking-widest mb-4">Question</div>
            <p className="text-gray-700 text-xl font-medium leading-relaxed">
              Discuss the impact of technology on modern education. How has digital learning transformed the traditional classroom experience?
            </p>
          </div>

          {/* Guidelines & Counter */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 bg-blue-50 text-[#2d4a8a] px-4 py-2 rounded-full text-sm font-bold border border-blue-100 italic">
              <AlertCircle className="w-4 h-4" /> Maximum 200 words
            </div>
            <div className={`px-6 py-2 rounded-full font-black text-sm border-2 transition-all duration-300 ${
              wordCount > 200 ? 'bg-red-50 border-red-500 text-red-600 animate-pulse' : 'bg-slate-50 border-gray-200 text-[#1a2a6c]'
            }`}>
              Words: {wordCount}/200
            </div>
          </div>

          {/* Essay Area (Black Text) */}
          <div className="mb-10">
            <label className="block text-[#1a2a6c] font-black text-lg mb-4 italic uppercase tracking-tighter">Your Answer</label>
            <textarea
              className={`w-full min-h-[400px] p-8 text-lg leading-relaxed rounded-3xl border-2 transition-all duration-300 focus:outline-none 
                text-black font-medium placeholder-gray-400 ${
                isSubmitted ? 'bg-gray-100 cursor-not-allowed border-gray-300 opacity-70' : 'bg-slate-50 border-gray-100 focus:border-[#2d4a8a] shadow-inner'
              }`}
              placeholder="Start writing your essay here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={isSubmitted}
            />
          </div>

          {/* Action Buttons (Hidden after submission) */}
          {!isSubmitted ? (
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => alert('Draft saved!')}
                className="px-8 py-4 rounded-full font-black border-2 border-[#2d4a8a] text-[#2d4a8a] hover:bg-slate-50 transition-all uppercase text-sm tracking-widest"
              >
                Save Draft
              </button>
              <button 
                onClick={handleSubmit}
                className="px-10 py-4 rounded-full font-black bg-gradient-to-r from-[#1a2a6c] to-[#2d4a8a] text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all uppercase text-sm tracking-widest"
              >
                Submit Essay
              </button>
            </div>
          ) : (
            <div className="flex justify-center mt-4">
              <button 
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 text-[#2d4a8a] font-black underline uppercase tracking-tighter hover:text-blue-800"
              >
                <ArrowLeft className="w-4 h-4" /> Return to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a2a6c]/90 backdrop-blur-md p-4">
          <div className="bg-white p-10 rounded-[2.5rem] max-w-md w-full text-center shadow-2xl animate-in zoom-in duration-300 border border-white/20">
            <div className="w-20 h-20 bg-blue-50 text-[#1a2a6c] rounded-full flex items-center justify-center text-4xl mx-auto mb-6">?</div>
            <h2 className="text-3xl font-black text-[#1a2a6c] mb-4 italic uppercase tracking-tighter">Confirm Submit?</h2>
            <p className="text-gray-500 mb-10 font-medium leading-relaxed">
              Are you sure? You won't be able to make changes after submission.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={confirmSubmit}
                className="w-full py-5 rounded-full font-black bg-[#1a2a6c] text-white shadow-lg uppercase tracking-widest text-sm hover:bg-[#2d4a8a] transition-all"
              >
                Confirm Submit
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full py-5 rounded-full font-black border-2 border-gray-100 text-gray-400 hover:bg-gray-50 uppercase tracking-widest text-sm transition-all"
              >
                Review Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Essay;