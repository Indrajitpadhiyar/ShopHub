import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// 3D Robot Character
const Robot = () => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={meshRef}>
                {/* Head */}
                <mesh position={[0, 1.2, 0]}>
                    <boxGeometry args={[1, 0.8, 1]} />
                    <meshStandardMaterial color="#4f46e5" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Eyes */}
                <mesh position={[-0.2, 1.3, 0.5]}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
                </mesh>
                <mesh position={[0.2, 1.3, 0.5]}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
                </mesh>
                {/* Body */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[1.2, 1, 0.8]} />
                    <meshStandardMaterial color="#6366f1" metalness={0.7} roughness={0.3} />
                </mesh>
                {/* Arms */}
                <mesh position={[-0.8, 0, 0]}>
                    <boxGeometry args={[0.3, 1, 0.3]} />
                    <meshStandardMaterial color="#4f46e5" />
                </mesh>
                <mesh position={[0.8, 0, 0]}>
                    <boxGeometry args={[0.3, 1, 0.3]} />
                    <meshStandardMaterial color="#4f46e5" />
                </mesh>
                {/* Legs */}
                <mesh position={[-0.3, -1, 0]}>
                    <boxGeometry args={[0.3, 0.8, 0.3]} />
                    <meshStandardMaterial color="#6366f1" />
                </mesh>
                <mesh position={[0.3, -1, 0]}>
                    <boxGeometry args={[0.3, 0.8, 0.3]} />
                    <meshStandardMaterial color="#6366f1" />
                </mesh>
            </group>
        </Float>
    );
};

// Code Typing Effect Component
const CodeTyper = () => {
    const codeLines = [
        "Initializing bug scanner...",
        "Detecting error in module: UI-404",
        "Running fix protocol v3.1",
        "Patching render loop...",
        "Recompiling shaders...",
        "Optimizing memory allocation...",
        "Bugs eliminated: 99.9%",
        "System restored. Ready to retry."
    ];

    const [displayedCode, setDisplayedCode] = useState([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [currentChar, setCurrentChar] = useState(0);

    useEffect(() => {
        if (currentLine >= codeLines.length) return;

        const timer = setTimeout(() => {
            if (currentChar < codeLines[currentLine].length) {
                setCurrentChar(prev => prev + 1);
            } else {
                setDisplayedCode(prev => [...prev, codeLines[currentLine]]);
                setCurrentLine(prev => prev + 1);
                setCurrentChar(0);
            }
        }, currentChar === 0 ? 800 : 50);

        return () => clearTimeout(timer);
    }, [currentChar, currentLine]);

    return (
        <div className="font-mono text-xs md:text-sm text-green-400 leading-tight">
            {displayedCode.map((line, i) => (
                <div key={i}>{line}</div>
            ))}
            {currentLine < codeLines.length && (
                <div>
                    {codeLines[currentLine].substring(0, currentChar)}
                    <span className="animate-pulse">|</span>
                </div>
            )}
        </div>
    );
};

// Main Error Page
const ErrorPage = () => {
    const [glitchMode, setGlitchMode] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setGlitchMode(false), 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-black text-white">
            {/* Glitch Red Screen (First 4 seconds) */}
            {glitchMode && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-red-900 animate-pulse">
                    <div className="text-center">
                        <h1 className="text-6xl md:text-8xl font-bold text-red-300 tracking-wider animate-flicker">
                            SYSTEM ERROR
                        </h1>
                        <p className="text-xl md:text-2xl text-red-200 mt-4 font-mono">
                            Critical failure detected...
                        </p>
                    </div>
                </div>
            )}

            {/* 3D Scene Background */}
            <div className="absolute inset-0 z-0">
                <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} color="#6366f1" />
                    <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ec4899" />

                    {/* Robot */}
                    <Robot />

                    {/* Floating Code Particles */}
                    {[...Array(6)].map((_, i) => (
                        <Float key={i} speed={1 + i * 0.5} floatIntensity={2}>
                            <Text
                                position={[Math.random() * 10 - 5, Math.random() * 5 - 2.5, -2]}
                                fontSize={0.3}
                                color="#10b981"
                                anchorX="center"
                                anchorY="middle"
                            >
                                {'{error: null}'}
                            </Text>
                        </Float>
                    ))}

                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>

            {/* Terminal Overlay */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-8">
                <div className="max-w-2xl mx-auto bg-black/80 backdrop-blur-md border border-green-500/50 rounded-lg p-4 md:p-6 shadow-2xl">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-2 text-xs text-gray-400">bug-fixer@terminal</span>
                    </div>
                    <CodeTyper />
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <h2 className="text-4xl md:text-6xl font-bold text-indigo-400 mb-4 animate-slideUp">
                        Oops! We Crashed
                    </h2>
                    <p className="text-gray-300 mb-8 text-sm md:text-base animate-slideUp delay-100">
                        Our robot is fixing the bugs right now. Hang tight!
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg 
                     hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 
                     transition-all duration-300 shadow-lg animate-slideUp delay-200"
                    >
                        Retry Mission
                    </button>
                </div>
            </div>

            {/* Custom Animations */}
            <style jsx>{`
        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 27%, 29%, 31%, 33%, 35%, 100% {
            opacity: 1;
          }
          20%, 22%, 24%, 26%, 28%, 30%, 32%, 34% {
            opacity: 0.3;
          }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-flicker { animation: flicker 2s infinite; }
        .animate-slideUp { animation: slideUp 0.8s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
        </div>
    );
};

// Error Boundary Wrapper
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <ErrorPage />;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;