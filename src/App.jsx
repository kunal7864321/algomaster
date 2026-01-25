import React, { useState, useEffect } from 'react';
import { Moon, Sun, Code, Menu, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import TopicPage from './pages/TopicPage';
import { topics } from './data/topics';

function App() {
  const [activeTopicId, setActiveTopicId] = useState(topics[1].id); // Default to sorting
  const [darkMode, setDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const activeTopic = topics.find(t => t.id === activeTopicId) || topics[0];

  const handleSelectTopic = (id) => {
    setActiveTopicId(id);
    setIsSidebarOpen(false); // Close mobile sidebar on select
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-[#050505] transition-colors duration-300 font-sans overflow-hidden relative">
      
      {/* Abstract Tech Background Elements (Dark Mode Only) */}
      <div className="absolute inset-0 z-0 hidden dark:block bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Top Navbar */}
      <nav className="bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/60 shrink-0 z-30 relative shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        {/* Subtle top glow line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent dark:via-blue-500/50"></div>
        
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50 md:hidden"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-400/20">
                  <span className="font-mono text-sm">&lt;/&gt;</span>
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-400 tracking-tight font-mono">
                  ALGOMASTER
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/80 transition-colors"
                title="Toggle Dark Mode"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <a
                href="#"
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/80 transition-colors hidden sm:block"
                title="GitHub Repo"
              >
                <Code size={18} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Desktop Sidebar */}
        <Sidebar 
          topics={topics} 
          activeTopicId={activeTopicId} 
          onSelectTopic={handleSelectTopic} 
          className="hidden md:flex"
        />

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-20 md:hidden flex">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
            <div className="relative w-64 bg-white dark:bg-slate-900 h-full flex flex-col shadow-2xl">
              {/* Reuse Sidebar Component with forced visible prop if we had one, but for now just wrapping it */}
              <div className="flex-1 overflow-y-auto">
                 <Sidebar 
                    topics={topics} 
                    activeTopicId={activeTopicId} 
                    onSelectTopic={handleSelectTopic} 
                 />
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 relative h-full overflow-hidden">
          <TopicPage topic={activeTopic} />
        </main>
      </div>
    </div>
  );
}

export default App;
