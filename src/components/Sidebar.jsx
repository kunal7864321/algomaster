import React from 'react';
import { ChevronRight, Database, GitMerge, Search, Share2, Network, FunctionSquare, Braces, Layers } from 'lucide-react';

const Sidebar = ({ topics, activeTopicId, onSelectTopic, className = '' }) => {
  // Group topics by category (simplified for now, using icons based on id)
  
  const getIcon = (id) => {
    switch(id) {
      case 'arrays': return <Database size={18} />;
      case 'sorting': return <GitMerge size={18} />;
      case 'searching': return <Search size={18} />;
      case 'trees': return <Share2 size={18} />;
      case 'graphs': return <Network size={18} />;
      case 'dp': return <FunctionSquare size={18} />;
      case 'strings': return <Braces size={18} />;
      case 'stacks': return <Layers size={18} />;
      default: return <ChevronRight size={18} />;
    }
  };

  return (
    <aside className={`w-64 bg-white/95 dark:bg-[#080808]/95 backdrop-blur-md border-r border-slate-200 dark:border-slate-800/60 flex flex-col h-full overflow-y-auto shrink-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.2)] ${className}`}>
      <div className="p-4 border-b border-slate-200 dark:border-slate-800/60">
        <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono">
          System Modules
        </h2>
      </div>
      
      <nav className="flex-1 p-3 space-y-1">
        {topics.map((topic) => {
          const isActive = activeTopicId === topic.id;
          
          return (
            <button
              key={topic.id}
              onClick={() => onSelectTopic(topic.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 relative group ${
                isActive 
                  ? 'bg-blue-50/50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200/50 dark:border-blue-500/20 shadow-[inset_0_0_12px_rgba(59,130,246,0.05)]' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-slate-300 border border-transparent'
              }`}
            >
              <div className={`transition-transform duration-300 ${isActive ? 'text-blue-600 dark:text-blue-400 scale-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300'}`}>
                {getIcon(topic.id)}
              </div>
              <span className="truncate font-sans">{topic.title}</span>
              {isActive && (
                <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
              )}
            </button>
          );
        })}
      </nav>
      
    </aside>
  );
};

export default Sidebar;
