import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, SkipForward, SkipBack, Search } from 'lucide-react';
import { generateSearchingSteps } from '../algorithms/searching';

const SearchingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState(0);
  const [algorithm, setAlgorithm] = useState('Linear Search');
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const ALGORITHMS = ['Linear Search', 'Binary Search'];

  const generateArray = () => {
    // Binary Search requires sorted array
    let newArray = Array.from({ length: 30 }, () => Math.floor(Math.random() * 90) + 10);
    if (algorithm === 'Binary Search') {
      newArray.sort((a, b) => a - b);
    }
    setArray(newArray);
    
    // Pick a random target from the array, or occasionally a number not in array
    const shouldExist = Math.random() > 0.2;
    if (shouldExist) {
      setTarget(newArray[Math.floor(Math.random() * newArray.length)]);
    } else {
      setTarget(Math.floor(Math.random() * 90) + 10);
    }
  };

  useEffect(() => {
    generateArray();
  }, [algorithm]); // re-generate when changing to/from Binary Search so it sorts if needed

  useEffect(() => {
    if (array.length > 0) {
      const newSteps = generateSearchingSteps(array, target, algorithm);
      setSteps(newSteps);
      setCurrentStep(0);
    }
  }, [array, target, algorithm]);

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
    array, currentIndex: null, left: null, right: null, mid: null, foundIndex: null, action: 'Ready'
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
      
      {/* Controls Header */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <select 
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
          >
            {ALGORITHMS.map(algo => (
              <option key={algo} value={algo}>{algo}</option>
            ))}
          </select>
          
          <button 
            onClick={generateArray}
            className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 py-2 px-4 rounded-lg transition-colors font-medium"
          >
            <RotateCcw size={18} /> Generate New Array
          </button>

          <div className="flex items-center gap-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 py-2 px-4 rounded-lg font-bold border border-cyan-200 dark:border-cyan-800">
            <Search size={18} /> Target: {target}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button 
              onClick={handlePrevStep}
              className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 py-2 px-4 rounded-lg transition-colors font-medium disabled:opacity-50"
              disabled={currentStep === 0 || steps.length === 0}
            >
              <SkipBack size={18} /> Previous
            </button>
            <button 
              onClick={handleNextStep}
              className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-6 rounded-lg transition-colors font-medium shadow-sm disabled:opacity-50"
              disabled={steps.length === 0 || currentStep >= steps.length - 1}
            >
              Next <SkipForward size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Info & Stats */}
      <div className="flex justify-between items-start mb-6 px-4">
        <div className="flex flex-col gap-3">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-slate-400 bg-white dark:bg-slate-800"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Unchecked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-yellow-400 bg-yellow-100 dark:bg-yellow-900/30"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Current/Mid</span>
            </div>
            {algorithm === 'Binary Search' && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border-2 border-purple-500 bg-purple-100 dark:bg-purple-900/30"></div>
                <span className="text-sm text-slate-600 dark:text-slate-400">Left/Right Bounds</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-emerald-500 bg-emerald-100 dark:bg-emerald-900/30"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Found</span>
            </div>
          </div>
          
          <div className="text-sm font-medium text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 py-2 px-4 rounded-md inline-block">
            {displayState.action}
          </div>
        </div>
        
        {steps.length > 0 && (
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 py-1 px-3 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm mt-2">
            Step: {currentStep + 1} / {steps.length}
          </div>
        )}
      </div>

      {/* Visualization Area */}
      <div className="flex-1 flex items-center justify-center gap-2 mt-4 px-4 min-h-[300px] flex-wrap content-center">
        {displayState.array.map((value, index) => {
          let isCurrent = displayState.currentIndex === index || displayState.mid === index;
          let isBound = displayState.left === index || displayState.right === index;
          let isFound = displayState.foundIndex === index;
          let isOutOfBounds = displayState.left !== null && (index < displayState.left || index > displayState.right);

          let bgColor = 'bg-white dark:bg-slate-800';
          let borderColor = 'border-slate-300 dark:border-slate-700';
          let textColor = 'text-slate-700 dark:text-slate-300';
          let scale = 1;
          let opacity = isOutOfBounds ? 0.3 : 1;

          if (isFound) {
            bgColor = 'bg-emerald-100 dark:bg-emerald-900/40';
            borderColor = 'border-emerald-500';
            textColor = 'text-emerald-700 dark:text-emerald-400';
            scale = 1.1;
          } else if (isCurrent) {
            bgColor = 'bg-yellow-100 dark:bg-yellow-900/40';
            borderColor = 'border-yellow-400';
            textColor = 'text-yellow-700 dark:text-yellow-400';
            scale = 1.1;
          } else if (isBound) {
            bgColor = 'bg-purple-100 dark:bg-purple-900/40';
            borderColor = 'border-purple-500';
            textColor = 'text-purple-700 dark:text-purple-400';
          }

          return (
            <motion.div
              key={index}
              layout
              animate={{ scale, opacity }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg border-2 font-bold shadow-sm transition-colors duration-300 ${bgColor} ${borderColor} ${textColor}`}
            >
              {value}
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};

export default SearchingVisualizer;
