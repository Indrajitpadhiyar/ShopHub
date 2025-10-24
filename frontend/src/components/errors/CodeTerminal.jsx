// src/components/errors/CodeTerminalFullScreen.jsx
import React, { useEffect, useState, useRef } from 'react';

const CodeTerminal = () => {
  const [lines, setLines] = useState([]);
  const lineIdRef = useRef(0);
  const animationFrameRef = useRef();

  // Generate random hacker-style code lines (NO external package)
  const generateRandomLine = () => {
    const templates = [
      () => `Initializing neural matrix... ${Math.floor(Math.random() * 100)}%`,
      () => `Bypassing firewall: port ${[80, 443, 8080, 22][Math.floor(Math.random() * 4)]} open`,
      () => `Decrypting stack trace... ${Math.floor(Math.random() * 100)}%`,
      () => `Patching memory leak at 0x${Math.random().toString(16).substr(2, 8).toUpperCase()}`,
      () => `Recompiling JSX → ${['React', 'Vue', 'Svelte'][Math.floor(Math.random() * 3)]} v${Math.random().toFixed(2)}`,
      () => `Optimizing render pipeline... ${Math.floor(Math.random() * 50) + 50} FPS`,
      () => `Clearing cache: ${(Math.random() * 5).toFixed(1)}GB freed`,
      () => `Injecting hotfix v${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 9)}.${Math.floor(Math.random() * 99)}`,
      () => `Runtime stabilized. Resuming execution...`,
      () => `System restored. All green.`,
      () => `Scanning node_modules... ${Math.floor(Math.random() * 5000)} packages`,
      () => `Compiling Tailwind CSS... ${Math.floor(Math.random() * 300)}ms`,
      () => `Bundling with Vite... ${Math.floor(Math.random() * 200)}ms`,
      () => `Deploying to Vercel... OK`,
      () => `WebSocket connected: wss://api.error-fix.live`,
      () => `useEffect cleanup complete`,
      () => `Redux store hydrated`,
      () => `Three.js scene initialized`,
      () => `FBX model loaded: Zezeanimeupload.fbx`,
      () => `Texture applied: diffuse, normal, ao`,
    ];

    const commands = [
      'npm run dev',
      'git commit -m "fix: error 404"',
      'docker build -t error-fix .',
      'curl -X POST https://api.repair.ai/fix',
      'rm -rf node_modules && npm install',
      'echo "System fixed!" > /dev/stdout',
    ];

    const random = Math.random();
    if (random < 0.6) {
      return templates[Math.floor(Math.random() * templates.length)]();
    } else if (random < 0.8) {
      return `<span class="text-yellow-400">$</span> ${commands[Math.floor(Math.random() * commands.length)]}`;
    } else {
      return `<span class="text-red-400">ERROR:</span> Failed to resolve dependency`;
    }
  };

  // Ultra-fast, infinite log using requestAnimationFrame
  useEffect(() => {
    let lastTime = 0;
    const targetFPS = 60;
    const interval = 1000 / targetFPS;

    const addLine = (timestamp) => {
      if (timestamp - lastTime >= 250) { // New line every ~250ms
        const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const text = generateRandomLine();

        setLines(prev => {
          const newLine = { id: lineIdRef.current++, text, time };
          return [newLine, ...prev].slice(0, 30); // Max 30 lines
        });

        lastTime = timestamp;
      }

      animationFrameRef.current = requestAnimationFrame(addLine);
    };

    animationFrameRef.current = requestAnimationFrame(addLine);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Auto-reload after 15 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload();
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  // F5 to reload
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'F5') {
        e.preventDefault();
        window.location.reload();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="fixed inset-0 bg-black text-gray-100 overflow-hidden font-mono text-sm">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 text-xs leading-tight animate-fall"
            style={{
              left: `${i * 2.5}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              fontFamily: 'monospace',
            }}
          >
            {Array.from({ length: 25 }, () => 
              String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))
            ).join('')}
          </div>
        ))}
      </div>

      {/* Terminal */}
      <div className="relative h-full flex flex-col p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 select-none">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-400">root@error-fix:~#</span>
          <div className="ml-auto text-xs text-gray-500">
            {new Date().toLocaleString()}
          </div>
        </div>

        {/* Log Output */}
        <div className="flex-1 overflow-y-auto space-y-1">
          <div className="text-cyan-400 font-bold">/// SYSTEM RECOVERY MODE ///</div>
          <div className="text-lime-400">┌{'─'.repeat(60)}┐</div>

          {lines.map(line => (
            <div
              key={line.id}
              className="text-green-300"
              dangerouslySetInnerHTML={{ __html: `<span class="text-gray-500">[${line.time}]</span> → ${line.text}` }}
            />
          ))}

          {/* Live Cursor */}
          <div className="flex items-center mt-2">
            <span className="text-green-400">root@debug</span>
            <span className="text-gray-500">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-gray-500">$</span>{' '}
            <span className="animate-pulse text-green-400">█</span>
          </div>

          <div className="text-lime-400">└{'─'.repeat(60)}┘</div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>
            Press <kbd className="px-2 py-1 bg-gray-800 rounded mx-1">F5</kbd> to retry • 
            Auto-reloading in <span className="text-yellow-400">15s</span>...
          </p>
        </div>
      </div>

      {/* CSS */}
      <style jsx>{`
        @keyframes fall {
          from { transform: translateY(-100%); opacity: 1; }
          to { transform: translateY(120vh); opacity: 0; }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CodeTerminal;