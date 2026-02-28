import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, SkipForward, SkipBack } from 'lucide-react';
import { generateSortingSteps } from '../algorithms/sorting';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('Bubble Sort');
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const ALGORITHMS = ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Selection Sort', 'Insertion Sort'];

  const generateArray = () => {
    const newArray = Array.from({ length: 40 }, () => Math.floor(Math.random() * 250) + 10);
    setArray(newArray);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (array.length > 0) {
      const newSteps = generateSortingSteps(array, algorithm);
      setSteps(newSteps);
      setCurrentStep(0);
    }
  }, [array, algorithm]);

  useEffect(() => {
    generateArray();
  }, []);

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
    array,
    comparing: [],
    swapping: [],
    sorted: []
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
      
      {/* Controls Header */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <select 
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-medium"
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
              className="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-colors font-medium shadow-sm disabled:opacity-50"
              disabled={steps.length === 0 || currentStep >= steps.length - 1}
            >
              Next <SkipForward size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Info & Stats */}
      <div className="flex justify-between items-center mb-6 px-4">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-400"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">Unsorted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">Swapping</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">Sorted</span>
          </div>
        </div>
        
        {steps.length > 0 && (
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 py-1 px-3 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
            Step: {currentStep + 1} / {steps.length}
          </div>
        )}
      </div>

      {/* Visualization Area */}
      <div className="flex-1 flex items-end justify-center gap-1 mt-4 px-4 h-64 min-h-[300px]">
        {displayState.array.map((value, index) => {
          let bgColor = 'bg-blue-500 dark:bg-blue-400';
          if (displayState.sorted.includes(index)) {
            bgColor = 'bg-emerald-500';
          } else if (displayState.swapping.includes(index)) {
            bgColor = 'bg-red-500';
          } else if (displayState.comparing.includes(index)) {
            bgColor = 'bg-yellow-400';
          }

          return (
            <motion.div
              key={index}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`w-full rounded-t-md opacity-90 hover:opacity-100 ${bgColor}`}
              style={{ height: `${(value / 300) * 100}%` }}
            >
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};

export default SortingVisualizer;
