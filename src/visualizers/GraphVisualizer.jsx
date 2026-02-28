import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, SkipForward, SkipBack } from 'lucide-react';
import { generateGraph, generateGraphTraversalSteps } from '../algorithms/graph';

const GraphVisualizer = () => {
  const [graph, setGraph] = useState(null);
  const [algorithm, setAlgorithm] = useState('BFS');
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const ALGORITHMS = ['BFS', 'DFS', 'Dijkstra'];

  const initGraph = () => {
    // Generate 7 nodes, 10 edges
    const newGraph = generateGraph(7, 10);
    setGraph(newGraph);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (graph) {
      const newSteps = generateGraphTraversalSteps(graph, algorithm, 0);
      setSteps(newSteps);
      setCurrentStep(0);
    }
  }, [graph, algorithm]);

  useEffect(() => {
    initGraph();
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
    currentNode: null, 
    visitingNeighbor: null,
    visited: [], 
    processedEdges: [],
    description: 'Ready',
    distances: []
  };

  // Helper to determine if an edge is active or processed
  const isEdgeProcessed = (source, target) => {
    if (!displayState.processedEdges) return false;
    return displayState.processedEdges.some(
      e => (e.source === source && e.target === target) || (e.source === target && e.target === source)
    );
  };

  const isEdgeActive = (source, target) => {
    if (displayState.currentNode === null || displayState.visitingNeighbor === null) return false;
    return (displayState.currentNode === source && displayState.visitingNeighbor === target) ||
           (displayState.currentNode === target && displayState.visitingNeighbor === source);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
      
      {/* Controls Header */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <select 
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 font-medium"
          >
            {ALGORITHMS.map(algo => (
              <option key={algo} value={algo}>{algo}</option>
            ))}
          </select>
          
          <button 
            onClick={initGraph}
            className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 py-2 px-4 rounded-lg transition-colors font-medium"
          >
            <RotateCcw size={18} /> Generate New Graph
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
              className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded-lg transition-colors font-medium shadow-sm disabled:opacity-50"
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
          
          <div className="text-sm font-medium text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20 py-2 px-4 rounded-md max-w-lg">
            {displayState.description}
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          {steps.length > 0 && (
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 py-1 px-3 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
              Step: {currentStep + 1} / {steps.length}
            </div>
          )}
          
          {algorithm === 'Dijkstra' && displayState.distances && (
            <div className="text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700 mt-2 max-w-xs max-h-24 overflow-y-auto">
              <div className="font-semibold mb-1">Distances:</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {displayState.distances.map((dist, i) => (
                  <div key={i}>Node {i}: {dist === Infinity ? '∞' : dist}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Visualization Area */}
      <div className="flex-1 relative mt-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 overflow-hidden min-h-[400px]">
        {graph && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Draw default edges first */}
            {graph.edges.map((edge, i) => {
              const sourceNode = graph.nodes.find(n => n.id === edge.source);
              const targetNode = graph.nodes.find(n => n.id === edge.target);
              
              if (!sourceNode || !targetNode) return null;
              
              const isProcessed = isEdgeProcessed(edge.source, edge.target);
              const isActive = isEdgeActive(edge.source, edge.target);
              
              let strokeClass = "text-slate-200 dark:text-slate-700";
              let strokeWidth = 2;
              
              if (isActive) {
                strokeClass = "text-yellow-400";
                strokeWidth = 4;
              } else if (isProcessed) {
                strokeClass = "text-pink-500";
                strokeWidth = 3;
              }

              // Calculate midpoint for weight text
              const midX = (sourceNode.x + targetNode.x) / 2;
              const midY = (sourceNode.y + targetNode.y) / 2;

              return (
                <g key={`edge-${i}`}>
                  <line
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    className={`transition-colors duration-300 ${strokeClass}`}
                  />
                  {algorithm === 'Dijkstra' && (
                    <text
                      x={midX}
                      y={midY - 10}
                      fill="currentColor"
                      textAnchor="middle"
                      className="text-xs font-semibold text-slate-500 dark:text-slate-400"
                    >
                      {edge.weight}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        )}

        {/* Draw Nodes */}
        {graph && graph.nodes.map((node) => {
          const isCurrent = displayState.currentNode === node.id;
          const isNeighbor = displayState.visitingNeighbor === node.id;
          const isVisited = displayState.visited.includes(node.id);
          
          let bgColor = 'bg-white dark:bg-slate-800';
          let borderColor = 'border-slate-400 dark:border-slate-600';
          let textColor = 'text-slate-700 dark:text-slate-300';
          
          if (isCurrent) {
            bgColor = 'bg-yellow-100 dark:bg-yellow-900/40';
            borderColor = 'border-yellow-400';
            textColor = 'text-yellow-700 dark:text-yellow-400';
          } else if (isNeighbor) {
            bgColor = 'bg-pink-100 dark:bg-pink-900/40';
            borderColor = 'border-pink-400';
            textColor = 'text-pink-700 dark:text-pink-400';
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
                scale: isCurrent || isNeighbor ? 1.2 : 1,
                boxShadow: isCurrent ? '0 0 15px rgba(250, 204, 21, 0.5)' : 
                          isNeighbor ? '0 0 15px rgba(244, 114, 182, 0.5)' : '0 0 0px rgba(0,0,0,0)'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`absolute flex items-center justify-center w-12 h-12 -ml-6 -mt-6 rounded-full border-2 font-bold shadow-md z-10 transition-colors duration-300 ${bgColor} ${borderColor} ${textColor}`}
              style={{ left: node.x, top: node.y }}
            >
              {node.id}
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};

export default GraphVisualizer;
