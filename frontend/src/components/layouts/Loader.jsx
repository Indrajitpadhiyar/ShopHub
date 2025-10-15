import React, { useState, useEffect } from "react";

const Loader = () => {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let current = 0;
        const interval = setInterval(() => {
            // Smooth easing — starts fast, slows down gracefully
            current += (100 - current) * 0.025;

            if (current >= 99.8) {
                current = 100;
                clearInterval(interval);
                // Fade out loader a bit after completion
                setTimeout(() => setVisible(false), 800);
            }

            setProgress(current);
        }, 25);

        return () => clearInterval(interval);
    }, []);

    if (!visible) return null; // Hide loader when finished

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-orange-50 min-h-screen overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${progress >= 100 ? "opacity-0 scale-95" : "opacity-100 scale-100"
                }`}
        >
            <div className="relative flex flex-col items-center w-full max-w-[20rem] sm:max-w-[26rem] md:max-w-[30rem] px-4 transition-all duration-700 ease-in-out">
                {/* Logo Container */}
                <div
                    className={`relative w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 mb-6 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${progress > 50 ? "scale-105" : "scale-95"
                        }`}
                >
                    <svg
                        viewBox="0 0 500 500"
                        className="w-full h-full"
                        style={{
                            filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.15))",
                        }}
                        aria-label="Bagify logo animation"
                    >
                        <defs>
                            <linearGradient id="bagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#14b8a6" />
                                <stop offset="50%" stopColor="#06b6d4" />
                                <stop offset="100%" stopColor="#f97316" />
                            </linearGradient>
                            <clipPath id="fillClip">
                                <rect
                                    x="0"
                                    y={500 - progress * 5}
                                    width="500"
                                    height="500"
                                    className="transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                                />
                            </clipPath>
                        </defs>

                        {/* Bag Outline */}
                        <g>
                            <path
                                d="M 170 120 Q 170 80, 190 80 L 310 80 Q 330 80, 330 120"
                                fill="none"
                                stroke="#64748b"
                                strokeWidth="12"
                                strokeLinecap="round"
                                style={{
                                    strokeDasharray: "300",
                                    strokeDashoffset: Math.max(0, 300 - progress * 4),
                                    transition: "stroke-dashoffset 0.5s ease",
                                }}
                            />
                            <path
                                d="M 140 140 L 120 380 Q 120 420, 160 420 L 340 420 Q 380 420, 380 380 L 360 140 Q 360 120, 340 120 L 160 120 Q 140 120, 140 140 Z"
                                fill="none"
                                stroke="#64748b"
                                strokeWidth="10"
                                strokeLinecap="round"
                                style={{
                                    strokeDasharray: "1000",
                                    strokeDashoffset: Math.max(0, 1000 - progress * 10),
                                    transition: "stroke-dashoffset 0.6s ease",
                                }}
                            />
                        </g>

                        {/* Gradient Fill */}
                        <g clipPath="url(#fillClip)">
                            <path
                                d="M 140 140 L 120 380 Q 120 420, 160 420 L 340 420 Q 380 420, 380 380 L 360 140 Q 360 120, 340 120 L 160 120 Q 140 120, 140 140 Z"
                                fill="url(#bagGradient)"
                                style={{
                                    opacity: 0.9,
                                    transition: "opacity 0.6s ease-in-out",
                                }}
                            />
                        </g>

                        {/* Bagify Text */}
                        <text
                            x="250"
                            y="340"
                            textAnchor="middle"
                            fontSize="80"
                            fontWeight="bold"
                            fill="url(#bagGradient)"
                            style={{
                                opacity: progress > 60 ? 1 : 0,
                                transition: "opacity 1s ease-in-out",
                                filter: "drop-shadow(0px 0px 12px rgba(20,184,166,0.7))",
                            }}
                        >
                            Bagify
                        </text>
                    </svg>

                    {/* Rotating Glow */}
                    <div
                        className="absolute inset-0 rounded-full opacity-25 blur-2xl animate-[rotate_8s_linear_infinite]"
                        style={{
                            background: `conic-gradient(from ${progress * 3.6
                                }deg, #14b8a6, #06b6d4, #f97316, #14b8a6)`,
                        }}
                    />
                </div>

                {/* Brand Name */}
                <div className="text-center mb-4">
                    <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#06b6d4] via-[#14b8a6] to-[#f97316] bg-clip-text text-transparent drop-shadow-lg transition-all duration-1000 ease-in-out">
                        Bagify
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2 tracking-widest uppercase">
                        Your Style, Your Bag
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-64 sm:w-72 md:w-80 h-2.5 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                    <div
                        className="h-full bg-gradient-to-r from-[#14b8a6] via-[#06b6d4] to-[#f97316] rounded-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Loading Text */}
                <div className="mt-4 text-center">
                    <p className="text-sm sm:text-base text-slate-600 font-medium">
                        {progress < 100 ? "Loading your bags" : "Ready to shop"}
                        {progress < 100 && (
                            <>
                                <span className="inline-block animate-bounce">.</span>
                                <span
                                    className="inline-block animate-bounce"
                                    style={{ animationDelay: "0.2s" }}
                                >
                                    .
                                </span>
                                <span
                                    className="inline-block animate-bounce"
                                    style={{ animationDelay: "0.4s" }}
                                >
                                    .
                                </span>
                            </>
                        )}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">{Math.round(progress)}%</p>
                </div>
            </div>

            <style jsx>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
        </div>
    );
};

export default Loader;
