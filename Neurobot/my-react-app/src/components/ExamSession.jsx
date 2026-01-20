import React, { useEffect, useState, useRef } from 'react';
import { AlertTriangle, ShieldCheck, Camera } from 'lucide-react';

const ExamSession = ({ onSubmit }) => {
  const [violations, setViolations] = useState(0);
  const [warningMsg, setWarningMsg] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    // 1. Implementation of Fullscreen (from proctor.js)
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }

    // 2. Setup Webcam (from proctor.js)
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(() => alert("Webcam access is mandatory!"));

    // 3. Security Event Listeners (from proctor.js)
    const handleVisibility = () => {
      if (document.hidden) flag("Tab switching detected!");
    };

    const handleBlur = () => flag("Window focus lost!");

    const handleKeydown = (e) => {
      if (
        e.key === "PrintScreen" ||
        (e.ctrlKey && ["c", "v", "x", "p", "s", "u", "i"].includes(e.key.toLowerCase()))
      ) {
        e.preventDefault();
        flag("Restricted key pressed!");
      }
    };

    const flag = (msg) => {
      setViolations(prev => prev + 1);
      setWarningMsg(msg);
    };

    // Attach listeners
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("keydown", handleKeydown);
    // Disable right click (from index.html)
    const disableContext = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableContext);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("contextmenu", disableContext);
      if (document.fullscreenElement) document.exitFullscreen();
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f4f6f8] text-[#333] font-sans select-none">
      
      {/* HEADER (from index.html / style.css) */}
      <header className="bg-[#0a3d62] text-white p-6 text-center shadow-lg">
        <h1 className="text-3xl font-bold">Indian History Quiz</h1>
        <p className="opacity-80">Time: 2 Hours | Total Marks: 50</p>
      </header>

      {/* PROCTORING OVERLAY (from index.html / style.css) */}
      <section className="fixed top-4 right-4 bg-black p-2 rounded-xl shadow-2xl z-50 text-center">
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          className="w-[200px] border-2 border-red-600 rounded-lg"
        />
        <p className="text-white text-[10px] mt-2 font-bold animate-pulse">🔴 Live Proctoring Enabled</p>
        {violations > 0 && (
          <div className="mt-2 text-red-500 text-[10px] font-black uppercase">
            Violations: {violations}
          </div>
        )}
      </section>

      {/* WARNING NOTIFICATION (from proctor.js) */}
      {warningMsg && (
        <div className="bg-red-100 border-b border-red-200 text-red-700 py-3 text-center font-bold sticky top-0 animate-bounce">
          ⚠️ {warningMsg}
        </div>
      )}

      {/* EXAM FORM (from index.html) */}
      <main className="max-w-4xl mx-auto p-8 bg-white my-8 rounded-3xl shadow-sm border border-slate-200">
        <form onSubmit={(e) => { e.preventDefault(); alert("Exam submitted successfully"); onSubmit(); }}>
          
          <h2 className="text-xl font-bold border-b-2 border-[#0a3d62] pb-2 mb-6">Part A: MCQs</h2>
          
          <div className="space-y-6 mb-10">
            {/* Question 1 */}
            <div className="space-y-2">
              <p className="font-bold">1. Who was the first Governor-General of independent India?</p>
              {["Lord Mountbatten", "C. Rajagopalachari", "Dr. Rajendra Prasad", "Jawaharlal Nehru"].map(opt => (
                <label key={opt} className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                  <input type="radio" name="q1" className="w-4 h-4" /> {opt}
                </label>
              ))}
            </div>

            {/* Question 2 */}
            <div className="space-y-2">
              <p className="font-bold">2. Nalanda University was established during?</p>
              {["Maurya", "Gupta", "Mughal", "Chola"].map(opt => (
                <label key={opt} className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                  <input type="radio" name="q2" className="w-4 h-4" /> {opt}
                </label>
              ))}
            </div>
          </div>

          <h2 className="text-xl font-bold border-b-2 border-[#0a3d62] pb-2 mb-6">Part B: Descriptive</h2>
          
          <div className="space-y-4">
            <textarea placeholder="Explain the significance of the Dandi March..." className="w-full h-32 p-4 border rounded-xl outline-none focus:ring-2 focus:ring-[#0a3d62]" />
            <textarea placeholder="Discuss Mauryan economic policies under Ashoka..." className="w-full h-32 p-4 border rounded-xl outline-none focus:ring-2 focus:ring-[#0a3d62]" />
          </div>

          <button 
            type="submit" 
            className="mt-10 w-full bg-[#0a3d62] text-white py-4 rounded-xl font-bold hover:bg-[#062c47] transition-colors uppercase tracking-widest"
          >
            Submit Exam
          </button>
        </form>
      </main>
    </div>
  );
};

export default ExamSession;
