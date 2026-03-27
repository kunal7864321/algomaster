import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, SkipForward, SkipBack } from 'lucide-react';
import { generateArraySteps } from '../algorithms/arrays';

const ArrayVisualizer = () => {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('Reverse (Two Pointers)');
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const ALGORITHMS = ['Reverse (Two Pointers)', 'Sliding Window (Sum)'];

  const generateArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 90) + 10);
    setArray(newArray);
    setCurrentStep(0);
  };

  useEffect(() => {
    generateArray();
  }, [algorithm]);

  useEffect(() => {
    if (array.length > 0) {
      const newSteps = generateArraySteps(array, algorithm, 3); // using k=3 for sliding window
      setSteps(newSteps);
      setCurrentStep(0);
    }
  }, [array, algorithm]);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const displayState = steps.length > 0 ? steps[currentStep] : {
    array: [], pointers: [], swapping: [], window: [], description: 'Ready'
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]/80 backdrop-blur-sm p-6 rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.05)] border border-slate-800/80 relative group">
      
      {/* Controls Header */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-8 pb-6 border-b border-slate-800/60">
        <div className="flex items-center gap-4">
          <select 
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="bg-[#050505] border border-slate-800/80 text-blue-400 py-2.5 px-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/50 font-mono text-sm shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"
          >
            {ALGORITHMS.map(algo => (
              <option key={algo} value={algo}>{algo}</option>
            ))}
          </select>
          
          <button 
            onClick={generateArray}
            className="flex items-center gap-2 bg-slate-900/50 hover:bg-slate-800 text-slate-300 py-2 px-4 rounded-lg transition-all font-mono text-sm border border-slate-800 hover:border-slate-700"
          >
            <RotateCcw size={16} /> REGENERATE
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button 
              onClick={handlePrevStep}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-300 py-2 px-4 rounded-lg transition-all font-mono text-sm disabled:opacity-30 border border-slate-800"
              disabled={currentStep === 0 || steps.length === 0}
            >
              <SkipBack size={16} /> PREV
            </button>
            <button 
              onClick={handleNextStep}
              className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 py-2 px-6 rounded-lg transition-all font-mono text-sm shadow-[0_0_15px_rgba(59,130,246,0.2)] disabled:opacity-30 border border-blue-500/30"
              disabled={steps.length === 0 || currentStep >= steps.length - 1}
            >
              NEXT <SkipForward size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Info & Stats */}
      <div className="flex justify-between items-start mb-6 px-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-800 shadow-[0_0_8px_rgba(0,0,0,0.5)]"></div>
              <span className="text-xs font-mono text-slate-500">Default</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
              <span className="text-xs font-mono text-slate-500">Active</span>
            </div>
            {algorithm === 'Reverse (Two Pointers)' && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                <span className="text-xs font-mono text-slate-500">Swapping</span>
              </div>
            )}
            {algorithm === 'Sliding Window (Sum)' && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
                <span className="text-xs font-mono text-slate-500">In Window</span>
              </div>
            )}
          </div>
          
          <div className="text-sm font-mono text-blue-400 bg-blue-900/10 border border-blue-500/20 py-2.5 px-4 rounded-lg inline-block max-w-2xl shadow-[inset_0_0_15px_rgba(59,130,246,0.05)]">
            &gt; {displayState.description}
          </div>
        </div>
        
        {steps.length > 0 && (
          <div className="text-xs font-mono text-slate-400 bg-[#050505] py-1.5 px-3 rounded border border-slate-800/80 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] mt-2">
            STEP [{currentStep + 1}/{steps.length}]
          </div>
        )}
      </div>

      {/* Visualization Area */}
      <div className="flex-1 flex items-center justify-center gap-3 mt-4 px-4 min-h-[300px] flex-wrap content-center">
        {displayState.array.map((value, index) => {
          let isPointer = displayState.pointers && displayState.pointers.includes(index);
          let isSwapping = displayState.swapping && displayState.swapping.includes(index);
          let isInWindow = displayState.window && displayState.window.includes(index);

          let bgColor = 'bg-[#050505]';
          let borderColor = 'border-slate-800';
          let textColor = 'text-slate-500';
          let shadow = 'shadow-[0_0_10px_rgba(0,0,0,0.5)]';
          let yOffset = 0;
          let scale = 1;

          if (isSwapping) {
            bgColor = 'bg-red-950/40';
            borderColor = 'border-red-500';
            textColor = 'text-red-400';
            shadow = 'shadow-[0_0_20px_rgba(239,68,68,0.4)]';
            yOffset = -15;
            scale = 1.1;
          } else if (isInWindow) {
            bgColor = 'bg-purple-950/40';
            borderColor = 'border-purple-500';
            textColor = 'text-purple-400';
            shadow = 'shadow-[0_0_20px_rgba(168,85,247,0.4)]';
            scale = 1.05;
          } else if (isPointer) {
            bgColor = 'bg-blue-950/40';
            borderColor = 'border-blue-500';
            textColor = 'text-blue-400';
            shadow = 'shadow-[0_0_20px_rgba(59,130,246,0.4)]';
            yOffset = -10;
            scale = 1.05;
          }

          return (
            <motion.div
              key={index}
              layout
              animate={{ y: yOffset, scale: scale }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl border font-mono text-lg font-bold transition-colors duration-300 ${bgColor} ${borderColor} ${textColor} ${shadow}`}
            >
              {value}
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};

export default ArrayVisualizer;
