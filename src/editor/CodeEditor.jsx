import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Terminal, RotateCcw } from 'lucide-react';

const CodeEditor = ({ defaultCode }) => {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  // Update local code when default code changes (e.g., switching topics)
  useEffect(() => {
    setCode(defaultCode);
    setOutput([]);
  }, [defaultCode]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput([]);
    
    // Create a sandbox execution environment capturing console.log
    const logs = [];
    const originalConsoleLog = console.log;
    
    console.log = (...args) => {
      logs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
      // Optionally keep original logging for debugging
      // originalConsoleLog(...args);
    };

    try {
      // Create an async function from the code string
      const executeFn = new Function(`
        return (async () => {
          ${code}
        })();
      `);
      
      await executeFn();
      
      if (logs.length === 0) {
        logs.push('Execution finished. No output.');
      }
      
      setOutput(logs);
    } catch (err) {
      setOutput([`Error: ${err.message}`]);
    } finally {
      // Restore console.log
      console.log = originalConsoleLog;
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(defaultCode);
    setOutput([]);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-xl">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-slate-400" />
          <span className="text-sm font-semibold text-slate-200">JavaScript Playground</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-md transition-colors"
          >
            <RotateCcw size={14} /> Reset
          </button>
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-white bg-green-600 hover:bg-green-500 rounded-md transition-colors disabled:opacity-50"
          >
            <Play size={14} /> {isRunning ? 'Running...' : 'Run Code'}
          </button>
        </div>
      </div>

      {/* Monaco Editor Container */}
      <div className="flex-1 w-full relative">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
          }}
        />
      </div>

      {/* Output Console */}
      <div className="h-48 bg-slate-950 border-t border-slate-700 flex flex-col">
        <div className="px-4 py-1 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400">
          Output
        </div>
        <div className="flex-1 p-4 overflow-auto font-mono text-sm text-slate-300">
          {output.length > 0 ? (
            output.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap mb-1">
                <span className="text-green-400 select-none mr-2">{'>'}</span>
                <span className={line.startsWith('Error:') ? 'text-red-400' : ''}>{line}</span>
              </div>
            ))
          ) : (
            <div className="text-slate-600 italic select-none">Click 'Run Code' to see output here...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
