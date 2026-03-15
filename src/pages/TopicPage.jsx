import React, { useState } from 'react';
import CodeEditor from '../editor/CodeEditor';
import SortingVisualizer from '../visualizers/SortingVisualizer';
import SearchingVisualizer from '../visualizers/SearchingVisualizer';
import TreeVisualizer from '../visualizers/TreeVisualizer';
import GraphVisualizer from '../visualizers/GraphVisualizer';
import ArrayVisualizer from '../visualizers/ArrayVisualizer';
import { BookOpen, Code2, MonitorPlay, Clock, Database, ChevronRight } from 'lucide-react';

const TopicPage = ({ topic }) => {
  const [activeTab, setActiveTab] = useState('learn');

  // Helper to render appropriate visualizer based on topic
  const renderVisualizer = () => {
    switch(topic.visualizerType) {
      case 'sorting': return <SortingVisualizer />;
      case 'searching': return <SearchingVisualizer />;
      case 'tree': return <TreeVisualizer />;
      case 'graph': return <GraphVisualizer />;
      case 'arrays': return <ArrayVisualizer />;
      default: 
        return (
          <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-slate-500 dark:text-slate-400 p-8 text-center bg-slate-50 dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            <MonitorPlay size={48} className="mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Visualizer coming soon!</h3>
            <p>We are currently building the interactive visualizer for {topic.title}.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50 dark:bg-[#050505] overflow-hidden relative z-10">
      {/* Header Info */}
      <div className="px-6 py-5 bg-white/80 dark:bg-[#080808]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/60 shrink-0 flex justify-between items-start md:items-center flex-col md:flex-row gap-4 relative">
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent dark:via-blue-500/30"></div>
        <div>
          <div className="flex items-center text-[10px] font-mono font-medium text-slate-500 mb-2 uppercase tracking-widest">
            <span className="text-blue-500">SYS.MODULE</span>
            <ChevronRight size={12} className="mx-1" />
            <span className="text-slate-400">{topic.category}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">{topic.title}</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-md text-xs font-mono border border-slate-200 dark:border-slate-700/50 shadow-sm">
            <Clock size={14} className="text-amber-500" /> {topic.timeComplexity}
          </div>
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-md text-xs font-mono border border-slate-200 dark:border-slate-700/50 shadow-sm">
            <Database size={14} className="text-purple-500" /> {topic.spaceComplexity}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 pt-4 bg-white/50 dark:bg-[#080808]/50 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800/60 shrink-0">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab('learn')}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-all flex items-center gap-2 relative ${
              activeTab === 'learn'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            {activeTab === 'learn' && <div className="absolute bottom-0 inset-x-0 h-px bg-blue-400 blur-sm"></div>}
            <BookOpen size={16} /> Concept & Vis
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-all flex items-center gap-2 relative ${
              activeTab === 'practice'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            {activeTab === 'practice' && <div className="absolute bottom-0 inset-x-0 h-px bg-blue-400 blur-sm"></div>}
            <Code2 size={16} /> Code Editor
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-4 md:p-6 relative">
        {activeTab === 'learn' && (
          <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-6 h-full min-h-[600px]">
            {/* Theory Panel */}
            <div className="w-full xl:w-1/3 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 overflow-y-auto relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h2 className="text-sm font-mono font-bold mb-6 text-slate-800 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800/60 pb-3 tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                Documentation
              </h2>
              <div className="prose prose-slate dark:prose-invert prose-sm md:prose-base max-w-none text-slate-600 dark:text-slate-400">
                {/* Fallback simple markdown renderer if ReactMarkdown is not fully styling */}
                {topic.description.split('\n\n').map((para, i) => {
                   if (para.startsWith('**')) {
                     const [title, ...rest] = para.split(':**');
                     return (
                       <p key={i}>
                         <strong className="text-slate-900 dark:text-slate-200 font-medium font-sans">{title.replace('**', '')}:</strong>
                         {rest.join(':**')}
                       </p>
                     );
                   }
                   return <p key={i} className="whitespace-pre-wrap">{para}</p>;
                })}
              </div>
            </div>

            {/* Visualizer Panel */}
            <div className="w-full xl:w-2/3 h-full min-h-[500px] flex flex-col">
              {renderVisualizer()}
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="max-w-7xl mx-auto h-full min-h-[600px] flex flex-col xl:flex-row gap-6">
            {/* Problem Info */}
            <div className="w-full xl:w-1/3 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 overflow-y-auto hidden xl:block">
              <h2 className="text-sm font-mono font-bold mb-4 text-slate-800 dark:text-slate-300 tracking-widest uppercase">
                Task Specification
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 font-sans">
                Implement <span className="text-blue-500">{topic.title}</span> using the provided development environment.
                Standard output will be routed to the integrated console.
              </p>
              
              <div className="bg-slate-50 dark:bg-black/40 p-5 rounded-lg border border-slate-200 dark:border-slate-800/60 relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-lg"></div>
                <h3 className="text-xs font-mono font-bold text-slate-700 dark:text-slate-400 mb-3 uppercase tracking-wider">Execution Pipeline</h3>
                <ul className="list-none text-sm text-slate-600 dark:text-slate-400 space-y-3 font-sans">
                  <li className="flex gap-2 items-start"><span className="text-blue-500 font-mono">01.</span> Write implementation in editor.</li>
                  <li className="flex gap-2 items-start"><span className="text-blue-500 font-mono">02.</span> Use <code>console.log()</code> for STDOUT.</li>
                  <li className="flex gap-2 items-start"><span className="text-blue-500 font-mono">03.</span> Run secure sandbox evaluation.</li>
                  <li className="flex gap-2 items-start"><span className="text-blue-500 font-mono">04.</span> Verify terminal output.</li>
                </ul>
              </div>
            </div>

            {/* Editor (Right side) */}
            <div className="w-full xl:w-2/3 h-[600px] xl:h-full">
              <CodeEditor defaultCode={topic.defaultCode} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicPage;
