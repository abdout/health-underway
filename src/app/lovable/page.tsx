import AnimatedNavbar from "@/components/AnimatedNavbar";

export default function LovablePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* OPTIMIZED LOVABLE.DEV BACKGROUND */}
      
      {/* Layer 1: Main Gradient Background - Optimized */}
      <div className="absolute inset-0 w-full overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute left-1/2 top-0 h-full w-[300%] -translate-x-1/2 md:w-[180%] lg:w-[160%] xl:w-[140%] 2xl:w-[120%]" 
            style={{ 
              backgroundImage: 'url("/img/background/gradient-optimized.svg")', 
              backgroundSize: '100% 100%', 
              backgroundRepeat: 'no-repeat', 
              backgroundPosition: 'center center',
              transform: 'scale(1.1)'
            }}
          />
        </div>
      </div>

      {/* Layer 2: Optimized Grain Texture Overlay */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: 'url("/img/background/grain-optimized.svg")',
          backgroundSize: '128px 128px',
          backgroundRepeat: 'repeat',
          backgroundPosition: '0 0',
          mixBlendMode: 'overlay',
          opacity: 0.6
        }}
      />

      {/* Layer 3: Additional subtle overlay for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(79, 147, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(255, 126, 234, 0.08) 0%, transparent 50%)
          `,
          mixBlendMode: 'screen'
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="text-center space-y-6 px-4">
          <div className="space-y-2">
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 leading-tight">
              Build something
            </h1>
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 leading-tight flex items-center justify-center gap-4">
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 w-12 h-12 rounded-xl inline-block"></span>
              Lovable
            </h1>
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Idea to app in seconds, with your personal full stack engineer
          </p>
          
          {/* Input field like in the original */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
              <div className="flex items-center gap-4 text-gray-500">
                <span>Ask Lovable to create a web app th</span>
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-sm">📎 Attach</span>
                  <span className="text-sm">🌐 Public</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
