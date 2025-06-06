'use client';

import React, { useState } from 'react';
import { LovableLogo } from './LovableLogo';

export const LovableHero: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const suggestions = [
    'Public',
    'Remotion video',
    'Bill splitter',
    'Task manager',
    'Recipe finder'
  ];

  return (
    <>
      {/* Background Layers - Fixed and covering entire page */}
      <div className="fixed inset-0 w-full h-full overflow-hidden bg-black z-0">
        {/* Background Layer 1: Gradient */}
        <div className="absolute inset-0 w-full h-full overflow-x-hidden">
          <div className="absolute inset-0" style={{ opacity: 1 }}>
            <div 
              className="absolute left-1/2 h-[200vh] w-[350%] -translate-x-1/2 overflow-hidden md:w-[190%] lg:w-[190%] xl:w-[190%] 2xl:mx-auto 2xl:max-w-[2900px]" 
              style={{ 
                backgroundImage: 'url("/img/background/gradient-optimized.png")', 
                backgroundSize: '100% 3200px', 
                backgroundRepeat: 'no-repeat', 
                backgroundPosition: 'center top' 
              }}
            />
          </div>
        </div>

        {/* Background Layer 2: Grain Texture */}
        <div 
          className="absolute inset-0 w-full h-full" 
          style={{
            backgroundImage: 'url("/img/background/grain.png")',
            backgroundSize: '100px 100px',
            backgroundRepeat: 'repeat',
            backgroundBlendMode: 'overlay',
            backgroundPosition: 'left top',
            mixBlendMode: 'overlay'
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 min-h-screen w-full">
        <div className="flex min-h-screen flex-col">
          {/* Navbar */}
          <nav className="flex items-center justify-between px-6 py-4 md:px-8 lg:px-12">
            <div className="flex-1" />
            
            {/* Centered Logo */}
            <div className="flex justify-center">
              <LovableLogo className="text-white dark:text-white" width={120} height={32} />
            </div>
            
            {/* Right side - User Icon */}
            <div className="flex flex-1 justify-end">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-white/20">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="flex flex-1 items-center justify-center px-6 pb-16">
            <div className="w-full max-w-4xl text-center">
              {/* Main Heading */}
              <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
                Build something{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Lovable
                </span>
              </h1>

              {/* Subheading */}
              <p className="mb-12 text-xl text-gray-300 md:text-2xl lg:text-3xl">
                Idea to app in seconds, with your personal full stack engineer
              </p>

              {/* Chat Input Section */}
              <div className="mx-auto max-w-2xl">
                {/* Input Field */}
                <div className="relative mb-6">
                  <div className="flex items-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 transition-all duration-200 focus-within:bg-white/15 focus-within:border-white/30">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-3 text-gray-400"
                    >
                      <path
                        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Describe your app idea..."
                      className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-lg"
                    />
                    <button className="ml-3 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22 2L11 13"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22 2L15 22L11 13L2 9L22 2Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="flex flex-wrap justify-center gap-3">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setInputValue(suggestion)}
                      className="rounded-full bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}; 