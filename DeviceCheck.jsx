import React, { useState, useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import { ArrowLeft, Camera, Mic, CheckCircle, ShieldCheck, Scan, XCircle, RefreshCw } from 'lucide-react';

const DeviceCheck = ({ onBack, onStartExam }) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [micLevel, setMicLevel] = useState(0);
  const [cameraStatus, setCameraStatus] = useState('pending'); // 'pending', 'testing', 'verified', 'failed'
  const [micStatus, setMicStatus] = useState('pending');
  const [scanProgress, setScanProgress] = useState(0);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  // Load AI Models and Camera Stream on mount
  useEffect(() => {
    const loadAssets = async () => {
      try {
        const MODEL_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
        ]);
        setModelsLoaded(true);

        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(mediaStream);
        if (videoRef.current) videoRef.current.srcObject = mediaStream;
        setupAudioAnalysis(mediaStream);
      } catch (err) {
        console.error("Initialization error:", err);
        setCameraStatus('failed');
      }
    };
    loadAssets();
    return () => stream?.getTracks().forEach(track => track.stop());
  }, []);

  // 🎙️ Manual Mic Test (Restored Strict Check)
  const handleMicTest = () => {
    setMicStatus('testing');
    setTimeout(() => {
      // Must be picking up sound to verify
      if (micLevel > 1.5) {
        setMicStatus('verified');
      } else {
        setMicStatus('pending');
        alert("Microphone check failed. Please speak clearly into the mic.");
      }
    }, 2500);
  };

  // 📷 Manual Camera Test (Restored AI Scanning Features)
  const handleCameraTest = async () => {
    if (!modelsLoaded) return alert("AI Models are still loading...");
    
    setCameraStatus('testing');
    setScanProgress(0);
    
    let currentProgress = 0;
    let faceDetectedDuringScan = false;

    const interval = setInterval(async () => {
      currentProgress += 5;
      setScanProgress(currentProgress);

      // Perform AI detection on the current frame
      const detection = await faceapi.detectSingleFace(
        videoRef.current, 
        new faceapi.TinyFaceDetectorOptions()
      );

      if (detection) faceDetectedDuringScan = true;

      if (currentProgress >= 100) {
        clearInterval(interval);
        
        // Only verify if a face was detected at least once during the scan
        if (faceDetectedDuringScan) {
          setCameraStatus('verified');
        } else {
          setCameraStatus('failed');
          setScanProgress(0);
        }
      }
    }, 150); 
  };

  const setupAudioAnalysis = (mediaStream) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(mediaStream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const updateLevel = () => {
      analyser.getByteFrequencyData(dataArray);
      setMicLevel(dataArray.reduce((a, b) => a + b) / dataArray.length);
      requestAnimationFrame(updateLevel);
    };
    updateLevel();
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-10 px-4 bg-[#0f172a]">
      {/* 🔙 Navigation */}
      <div className="w-full max-w-2xl mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white uppercase font-black text-xs group">
          <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-blue-600 transition-all">
            <ArrowLeft className="w-4 h-4 text-white" />
          </div>
          Back
        </button>
      </div>

      <div className="bg-[#1e293b] w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-slate-700 p-10">
        <h2 className="text-4xl font-black text-white text-center italic mb-2 tracking-tighter">Pre-Exam Verification</h2>
        <p className="text-center font-bold uppercase text-[10px] mb-8" style={{ color: '#000000' }}>
          Complete manual hardware checks to proceed
        </p>

        {/* 📷 Viewport with restored AI Scan Overlay */}
        <div className="w-full aspect-video bg-black rounded-[2rem] mb-8 relative overflow-hidden border-2 border-slate-600">
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
          
          {/* Restored Scanning Animation */}
          {cameraStatus === 'testing' && (
            <div className="absolute inset-0 bg-blue-500/20 flex flex-col items-center justify-center backdrop-blur-[2px] z-20">
              <div className="w-48 h-60 border-2 border-dashed border-blue-400 rounded-[3rem] animate-pulse relative">
                {/* Restored Laser Scan Line */}
                <div className="absolute top-0 w-full h-1 bg-blue-400 shadow-[0_0_20px_#60a5fa] animate-scan" />
              </div>
              <div className="mt-6 flex flex-col items-center">
                <Scan className="w-8 h-8 text-blue-400 animate-spin-slow mb-2" />
                <span className="text-blue-400 font-black text-sm tracking-[0.3em]">
                  AI SCANNING: {scanProgress}%
                </span>
              </div>
            </div>
          )}

          {cameraStatus === 'failed' && (
            <div className="absolute inset-0 bg-red-900/80 flex flex-col items-center justify-center z-30 animate-in fade-in">
              <XCircle className="text-white w-16 h-16 mb-4" />
              <span className="text-white font-black uppercase text-lg mb-4">Face Not Detected</span>
              <button 
                onClick={() => setCameraStatus('pending')} 
                className="bg-white text-red-900 px-6 py-2 rounded-full font-black text-xs flex items-center gap-2 hover:bg-gray-200 transition-all"
              >
                <RefreshCw className="w-4 h-4" /> Try Again
              </button>
            </div>
          )}

          {cameraStatus === 'verified' && (
            <div className="absolute top-6 right-6 z-30 bg-green-500 rounded-full p-2 shadow-[0_0_20px_rgba(34,197,94,0.5)] animate-in zoom-in">
              <CheckCircle className="text-white w-8 h-8" />
            </div>
          )}
        </div>

        {/* 🛠️ Manual Controls */}
        <div className="space-y-4 mb-10">
          {/* Camera Row */}
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${cameraStatus === 'verified' ? 'bg-green-500/20' : 'bg-blue-500/10'}`}>
                <Camera className={`${cameraStatus === 'verified' ? 'text-green-500' : 'text-blue-500'} w-6 h-6`} />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">Camera Check</h4>
                <p className="text-[10px]" style={{ color: '#000000' }}>AI Face Detection Required</p>
              </div>
            </div>
            {cameraStatus === 'verified' ? (
              <div className="flex items-center gap-2">
                <span className="text-green-500 font-black text-xs tracking-widest uppercase">Verified</span>
                <CheckCircle className="text-green-500 w-5 h-5" />
              </div>
            ) : (
              <button 
                onClick={handleCameraTest} 
                disabled={cameraStatus === 'testing'}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-xs font-black transition-all"
              >
                {cameraStatus === 'testing' ? 'Scanning...' : 'Test Camera'}
              </button>
            )}
          </div>

          {/* Microphone Row */}
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${micStatus === 'verified' ? 'bg-green-500/20' : 'bg-blue-500/10'}`}>
                <Mic className={`${micStatus === 'verified' ? 'text-green-500' : 'text-blue-500'} w-6 h-6`} />
              </div>
              <div className="flex-1 min-w-[120px]">
                <h4 className="text-white font-bold text-lg mb-2">Microphone Check</h4>
                <div className="flex gap-1 h-1.5">
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-3 rounded-full transition-all duration-75 ${micLevel > i * 8 ? 'bg-blue-500 shadow-[0_0_8px_#3b82f6]' : 'bg-slate-800'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
            {micStatus === 'verified' ? (
              <div className="flex items-center gap-2">
                <span className="text-green-500 font-black text-xs tracking-widest uppercase">Verified</span>
                <CheckCircle className="text-green-500 w-5 h-5" />
              </div>
            ) : (
              <button 
                onClick={handleMicTest} 
                disabled={micStatus === 'testing'}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-xs font-black"
              >
                {micStatus === 'testing' ? 'Testing...' : 'Test Mic'}
              </button>
            )}
          </div>
        </div>

        {/* Start Button */}
        <button 
          onClick={onStartExam}
          disabled={cameraStatus !== 'verified' || micStatus !== 'verified'}
          className="w-full py-5 rounded-full font-black text-xl bg-green-600 text-white disabled:bg-slate-700 disabled:text-slate-500 transition-all uppercase flex items-center justify-center gap-3 shadow-xl"
        >
          <ShieldCheck className="w-6 h-6" />
          {cameraStatus === 'verified' && micStatus === 'verified' ? 'Start Exam Session' : 'Hardware Not Verified'}
        </button>
      </div>
      
      {/* Styles for the scan animation */}
      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          position: absolute;
          animation: scan 2s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default DeviceCheck;