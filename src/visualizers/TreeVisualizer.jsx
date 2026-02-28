import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, SkipForward, SkipBack } from 'lucide-react';
import { generateTree, generateTreeTraversalSteps, calculateTreePositions } from '../algorithms/tree';

const TreeVisualizer = () => {
  const [root, setRoot] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [algorithm, setAlgorithm] = useState('Inorder');
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const containerRef = useRef(null);

  const ALGORITHMS = ['Inorder', 'Preorder', 'Postorder', 'Level Order'];

  const initTree = () => {
    const newRoot = generateTree(15);
    setRoot(newRoot);
    setCurrentStep(0);
    
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      const layout = calculateTreePositions(newRoot, width, height - 100);
      setNodes(layout.nodes);
      setEdges(layout.edges);
    }
  };

  useEffect(() => {
    if (root) {
      const newSteps = generateTreeTraversalSteps(root, algorithm);
      setSteps(newSteps);
      setCurrentStep(0);
    }
  }, [root, algorithm]);

  useEffect(() => {
    // Small delay to ensure container is measured correctly
    setTimeout(initTree, 100);
    
    const handleResize = () => {
      if (root && containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const layout = calculateTreePositions(root, width, height - 100);
        setNodes(layout.nodes);
        setEdges(layout.edges);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [root]);

  // If containerRef changes, layout again
  useEffect(() => {
    if (!root && containerRef.current) {
      initTree();
    }
  }, [containerRef]);

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

  const displayState = steps.length > 0 ? steps[currentStep] : { currentNode: null, visited: [], action: 'Ready' };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
      
      {/* Controls Header */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <select 
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
          >
            {ALGORITHMS.map(algo => (
              <option key={algo} value={algo}>{algo}</option>
            ))}
          </select>
          
          <button 
            onClick={initTree}
            className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 py-2 px-4 rounded-lg transition-colors font-medium"
          >
            <RotateCcw size={18} /> Generate New Tree
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
              className="flex items-center gap-2 bg-secondary hover:bg-violet-600 text-white py-2 px-6 rounded-lg transition-colors font-medium shadow-sm disabled:opacity-50"
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
            <div className="w-4 h-4 rounded-full border-2 border-slate-400 bg-white dark:bg-slate-800"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">Unvisited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-yellow-400 bg-yellow-100 dark:bg-yellow-900/30"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">Current</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-emerald-500 bg-emerald-100 dark:bg-emerald-900/30"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">Visited</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="text-sm font-medium text-secondary dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20 py-1 px-3 rounded-md mb-2">
            Action: {displayState.action}
          </div>
          {steps.length > 0 && (
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 py-1 px-3 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
              Step: {currentStep + 1} / {steps.length}
            </div>
          )}
        </div>
      </div>

      {/* Visualization Area */}
      <div 
        ref={containerRef}
        className="flex-1 relative mt-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 overflow-hidden min-h-[400px]"
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {edges.map((edge, i) => (
            <line
              key={i}
              x1={edge.x1}
              y1={edge.y1 + 40} // offset for top padding
              x2={edge.x2}
              y2={edge.y2 + 40}
              stroke="currentColor"
              strokeWidth="2"
              className="text-slate-300 dark:text-slate-700"
            />
          ))}
        </svg>

        {nodes.map((node) => {
          const isCurrent = displayState.currentNode === node.id;
          const isVisited = displayState.visited.includes(node.id);
          
          let bgColor = 'bg-white dark:bg-slate-800';
          let borderColor = 'border-slate-400 dark:border-slate-600';
          let textColor = 'text-slate-700 dark:text-slate-300';
          
          if (isCurrent) {
            bgColor = 'bg-yellow-100 dark:bg-yellow-900/40';
            borderColor = 'border-yellow-400';
            textColor = 'text-yellow-700 dark:text-yellow-400';
          } else if (isVisited) {
            bgColor = 'bg-emerald-100 dark:bg-emerald-900/40';
            borderColor = 'border-emerald-500';
            textColor = 'text-emerald-700 dark:text-emerald-400';
          }

          return (
            <motion.div
              key={node.id}
              initial={false}
              animate={{ 
                scale: isCurrent ? 1.2 : 1,
                boxShadow: isCurrent ? '0 0 15px rgba(250, 204, 21, 0.5)' : '0 0 0px rgba(0,0,0,0)'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`absolute flex items-center justify-center w-10 h-10 -ml-5 -mt-5 rounded-full border-2 font-bold shadow-md z-10 transition-colors duration-300 ${bgColor} ${borderColor} ${textColor}`}
              style={{ left: node.x, top: node.y + 40 }}
            >
              {node.value}
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};

export default TreeVisualizer;
